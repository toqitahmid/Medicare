"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getPrescriptionsByDoctorId(doctorId) {
    try{
        const res = await fetch(`${baseUrl}/api/prescriptions/doctors/${doctorId}`);

        if(!res.ok){
            console.error(`failed to fetch prescriptions ${res.status}`)
        }
        return res.json();
    }
    catch(err){
        console.error(err);
    }
}