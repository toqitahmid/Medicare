import React from "react";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPrescriptionsByPatientId } from "@/app/lib/actions/prescription.actions";

import PatientReviewsClient from "./PatientReviewsClient";

export const metadata = {
    title: "My Reviews | Patient Dashboard"
};

const Reviews = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user || session.user.role !== "patient") {
        redirect("/login");
    }

    const response = await getPrescriptionsByPatientId(session.user.email);
    const prescriptions = response?.success ? response.data : [];

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <PatientReviewsClient prescriptions={prescriptions} />
        </div>
    );
}

export default Reviews;