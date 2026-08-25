"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getPaymentByPatientId(patientId) {
  try {
    const res = await fetch(`${baseUrl}/api/payments/${patientId}`);
    if(!res.ok){
        console.error(`failed to fetch payments ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error(err);
  }
}
