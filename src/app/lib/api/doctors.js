"use server";
import { authClient } from "../auth-client";
import { headers } from "next/headers";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getAllDoctors = async () => {
    try {
        // Adding cache: "no-store" to ensure we get the latest list of doctors
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
        const response = await fetch(`${baseUrl}/api/v1/doctors/all`, {
            cache: "no-store",
            headers: reqHeaders
        });

        if (!response.ok) {
            throw new Error("Failed to fetch all doctors");
        }

        const res = await response.json();
        return { success: true, data: res.data.doctors };
    } catch (err) {
        console.error("Failed to fetch doctors:", err);
        return { success: false, message: err.message };
    }
};

export const getDoctorProfile = async (email) => {
    try {
        // Adding cache: "no-store" to ensure we get the latest profile data
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
        const response = await fetch(`${baseUrl}/api/v1/doctors/${email}`, {
            cache: "no-store",
            headers: reqHeaders
        });

        if (!response.ok) {
            if (response.status === 404) return { success: true, data: null }; // Profile doesn't exist yet
            throw new Error("Failed to fetch doctor profile");
        }

        const res = await response.json();
        return { success: true, data: res.data.doctor };
    } catch (error) {
        console.error("Error fetching doctor profile:", error);
        return { success: false, message: error.message };
    }
};

export const getDoctorOverview = async (docId) => {
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
        const response = await fetch(`${baseUrl}/api/v1/doctor-overview/${docId}/overview`, {
            cache: "no-store",
            headers: reqHeaders
        });

        if (!response.ok) {
            throw new Error("Failed to fetch doctor overview");
        }

        const res = await response.json();
        return { success: true, data: res.data };
    } catch (error) {
        console.error("Error fetching doctor overview:", error);
        return { success: false, message: error.message };
    }
};