"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getPlanById (planId) {
    try{
        const res = await fetch(`${baseUrl}/api/plans?planId${planId}`)
        if(!res.ok){
            console.log(`Failed to fetch plans ${res.status}`)
        }
        return res.json();
    }
    catch(err){
        console.error("error: ", err);
    }
}