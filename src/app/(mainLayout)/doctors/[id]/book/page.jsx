import React from "react";
import { getDoctorProfile } from "@/app/lib/api/doctors";
import { notFound } from "next/navigation";
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
