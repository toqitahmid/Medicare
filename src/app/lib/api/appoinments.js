"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAppointmentsByPaitentId = async (patientId) => {
    try {
        const response = await fetch(`${baseUrl}/api/v1/appointments/${patientId}`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error("Failed to fetch appointments by patient id")
        }
        const res = await response.json();
        return {success: true, data: res.data.appointment}
    }
    catch (err) {
        console.error("Failed to fetch appointments", err)
        return {success: false, message: err.message}
    }
}

export const getAppointmentsByDoctorId = async (doctorId) => {
    try {
        const response = await fetch(`${baseUrl}/api/v1/appointments/doctor/${doctorId}`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error("Failed to fetch appointments by doctor id")
        }
        const res = await response.json();
        return {success: true, data: res.data.appointments}
    }
    catch (err) {
        console.error("Failed to fetch doctor appointments", err)
        return {success: false, message: err.message}
    }
}