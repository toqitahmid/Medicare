"use server";
import { authClient } from "../auth-client";
import { headers } from "next/headers";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllReviews = async () => {
    try {
        const tokenRes = await authClient.token({ fetchOptions: { headers: await headers() } });
        const token = tokenRes?.data?.token || tokenRes?.token || (typeof tokenRes === 'string' ? tokenRes : null);
        const reqHeaders = {};
        if (token) {
            reqHeaders["Authorization"] = `Bearer ${token}`;
        }
        const response = await fetch(`${baseUrl}/api/v1/reviews/all`, {
            cache: "no-store",
            headers: reqHeaders
        });

        if (!response.ok) {
            throw new Error("Failed to fetch all reviews")
        }
        const res = await response.json();
        return {success: true, data: res.data.reviews || res.data}
    }
    catch (err) {
        console.error("Failed to fetch all reviews", err)
        return {success: false, message: err.message}
    }
}
