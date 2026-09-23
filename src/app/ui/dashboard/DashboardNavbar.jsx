"use client";

import React, { useState } from "react";
import {
  Menu,
  Bell,
  Search,
  User,
  Shield,
  Stethoscope,
  UserCheck,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";

export default function DashboardNavbar({
  role = "patient",
  setRole,
  activeTabTitle = "Dashboard Overview",
  onMobileMenuToggle,
}) {
  const { data: session } = authClient.useSession();
  const roles = [
    {
      id: "patient",
      name: "Patient Portal",
      desc: "Appointments, history & reviews",
      icon: UserCheck,
      color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50",
    },
    {
      id: "doctor",
      name: "Doctor Desk",
      desc: "Schedules, requests & prescriptions",
      icon: Stethoscope,
      color: "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50",
    },
    {
      id: "admin",
      name: "Admin Console",
      desc: "Platform stats & management",
      icon: Shield,
      color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50",
    },
  ];


  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Left side: Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="p-2 rounded-xl md:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          <Menu size={22} />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {role} Dashboard
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white capitalize leading-tight">
            {activeTabTitle}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Search Bar - hidden on mobile */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-xs w-48">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search dashboard..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-xs"
          />
        </div>


        {/* User Info Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs uppercase">
            {session?.user?.name ? session.user.name.charAt(0) : "U"}
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 dark:text-white leading-none">
              {session?.user?.name || "Demo User"}
            </span>
            <span className="text-[10px] text-slate-500 capitalize">
              {session?.user?.role || role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
