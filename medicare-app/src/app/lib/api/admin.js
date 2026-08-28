"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Generic helper function to handle API responses safely
  async function safeFetch(endpoint, errorMessage) {
    const url = `${baseUrl}${endpoint}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`${errorMessage} — ${url} (Status: ${res.status})`);
        return [];
      }

      return res.json();
    } catch (err) {
      console.error(`${errorMessage} — ${url} threw:`, err.message);
      return [];
    }
  }

export async function getAdminData(id) {
  return safeFetch(`/api/admin/${id}`, `Failed to fetch admin data for ID ${id}`);
}

export async function getAdminUsers() {
  return safeFetch(`/api/admin/users`, "Failed to fetch admin users");
}

export async function getAdminDoctors() {
  // Fixed typo: 'doctros' -> 'doctors'
  return safeFetch(`/api/admin/doctors`, "Failed to fetch admin doctors");
}

export async function getAdminPatients() {
  return safeFetch(`/api/admin/patients`, "Failed to fetch admin patients");
}

export async function getAdminAppointments() {
  return safeFetch(`/api/admin/appointments`, "Failed to fetch admin appointments");
}

export async function getAdminReviews() {
  return safeFetch(`/api/admin/reviews`, "Failed to fetch admin reviews");
}