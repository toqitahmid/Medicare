import React from "react";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAppointmentsByDoctorId } from "@/app/lib/api/appoinments";
import { getDoctorProfile } from "@/app/lib/api/doctors";
import DoctorAppointmentsClient from "./DoctorAppointmentsClient";

export const metadata = {
    title: "My Appointments | Doctor Dashboard"
}

const DoctorAppointments = async () => {
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
                <h2 className="text-2xl font-bold text-default-500">Please complete your Doctor Profile first to view appointments.</h2>
            </div>
        );
    }

    const response = await getAppointmentsByDoctorId(doctor._id);
    const appointments = response?.success ? response.data : [];

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <DoctorAppointmentsClient appointments={appointments} />
        </div>
    );
}

export default DoctorAppointments;