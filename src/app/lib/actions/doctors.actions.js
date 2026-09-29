"use server";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getAuthHeaders = async () => {
    try {
        const cookieStore = await cookies();
        let token = null;

        const possibleCookieNames = [
            'better-auth.session_token',
            '__Secure-better-auth.session_token',
            'better-auth.session',
            '__Secure-better-auth.session',
            'better-auth.jwt'
        ];

        for (const name of possibleCookieNames) {
            const cookie = cookieStore.get(name);
            if (cookie && cookie.value) {
                token = cookie.value;
                break;
            }
        }
        
        if (!token) {
            const allCookies = cookieStore.getAll();
            for (const cookie of allCookies) {
                if (cookie.name.includes('jwt') || cookie.name.includes('session_token')) {
                    token = cookie.value;
                    break;
                }
            }
        }
        
        const reqHeaders = { "Content-Type": "application/json" };
        if (token) {
            reqHeaders["Authorization"] = `Bearer ${token}`;
        }
        return reqHeaders;
    } catch (e) {
        console.error("Failed to read cookies:", e);
        return { "Content-Type": "application/json" };
    }
};

export const createDoctorProfile = async (payload) => {
    try {
        const reqHeaders = await getAuthHeaders();
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
