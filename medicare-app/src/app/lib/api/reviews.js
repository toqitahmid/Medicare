"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getReviewsByPatientId(patientId) {
    try{
        const res = await fetch(`${baseUrl}/api/reviews/patient/${patientId}`);
        if(!res.ok){
            console.error(`reviews fetch failed ${res.status}`);
        }
        return res.json();
    }
    catch(err){
        console.error(err);
    }
}