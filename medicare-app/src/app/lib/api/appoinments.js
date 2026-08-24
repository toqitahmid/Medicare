'use server';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; 


export async function getAllAppointments () {
    try{
        const res = await fetch(`${baseUrl}/api/appoinments`);
        if(!res.ok){
            console.log(`Failed to fetch doctors ${res.status}`)
        }
        return res.json();
    }
    catch(err){
        console.err("error", err);
    }
}

