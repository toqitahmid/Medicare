import React, { Suspense } from "react";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { Spinner } from "@heroui/react";
import { Clock, AlertCircle } from "lucide-react";
import DoctorOverviewClient from "./DoctorOverviewClient";

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