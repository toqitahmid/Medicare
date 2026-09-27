"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createDoctorProfile = async (payload) => {
    try {
        const response = await fetch(`${baseUrl}/api/v1/doctors/postDoctors`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to create doctor profile");
        }

        return { success: true, data };
    } catch (error) {
        console.error("Error creating doctor profile:", error);
        return { success: false, message: error.message };
    }
};

