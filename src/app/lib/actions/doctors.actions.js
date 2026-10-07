"use server";
import { revalidatePath, revalidateTag } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createDoctorProfile = async (payload) => {
    try {
        const reqHeaders = { "Content-Type": "application/json" };
        const response = await fetch(`${baseUrl}/api/v1/doctors/postDoctors`, {
            method: "POST",
            headers: reqHeaders,
            body: JSON.stringify(payload),
        });

        let data;
        try {
            data = await response.json();
        } catch (parseError) {
            throw new Error("Server returned an invalid response (not JSON). Please check the backend.");
        }

        if (!response.ok) {
            throw new Error(data.message || "Failed to create doctor profile");
        }

        try {
            revalidateTag("doctors");
            revalidatePath("/doctors");
        } catch (e) {
            console.warn("Revalidation warning:", e);
        }

        return { success: true, data };
    } catch (error) {
        console.error("Error creating doctor profile:", error);
        return { success: false, message: error.message };
    }
};
