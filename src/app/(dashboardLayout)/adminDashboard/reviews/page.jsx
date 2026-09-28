import { getAllReviews } from "@/app/lib/api/reviews";
import ReviewsClient from "./ReviewsClient";

export default async function ManageReviews() {
    const res = await getAllReviews();
    const reviews = res?.success ? res.data : [];

    return <ReviewsClient reviews={reviews} />;
}