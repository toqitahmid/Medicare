"use server";

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
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
        const response = await fetch(`${baseUrl}/api/v1/prescriptions/patient/${patientId}`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error("Failed to fetch prescriptions");
        }

        const json = await response.json();
        // Handle cases where the backend wraps the array in a 'prescriptions' object
        const prescriptionsArray = json.data?.prescriptions || json.data || [];
        return { success: true, data: prescriptionsArray };
    } catch (error) {
        console.error("Fetch prescriptions error:", error);
        return { success: false, message: error.message };
    }
};
