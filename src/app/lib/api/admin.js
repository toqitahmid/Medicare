"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAdminOverview = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/v1/admin-overview/overview`, {
            cache: "no-store",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch admin overview");
        }
        
        const res = await response.json();
        return { success: true, data: res.data };
    } catch (err) {
        console.error("Failed to fetch admin overview:", err);
        return { success: false, message: err.message };
    }
};
