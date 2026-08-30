"use server";

import { authHeader } from "../core/token";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function createAppointment(payload) {
  try {
    const res = await fetch(`${baseUrl}/api/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(await authHeader()),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.log(`Faild to post appointment ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error("error : ", err);
  }
}
