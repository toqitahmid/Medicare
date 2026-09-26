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

export const getDoctorProfile = async (email) => {
    try {
        // Adding cache: "no-store" to ensure we get the latest profile data
        const response = await fetch(`${baseUrl}/api/v1/doctors/${email}`, {
            cache: "no-store"
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

export const getAllDoctors = async () => {
    try {
        // Adding cache: "no-store" to ensure we get the latest list of doctors
        const response = await fetch(`${baseUrl}/api/v1/doctors/all`, {
            cache: "no-store"
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