import React from "react";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import ProfileFormClient from "./ProfileFormClient";

export default async function DoctorProfile() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  if (!session) {
    return null;
  }

  return (
    <div className="w-full min-h-screen text-foreground bg-background font-sans p-4 md:p-10">
      <ProfileFormClient user={session.user} />
    </div>
  );
}