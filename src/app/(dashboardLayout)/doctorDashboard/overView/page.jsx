import React, { Suspense } from "react";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { Spinner, Button } from "@heroui/react";
import { Clock, AlertCircle } from "lucide-react";
import DoctorOverviewClient from "./DoctorOverviewClient";
import { getDoctorProfile } from "@/app/lib/actions/doctors.actions";
import Link from "next/link";

async function DashboardContent() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  const userName = session?.user?.name || "Doctor";
  const status = session?.user?.status || "pending"; // default to pending if no status

  if (status === "pending") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Clock className="w-16 h-16 text-warning" />
        <h2 className="text-2xl font-bold text-foreground">Account Pending</h2>
        <p className="text-default-500 max-w-md text-center">
          Your account is currently under review by our administration team. We will notify you once your medical credentials have been verified.
        </p>
      </div>
    );
  }

  if (status === "suspended") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="w-16 h-16 text-danger" />
        <h2 className="text-2xl font-bold text-danger">Account Suspended</h2>
        <p className="text-default-500 max-w-md text-center">
          Your account has been suspended due to a violation of our terms of service or unusual activity. Please contact support.
        </p>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="w-16 h-16 text-danger" />
        <h2 className="text-2xl font-bold text-danger">Registration Rejected</h2>
        <p className="text-default-500 max-w-md text-center">
          Your account registration has been rejected. Please contact support if you believe this is a mistake.
        </p>
      </div>
    );
  }

  const profileResponse = await getDoctorProfile(session?.user?.email);
  
  if (!profileResponse?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="w-16 h-16 text-warning" />
        <h2 className="text-2xl font-bold text-foreground">Profile Incomplete</h2>
        <p className="text-default-500 max-w-md text-center mb-2">
          Please complete your medical profile with your qualifications, experience, and availability to fully access your dashboard.
        </p>
        <Link href="/doctorDashboard/profile">
          <Button color="primary" variant="shadow" className="font-semibold border-2 px-5 py-2 rounded-2xl cursor-pointer bg-emerald-400">
            Complete Profile Now
          </Button>
        </Link>
      </div>
    );
  }

  return <DoctorOverviewClient userName={userName} status={status} />;
}

export default function DoctorOverview() {
  return (
    <div className="w-full min-h-screen text-foreground bg-background font-sans p-10">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Spinner size="lg" color="warning" label="Loading dashboard..." />
        </div>
      }>
        <DashboardContent />
      </Suspense>
    </div>
  );
}