"use server";
import { authClient } from "../auth-client";
import { headers } from "next/headers";

export const createPrescription = async (payload) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
        const response = await fetch(`${baseUrl}/api/v1/prescriptions/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to create prescription");
        }

        const data = await response.json();
        return { success: true, message: data.message };
    } catch (error) {
        console.error("Prescription creation error:", error);
        return { success: false, message: error.message };
    }
};

export const getPrescriptionsByPatientId = async (patientId) => {
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

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
        const response = await fetch(`${baseUrl}/api/v1/prescriptions/patient/${patientId}`, {
            cache: 'no-store',
            headers: reqHeaders
        });

        if (!response.ok) {
            // If the patient has no prescriptions (e.g. 404), just return an empty array instead of throwing an error
            return { success: false, data: [] };
        }

        const json = await response.json();
        // Handle cases where the backend wraps the array in a 'prescriptions' object
        const prescriptionsArray = json.data?.prescriptions || json.data || [];
        return { success: true, data: prescriptionsArray };
    } catch (error) {
        console.error("Fetch prescriptions error:", error.message);
        return { success: false, data: [], message: error.message };
    }
};
