import { getAllPayments } from "@/app/lib/api/payments";
import PaymentsClient from "./PaymentsClient";

export default async function ManagePayments() {
    const res = await getAllPayments();
    const payments = res?.success ? res.data : [];

    return <PaymentsClient payments={payments} />;
}