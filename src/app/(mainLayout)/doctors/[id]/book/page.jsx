import React from "react";
import { getDoctorProfile } from "@/app/lib/actions/doctors.actions";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import BookingFormClient from "./BookingFormClient";

export async function generateMetadata({ params }) {
  const { id: email } = await params;
  const response = await getDoctorProfile(decodeURIComponent(email));
  const doctor = response?.success ? response.data : null;

  if (!doctor) return { title: "Not Found" };
  return { title: `Book Appointment with Dr. ${doctor.name} | Medicare` };
}

export default async function BookingPage({ params }) {
  const { id: email } = await params;
  
  // Get currently logged in user using Better Auth
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  if (!session || !session.user) {
    // Redirect to login if they try to book while signed out
    redirect("/login");
  }

  const response = await getDoctorProfile(decodeURIComponent(email));
  const doctor = response?.success ? response.data : null;

  if (!doctor) {
    notFound();
  }

  return (
    <div className="min-h-[80vh] bg-default-50/30">
      <BookingFormClient doctor={doctor} user={session?.user} />
    </div>
  );
}
