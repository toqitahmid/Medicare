export const dynamic = "force-dynamic";
import React from "react";
import { getDoctorProfile } from "@/app/lib/api/doctors";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import BookingFormClient from "./BookingFormClient";

export async function generateMetadata({ params }) {
  const { id: email } = await params;
  const response = await getDoctorProfile(decodeURIComponent(email));
  const doctor = response?.success ? response.data : null;

  if (!doctor) return { title: "Not Found" };
  return { title: `Book Appointment with Dr. ${doctor.name} | Medicare` };
}

export default async function BookingPage({ params }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login");
  }

  const { id: email } = await params;
  
  const response = await getDoctorProfile(decodeURIComponent(email));
  const doctor = response?.success ? response.data : null;

  if (!doctor) {
    notFound();
  }

  return (
    <div className="min-h-[80vh] bg-default-50/30">
      <BookingFormClient doctor={doctor} />
    </div>
  );
}

