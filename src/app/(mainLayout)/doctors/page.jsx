import React, { Suspense } from "react";
import { getAllDoctors } from "@/app/lib/api/doctors";
import DoctorsListClient from "./DoctorsListClient";
import MainLayoutLoading from "@/app/(mainLayout)/loading";

export const metadata = {
  title: "Our Specialists | Medicare",
  description: "Browse our network of qualified medical specialists and book your consultation.",
};

// ISR: Cache and revalidate the page in the background
export const revalidate = 10;

export default async function DoctorsPage() {
  const response = await getAllDoctors();
  const doctors = response?.success ? response.data : [];

  return (
    <Suspense fallback={<MainLayoutLoading />}>
      <DoctorsListClient doctors={doctors} />
    </Suspense>
  );
}
