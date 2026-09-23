"use server";

import { authHeader } from "../core/token";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllAppointments() {
  try {
    const res = await fetch(`${baseUrl}/api/appoinments`,{
      headers: await authHeader(),
    });
    if (!res.ok) {
      console.log(`Failed to fetch doctors ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.err("error", err);
  }
}

export async function getAppointmentById(patientId) {
  if (!patientId) return [];

  try {
    const res = await fetch(`${baseUrl}/api/appointments/${patientId}`, {
      headers: await authHeader(),
    });

    if (!res.ok) {
      console.log(`Failed to fetch appointments ${res.status}`);
      return [];
    }

    const text = await res.text();
    return text ? JSON.parse(text) : [];
  } catch (err) {
    console.error("error: ", err);
    return [];
  }
}

export async function getAppointmentByDoctorId(doctorId) {
  try {
    const res = await fetch(`${baseUrl}/api/doctors/appointments/${doctorId}`, {
      headers: await authHeader(),
    });
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
      {
        headers: await authHeader(),
      },
    );
    if (!res.ok) {
      console.log(`Failed to fetch appointments ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error("error: ", err);
  }
}