import Stripe from "stripe";
import { prisma } from "../betterauth/auth";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia",
});
