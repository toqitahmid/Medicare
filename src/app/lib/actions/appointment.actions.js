"use server";

export const createAppointment = async (payload) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:8000";
        const reqHeaders = { "Content-Type": "application/json" };
        
        const response = await fetch(`${baseUrl}/api/v1/appointments/create`, {
            method: "POST",
            headers: reqHeaders,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Backend error response:", errorText);
            let backendMsg = "Failed to book appointment"; try { const parsed = JSON.parse(errorText); backendMsg = parsed.message || backendMsg; } catch (e) { backendMsg = `Failed to book appointment: ${errorText}`; } throw new Error(backendMsg);
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
        const baseUrl = "http://127.0.0.1:8000";
        const reqHeaders = { "Content-Type": "application/json" };
        
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



