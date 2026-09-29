"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

import { authClient } from "../auth-client";
import { headers } from "next/headers";
import { cookies } from "next/headers";

export const createDoctorProfile = async (payload) => {
    try {
        const cookieStore = await cookies();
        let token = cookieStore.get("better-auth.session_token")?.value || cookieStore.get("better-auth.jwt")?.value;
        
        if (!token) {
            // fallback for secure prefix
            token = cookieStore.get("__Secure-better-auth.session_token")?.value || cookieStore.get("__Secure-better-auth.jwt")?.value;
        }
        
        const reqHeaders = {
            "Content-Type": "application/json",
        };
        if (token) {
            reqHeaders["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${baseUrl}/api/v1/doctors/postDoctors`, {
            method: "POST",
            headers: reqHeaders,
            body: JSON.stringify(payload),
        });

        let data;
        try {
            data = await response.json();
        } catch (parseError) {
            throw new Error("Server returned an invalid response (not JSON). Please check the backend.");
        }

        if (!response.ok) {
            throw new Error(data.message || "Failed to create doctor profile");
        }

        return { success: true, data };
    } catch (error) {
        console.error("Error creating doctor profile:", error);
        return { success: false, message: error.message };
    }
};

