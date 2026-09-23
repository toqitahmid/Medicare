"use server";

import { authHeader } from "../core/token";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function createPaymentInfo(paymentInfo) {
  try {
    const res = await fetch(`${baseUrl}/api/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(await authHeader()),
      },
      body: JSON.stringify(paymentInfo),
    });

    if (!res.ok) {
      console.error(`Failed to fetch paymentInfo ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error("error: ", err);
  }
}
