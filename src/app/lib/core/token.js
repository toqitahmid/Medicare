"use server";

import { headers } from "next/headers";
import { auth } from "../auth";


export const getUserToken = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    console.log("session ", session);
    return session?.session?.token || null;
}

export const authHeader = async() => {
    const token = await getUserToken();
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return header;
}