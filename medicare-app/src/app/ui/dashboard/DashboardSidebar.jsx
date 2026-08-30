"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  CreditCard,
  Star,
  Clock,
  ClipboardList,
  FileText,
  Users,
  CalendarCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  UserCheck,
  ShieldAlert,
  Home,
  LogOut,
  Sparkles,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

export const ROLE_SIDEBAR_ITEMS = {
  patient: [
    {
      id: "dashboard-overview",
      label: "Dashboard Overview",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "my-appointments",
      label: "My Appointments",
      icon: Calendar,
      badge: "2 Upcoming",
    },
    {
      id: "payment-history",
      label: "Payment History",
      icon: CreditCard,
      badge: null,
    },
    {
      id: "my-reviews",
      label: "My Reviews",
      icon: Star,
      badge: null,
    },
  ],
  doctor: [
    {
      id: "dashboard-overview",
      label: "Dashboard Overview",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "manage-schedule",
      label: "Manage Schedule",
      icon: Clock,
      badge: "Today",
    },
    {
      id: "appointment-requests",
      label: "Appointment Requests",
      icon: ClipboardList,
      badge: "3 New",
    },
    {
      id: "prescription-management",
      label: "Prescription Management",
      icon: FileText,
      badge: null,
    },
  ],
  admin: [
    {
      id: "dashboard-overview",
      label: "Dashboard Overview",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "manage-patients",
      label: "Manage Patients",
      icon: Users,
      badge: "3 Pending",
    },
    {
      id: "manage-doctors",
      label: "Manage Doctors",
      icon: Users,
      badge: "2 Pending",
    },
    {
      id: "all-appointments",
      label: "All Appointments",
      icon: CalendarCheck,
      badge: null,
    },
  ],
};

const ROLE_META = {
  patient: {
    label: "Patient Portal",
    icon: UserCheck,
    color: "from-blue-600 to-indigo-600",
    badgeBg: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
  },
  doctor: {
    label: "Doctor Desk",
    icon: Stethoscope,
    color: "from-teal-600 to-emerald-600",
    badgeBg: "bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300",
  },
  admin: {
    label: "Admin Console",
    icon: ShieldAlert,
    color: "from-purple-600 to-pink-600",
    badgeBg: "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300",
  },
};

export default function DashboardSidebar({
  role = "patient",
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const router = useRouter();
  const menuItems = ROLE_SIDEBAR_ITEMS[role] || ROLE_SIDEBAR_ITEMS.patient;
  const currentRoleMeta = ROLE_META[role] || ROLE_META.patient;
  const RoleIcon = currentRoleMeta.icon;

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 shadow-xl md:shadow-none
        ${isCollapsed ? "w-20" : "w-64"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Brand & Logo Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-xl shadow-md shrink-0">
              +
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  Medi<span className="text-blue-600 dark:text-blue-400">Care</span>
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Healthcare System
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Role Identity Tag */}
        <div className="p-3">
          <div
            className={`flex items-center gap-3 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div
              className={`p-2 rounded-lg bg-gradient-to-r ${currentRoleMeta.color} text-white shadow-xs shrink-0`}
            >
              <RoleIcon size={18} />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                  {currentRoleMeta.label}
                </span>
                <span className="text-[11px] text-slate-500 capitalize truncate">
                  Role: <span className="font-medium text-slate-700 dark:text-slate-300">{role}</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1">
            {!isCollapsed ? "Main Navigation" : "Menu"}
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (setIsMobileOpen) setIsMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group relative ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 dark:bg-blue-600"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon
                  size={20}
                  className={`shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? "text-white" : "text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                  }`}
                />

                {!isCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}

                {!isCollapsed && item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : currentRoleMeta.badgeBg
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Tooltip badge dot for collapsed mode */}
                {isCollapsed && item.badge && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
          <Link
            href="/"
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors ${
              isCollapsed ? "justify-center" : ""
            }`}
            title={isCollapsed ? "Back to Home" : undefined}
          >
            <Home size={18} className="shrink-0 text-slate-500" />
            {!isCollapsed && <span>Back to Home</span>}
          </Link>

        </div>
      </aside>
    </>
  );
}
