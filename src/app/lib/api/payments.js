"use server";
import { authClient } from "../auth-client";
import { headers } from "next/headers";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPaymentsByPatientId = async (patientId) => {
    try {
        const tokenRes = await authClient.token({ fetchOptions: { headers: await headers() } });
        const token = tokenRes?.data?.token || tokenRes?.token || (typeof tokenRes === 'string' ? tokenRes : null);
        const reqHeaders = {};
        if (token) {
            reqHeaders["Authorization"] = `Bearer ${token}`;
        }
        const response = await fetch(`${baseUrl}/api/v1/payments/${patientId}`, {
            cache: "no-store",
            headers: reqHeaders
        });

        if (!response.ok) {
            throw new Error("Failed to fetch payments by patient id")
        }
        const res = await response.json();
        return {success: true, data: res.data.payments}
    }
    catch (err) {
        console.error("Failed to fetch payments", err)
        return {success: false, message: err.message}
    }
}

export const getPaymentsByDoctorId = async (doctorId) => {
    try {
        const tokenRes = await authClient.token({ fetchOptions: { headers: await headers() } });
        const token = tokenRes?.data?.token || tokenRes?.token || (typeof tokenRes === 'string' ? tokenRes : null);
        const reqHeaders = {};
        if (token) {
            reqHeaders["Authorization"] = `Bearer ${token}`;
        }
        const response = await fetch(`${baseUrl}/api/v1/payments/doctor/${doctorId}`, {
            cache: "no-store",
            headers: reqHeaders
        });

        if (!response.ok) {
            throw new Error("Failed to fetch payments by doctor id")
        }
        const res = await response.json();
        return {success: true, data: res.data.payments}
    }
    catch (err) {
        console.error("Failed to fetch doctor payments", err)
        return {success: false, message: err.message}
    }
}

export const getAllPayments = async () => {
    try {
        const tokenRes = await authClient.token({ fetchOptions: { headers: await headers() } });
        const token = tokenRes?.data?.token || tokenRes?.token || (typeof tokenRes === 'string' ? tokenRes : null);
        const reqHeaders = {};
        if (token) {
            reqHeaders["Authorization"] = `Bearer ${token}`;
        }
        const response = await fetch(`${baseUrl}/api/v1/payments/all`, {
            cache: "no-store",
            headers: reqHeaders
        });

        if (!response.ok) {
            throw new Error("Failed to fetch all payments")
        }
        const res = await response.json();
        return {success: true, data: res.data.payments}
    }
    catch (err) {
        console.error("Failed to fetch all payments", err)
        return {success: false, message: err.message}
    }
}
