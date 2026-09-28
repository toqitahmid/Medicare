"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPaymentsByPatientId = async (patientId) => {
    try {
        const response = await fetch(`${baseUrl}/api/v1/payments/${patientId}`, {
            cache: 'no-store'
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
        const response = await fetch(`${baseUrl}/api/v1/payments/doctor/${doctorId}`, {
            cache: 'no-store'
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
        const response = await fetch(`${baseUrl}/api/v1/payments/all`, {
            cache: 'no-store'
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
