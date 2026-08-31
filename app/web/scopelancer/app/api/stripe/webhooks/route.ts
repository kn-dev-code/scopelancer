import Stripe from "stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { HTTP_STATUS } from "@/lib/error_codes/error-code";
import { stripe } from "@/lib/stripe/stripe";
import "dotenv/config";

export async function POST(request: NextRequest) {
  // 1. Verify Stripe Signature
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
      case "checkout.session.completed":
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
}
