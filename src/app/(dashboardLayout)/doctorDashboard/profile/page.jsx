import React from "react";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import ProfileFormClient from "./ProfileFormClient";
import { getDoctorProfile } from "@/app/lib/actions/doctors.actions";

export default async function DoctorProfile() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  if (!session) {
    return null;
  }

  // Fetch the existing profile if it exists in the database
  const profileResponse = await getDoctorProfile(session.user.email);
  const existingProfile = profileResponse?.success ? profileResponse.data : null;

  return (
    <div className="w-full min-h-screen text-foreground bg-background font-sans p-4 md:p-10">
      <ProfileFormClient user={session.user} existingProfile={existingProfile} />
    </div>
  );
}