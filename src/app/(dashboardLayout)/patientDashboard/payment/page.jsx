import React from "react";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPaymentsByPatientId } from "@/app/lib/api/payments";
import PatientPaymentClient from "./PatientPaymentClient";

export const metadata = {
    title: "Payment History | Patient Dashboard"
}

const PatientPayments = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
        redirect("/login");
    }

    const response = await getPaymentsByPatientId(session.user.email || session.user.id);
    const payments = response?.success ? response.data : [];

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <PatientPaymentClient payments={payments} />
        </div>
    );
}

export default PatientPayments;