"use server";

export const createAppointment = async (payload) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
        const response = await fetch(`${baseUrl}/api/v1/appointments/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error("Failed to book appointment");
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Appointment booking error:", error);
        return { success: false, message: error.message };
    }
};
