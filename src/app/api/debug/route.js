import { cookies, headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export async function GET(req) {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    
    let session = null;
    try {
        session = await auth.api.getSession({
            headers: await headers()
        });
    } catch (e) {
        console.error("Session error:", e);
    }
    
    return Response.json({
        cookies: allCookies,
        session: session
    });
}
