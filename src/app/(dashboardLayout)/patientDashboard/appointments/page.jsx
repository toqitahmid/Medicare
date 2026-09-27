import React from "react";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAppointmentsByPaitentId } from "@/app/lib/api/appoinments";
import PatientAppointmentsClient from "./PatientAppointmentsClient";

export const metadata = {
    title: "My Appointments | Patient Dashboard"
}

const PatientAppointments = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
        redirect("/login");
    }

    const response = await getAppointmentsByPaitentId(session.user.email);
    const appointments = response?.success ? response.data : [];

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <PatientAppointmentsClient appointments={appointments} />
        </div>
    );
}

export default PatientAppointments;