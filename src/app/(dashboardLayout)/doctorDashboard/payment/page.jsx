export const dynamic = "force-dynamic";
import React from "react";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPaymentsByDoctorId } from "@/app/lib/api/payments";
import { getDoctorProfile } from "@/app/lib/api/doctors";
import DoctorPaymentClient from "./DoctorPaymentClient";

export const metadata = {
    title: "Payment History | Doctor Dashboard"
}

const DoctorPayments = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user || session.user.role !== "doctor") {
        redirect("/login");
    }

    // Fetch the doctor's MongoDB profile to get their real _id
    const doctorProfileRes = await getDoctorProfile(session.user.email);
    const doctor = doctorProfileRes?.success ? doctorProfileRes.data : null;

    if (!doctor) {
        return (
            <div className="p-6 md:p-10 max-w-7xl mx-auto flex items-center justify-center min-h-[50vh]">
                <h2 className="text-2xl font-bold text-default-500">Please complete your Doctor Profile first to receive payments.</h2>
            </div>
        );
    }

    const response = await getPaymentsByDoctorId(doctor._id);
    const payments = response?.success ? response.data : [];

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <DoctorPaymentClient payments={payments} />
        </div>
    );
}

export default DoctorPayments;