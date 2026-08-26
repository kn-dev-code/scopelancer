import { prisma } from "@/lib/betterauth/auth";
import { stripe } from "../stripe";
import { HTTP_STATUS } from "@/lib/error_codes/error-code";
import { NextResponse } from "next/server";

/// Products

export async function getProduct(database: string) {
  const findProductId = await prisma.product.findUnique({
    where: { id: database },
  });

  if (!findProductId) {
    return NextResponse.json(
      {
        message: "Not found",
      },
      { status: HTTP_STATUS.NOT_FOUND },
    );
  }

  const product = await stripe.products.create({
    id: findProductId.id,
    name: findProductId.name,
    active: findProductId.active,
  });

  if (!product) {
    return NextResponse.json(
      {
        message: "Not Found",
      },
      { status: HTTP_STATUS.NOT_FOUND },
    );
  }
}

export async function PATCH(database: string) {}

//export const studio = await stripe.products.create({});

//export const pro = await stripe.products.create({});
