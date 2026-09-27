import React from "react";
import { getAllDoctors } from "@/app/lib/actions/doctors.actions";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import BookingFormClient from "./BookingFormClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const response = await getAllDoctors();
  const doctors = response?.success ? response.data : [];
  const doctor = doctors.find((doc) => doc._id === id);

  if (!doctor) return { title: "Not Found" };
  return { title: `Book Appointment with Dr. ${doctor.name} | Medicare` };
}

export default async function BookingPage({ params }) {
  const { id } = await params;
  
  // Get currently logged in user using Better Auth
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  if (!session || !session.user) {
    // Redirect to login if they try to book while signed out
    redirect("/login");
  }

  const response = await getAllDoctors();
  const doctors = response?.success ? response.data : [];
  const doctor = doctors.find((doc) => doc._id === id);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="min-h-[80vh] bg-default-50/30">
      <BookingFormClient doctor={doctor} user={session.user} />
    </div>
  );
}
