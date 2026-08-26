"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllAppointments() {
  try {
    const res = await fetch(`${baseUrl}/api/appoinments`);
    if (!res.ok) {
      console.log(`Failed to fetch doctors ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.err("error", err);
  }
}

export async function getAppointmentById(patientId) {
  try {
    const res = await fetch(`${baseUrl}/api/appointments/${patientId}`);
    if (!res.ok) {
      console.log(`Failed to fetch appointments ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error("error: ", err);
  }
}

export async function getAppointmentByDoctorId(doctorId) {
  try {
    const res = await fetch(`${baseUrl}/api/doctors/appointments/${doctorId}`);
    if (!res.ok) {
      console.log(`Failed to fetch appointments ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error("error: ", err);
  }
}

export async function getTodayAppointmentByDoctorId(doctorId) {
  try {
    const res = await fetch(
      `${baseUrl}/api/doctors/appointments/today/${doctorId}`,
    );
    if (!res.ok) {
      console.log(`Failed to fetch appointments ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error("error: ", err);
  }
}