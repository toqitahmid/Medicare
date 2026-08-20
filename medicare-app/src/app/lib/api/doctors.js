'use server';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; 
export async function getAllDoctors (params = {}) {
    try{
        const query = new URLSearchParams();
        if(params.specialization){
            query.append("specialization", params.specialization);
        }
        if(params.consultationFee){
            query.append("maxFee", params.maxFee);
        }
        if(params.experience){
            query.append("minExperience", params.minExperience);
        }
        const res = await fetch(`${baseUrl}/api/doctors?${query.toString()}`,{
            cache: "no-store",
        });
        if(!res.ok){
            console.error(`Failed to fetch doctors : ${res.status}`);
            return [];
        }
        const data = await res.json();
        return data;
    }
    catch(err){
        console.error(err);
        return [];
    }
}