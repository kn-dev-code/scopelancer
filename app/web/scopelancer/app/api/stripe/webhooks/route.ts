import Stripe from "stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { HTTP_STATUS } from "@/lib/error_codes/error-code";
import { stripe } from "@/lib/stripe/stripe";
import "dotenv/config";
import { prisma } from "@/lib/betterauth/auth";
import { sessionAuth } from "@/lib/session-auth-check/session-auth";

export async function POST(request: NextRequest) {
  // 1. Verify Stripe Signature && Grab Session Auth
  const auth = await sessionAuth();
  if (!auth) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: HTTP_STATUS.UNAUTHORIZED },
    );
  }

  const { productId, credits } = await request.json();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price: productId,
        quantity: 1,
      },
    ],
    metadata: {
      userId: auth.user.id,
      credits: credits.toString(),
    },
    success_url: process.env.NEXT_PUBLIC_API_URL as string,
    cancel_url: process.env.NEXT_PUBLIC_API_URL as string,
  });
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { message: "Bad Request" },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }

  // 2. Event Type Conditioning
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY as string,
    );
  } catch (e: any) {
    console.error("Something went wrong: ", e.message);
    return NextResponse.json(
      { error: `Webhook error: ${e.message}` },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }
  // 3. Internal Server Error Handling
  try {
    switch (event.type) {
      // Products
      case "product.created":
      case "product.updated": {
        const product = event.data.object as Stripe.Product;
        await prisma.product.upsert({
          where: { id: product.id },
          update: {
            name: product.name,
            description: product.description,
            credits: parseInt(product.metadata.credits || "0", 10),
          },
          create: {
            id: product.id,
            name: product.name,
            description: product.description,
            credits: parseInt(product.metadata.credits || "0", 10),
          },
        });
        break;
      }

      // Prices
      case "price.created":
      case "price.updated": {
        const price = event.data.object as Stripe.Price;
        if (typeof price.product === "string") {
          await prisma.price.upsert({
            where: { id: price.id },
            update: {
              unitAmount: price.unit_amount || 0,
              currency: price.currency,
            },
            create: {
              id: price.id,
              productId: price.product,
              unitAmount: price.unit_amount || 0,
              currency: price.currency,
            },
          });
        }
        break;
      }
      // Checkout Status
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const creditsToAdd = parseInt(session.metadata?.credits || "0", 10);

        if (userId && creditsToAdd > 0) {
          await prisma.$transaction([
            prisma.user.update({
              where: { id: userId },
              data: {
                credits: { increment: creditsToAdd },
              },
            }),
            prisma.billing.create({
              data: {
                userId,
                stripePaymentIntentId: session.payment_intent as string,
                amount: session.amount_total || 0,
                creditsPurchased: creditsToAdd,
              },
            }),
          ]);
        }
        break;
      }
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
}
