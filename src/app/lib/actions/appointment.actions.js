"use server";
import { cookies } from "next/headers";

const getAuthHeaders = async () => {
    try {
        const cookieStore = await cookies();
        let token = null;

        // Better Auth typically stores the session token in these cookies
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
        
        // If not found in common names, try searching all cookies
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

export const createAppointment = async (payload) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
        const reqHeaders = await getAuthHeaders();
        
        const response = await fetch(`${baseUrl}/api/v1/appointments/create`, {
            method: "POST",
            headers: reqHeaders,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Backend error response:", errorText);
            try {
                const error = JSON.parse(errorText);
                throw new Error(error.message || "Failed to book appointment");
            } catch (e) {
                throw new Error(`Failed to book appointment: ${errorText}`);
            }
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Appointment booking error:", error);
        return { success: false, message: error.message };
    }
};

export const updateAppointmentStatus = async (appointmentId, status) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
        const reqHeaders = await getAuthHeaders();
        
        const response = await fetch(`${baseUrl}/api/v1/appointments/${appointmentId}/status`, {
            method: "PATCH",
            headers: reqHeaders,
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Backend error response:", errorText);
            try {
                const error = JSON.parse(errorText);
                throw new Error(error.message || "Failed to update appointment status");
            } catch (e) {
                throw new Error(`Failed to update appointment status: ${errorText}`);
            }
        }

        const data = await response.json();
        return { success: true, message: data.message };
    } catch (error) {
        console.error("Failed to update status:", error);
        return { success: false, message: error.message };
    }
};

