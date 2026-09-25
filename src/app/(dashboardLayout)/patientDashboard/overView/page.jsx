import React, { Suspense } from "react";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { Avatar, Spinner } from "@heroui/react";
import { Clock, AlertCircle } from "lucide-react";
import UpComming from "./UpComming";
import Payments from "./Payments";
import Doctors from "./Doctors";
import Appointment from "./Appointment";

async function DashboardContent() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  const userName = session?.user?.name || "Patient";
  const userPhoto = session?.user?.photo || "https://i.pravatar.cc/150?u=a04258114e29026702d";
  const status = session?.user?.status || "pending"; // default to pending if no status

  if (status === "pending") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Clock className="w-16 h-16 text-warning" />
        <h2 className="text-2xl font-bold text-foreground">Account Pending</h2>
        <p className="text-default-500 max-w-md text-center">
          Your account is currently under review. We will notify you once your account has been verified.
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

  return (
    <>
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back, <span className="text-orange-500">{userName.split(' ')[0]}</span>! 👋
          </h1>
          <p className="text-default-500 text-sm font-medium">Here is your health overview for today.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar src={userPhoto} size="sm" className="ring-2 ring-content1 cursor-pointer hover:ring-default-400 transition-all"/>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-orange-500 border-2 border-background rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1fr] gap-x-12 gap-y-10">
        
        {/* LEFT COLUMN */}
        <div className="space-y-10">
          <UpComming/>
          <Payments/>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-10">
          <Doctors/>
          <Appointment/>
        </div>
      </div>
    </>
  );
}

export default function PatientOverview() {
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