'use server';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; 


export async function getAllDoctors(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.specialization) {
      query.append("specialization", params.specialization);
    }
    if (params.consultationFee) {
      query.append("maxFee", params.consultationFee);
    }
    if (params.experience) {
      query.append("minExperience", params.experience);
    }
    console.log("base url:", baseUrl);
    const url = `${baseUrl}/api/doctors?${query.toString()}`;
    console.log("fetching:", url); // add this to see the exact URL being hit
    const res = await fetch(url, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`Failed to fetch doctors: ${res.status}`);
      return [];
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}


export async function getDoctorById(doctorId) {
    try{
        const res = await fetch(`${baseUrl}/api/doctors/${doctorId}`)
        if(!res.ok){
            console.error(`failed to fetch doctor ${res.status}`);
            return null;
        }
        return res.json();
    }
    catch(err){
        console.error(err);
        return null;
    }
}

export async function getDoctorByUserId(userId) {
    try{
        const res = await fetch(`${baseUrl}/api/doctors/user/${userId}`,{
            cache: "no-store"
        });

        if(!res.ok){
            console.error(`failed to fetch patients ${res.status}`);
            return null;
        }
        return res.json();
    }
    catch(err){
        console.error(err);
    }
}

