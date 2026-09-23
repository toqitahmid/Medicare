"use server";

import { authHeader } from "../core/token";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getPlanById(planId) {
  if (!planId) return null;

  try {
    const res = await fetch(`${baseUrl}/api/plans?planId=${planId}`, {
      headers: await authHeader(),
    });

    if (!res.ok) {
      console.log(`Failed to fetch plans ${res.status}`);
      return null;
    }

    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch (err) {
    console.error("error: ", err);
    return null;
  }
}
