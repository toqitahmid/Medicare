import React from "react";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { Avatar } from "@heroui/react";
import UpComming from "./UpComming";
import Payments from "./Payments";
import Doctors from "./Doctors";
import Appointment from "./Appointment";

export default async function PatientOverview() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  const userName = session?.user?.name || "Patient";
  const userPhoto = session?.user?.photo || "https://i.pravatar.cc/150?u=a04258114e29026702d";

  return (
    <div className="w-full min-h-screen text-foreground bg-background font-sans p-10">
      
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
    </div>
  );
}