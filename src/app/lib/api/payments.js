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
