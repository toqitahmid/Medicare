export const dynamic = "force-dynamic";
import { getAllAppointments } from "@/app/lib/api/appoinments";
import AppointmentsClient from "./AppointmentsClient";

export default async function ManageAppointments() {
    const res = await getAllAppointments();
    const appointments = res?.success ? res.data : [];

    return <AppointmentsClient appointments={appointments} />;
}