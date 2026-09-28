"use server";
import { authClient } from "../auth-client";
import { headers } from "next/headers";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export const getAdminOverview = async () => {
    try {
        let tokenRes;
        try {
            tokenRes = await authClient.token({ fetchOptions: { headers: await headers() } });
        } catch (e) {
            tokenRes = null;
        }
        const token = tokenRes?.data?.token || tokenRes?.token || (typeof tokenRes === 'string' ? tokenRes : null);
        const reqHeaders = {};
        if (token) {
            reqHeaders["Authorization"] = `Bearer ${token}`;
        }
        const response = await fetch(`${baseUrl}/api/v1/admin-overview/overview`, {
            cache: "no-store",
            headers: reqHeaders
        });

        if (!response.ok) {
            throw new Error("Failed to fetch admin overview");
        }
        
        const res = await response.json();
        return { success: true, data: res.data };
    } catch (err) {
        console.error("Failed to fetch admin overview:", err);
        return { success: false, message: err.message };
    }
};
