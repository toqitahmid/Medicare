'use server';

import { authHeader } from "../core/token";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export async function getPatientByUserId(userId) {
    try{
        const res = await fetch(`${baseUrl}/api/patients/${userId}`,{
              headers: await authHeader(),
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

export async function getPatientInfo (id) {
    const patient = await getPatientByUserId(id);
    return patient;
}