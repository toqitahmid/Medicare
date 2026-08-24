import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const PLAN_PRICE_ID = {
  starter: "price_1U7oU4AZBN3J3tTaeeOgfcQ4",
  standard: "price_1U7qSbAZBN3J3tTahRzfshRG",
  family: "price_1U7qUVAZBN3J3tTafVW0Q3cT",
};