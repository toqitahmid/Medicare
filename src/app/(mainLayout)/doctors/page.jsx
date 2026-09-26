import React from "react";
import { getAllDoctors } from "@/app/lib/actions/doctors.actions";
import DoctorsListClient from "./DoctorsListClient";

export const metadata = {
  title: "Our Specialists | Medicare",
  description: "Browse our network of qualified medical specialists and book your consultation.",
};

export default async function DoctorsPage({ searchParams }) {
  const params = await Promise.resolve(searchParams);
  const specialization = params?.specialization || "";
  
  const response = await getAllDoctors();
  const doctors = response?.success ? response.data : [];

  return <DoctorsListClient doctors={doctors} initialSpecialization={specialization} />;
}
