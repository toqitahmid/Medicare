"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllReviews = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/v1/reviews/all`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error("Failed to fetch all reviews")
        }
        const res = await response.json();
        return {success: true, data: res.data.reviews || res.data}
    }
    catch (err) {
        console.error("Failed to fetch all reviews", err)
        return {success: false, message: err.message}
    }
}
