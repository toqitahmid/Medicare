"use server";

import { authClient } from "../auth-client";
import { headers } from "next/headers";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export const getPatientProfile = async (email) => {
    try {
        const tokenRes = await authClient.token({ fetchOptions: { headers: await headers() } });
        const token = tokenRes?.data?.token || tokenRes?.token || (typeof tokenRes === 'string' ? tokenRes : null);
        const reqHeaders = {};
        if (token) {
            reqHeaders["Authorization"] = `Bearer ${token}`;
        }
        const response = await fetch(`${baseUrl}/api/v1/patients/${email}`, {
            cache: "no-store",
            headers: reqHeaders
        });

        if (!response.ok) {
            if (response.status === 404) return { success: true, data: null }; // Profile doesn't exist yet
            throw new Error("Failed to fetch patient profile");
        }

        const res = await response.json();
        return { success: true, data: res.data.patient || res.data };
    } catch (error) {
        console.error("Error fetching patient profile:", error);
        return { success: false, message: error.message };
    }
};

export const getPatientOverview = async (email) => {
    try {
        const tokenRes = await authClient.token({ fetchOptions: { headers: await headers() } });
        const token = tokenRes?.data?.token || tokenRes?.token || (typeof tokenRes === 'string' ? tokenRes : null);
        const reqHeaders = {};
        if (token) {
            reqHeaders["Authorization"] = `Bearer ${token}`;
        }
        const response = await fetch(`${baseUrl}/api/v1/patient/${email}/overview`, {
            cache: "no-store",
            headers: reqHeaders
        });

        if (!response.ok) {
            throw new Error("Failed to fetch patient overview");
        }

        const res = await response.json();
        return { success: true, data: res.data };
    } catch (error) {
        console.error("Error fetching patient overview:", error);
        return { success: false, message: error.message };
    }
};
