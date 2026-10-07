"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getAllDoctors = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/v1/doctors/all`, {
            next: {
               revalidate: 10,
               tags: ["doctors"]
            },
            headers: { "Content-Type": "application/json" }
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
        const response = await fetch(`${baseUrl}/api/v1/doctors/${email}`, {
            cache: "no-store",
            headers: { "Content-Type": "application/json" }
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
        const response = await fetch(`${baseUrl}/api/v1/doctor-overview/${docId}/overview`, {
            cache: "no-store",
            headers: { "Content-Type": "application/json" }
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