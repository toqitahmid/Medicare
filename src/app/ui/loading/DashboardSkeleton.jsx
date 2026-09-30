"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeartPulse, Activity, Sparkles } from "lucide-react";

/**
 * Shimmering skeleton box utility
 */
export function Skeleton({ className = "", rounded = "rounded-xl" }) {
  return (
    <div
      className={`relative overflow-hidden bg-default-200/60 dark:bg-default-100/40 ${rounded} ${className}`}
    >
      <motion.div
        animate={{
          x: ["-100%", "150%"],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent pointer-events-none"
      />
    </div>
  );
}

/**
 * Doctor card skeleton loader for Patient Dashboard or Find Doctors
 */
export function DoctorCardsSkeleton({ count = 2 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="relative overflow-hidden bg-background border border-divider/70 rounded-2xl p-5 flex flex-col items-center text-center shadow-sm"
        >
          {/* Shimmer sweep */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent pointer-events-none"
          />

          {/* Avatar Skeleton */}
          <div className="relative mb-3">
            <Skeleton className="w-16 h-16" rounded="rounded-full" />
            <Skeleton className="w-5 h-5 absolute -bottom-1 -right-1" rounded="rounded-full" />
          </div>

          {/* Name & Specialty */}
          <Skeleton className="w-28 h-4 mb-2" />
          <Skeleton className="w-20 h-3 mb-4" />

          {/* Button */}
          <Skeleton className="w-full h-8" rounded="rounded-lg" />
        </div>
      ))}
    </div>
  );
}

/**
 * Table rows skeleton loader for data tables
 */
export function TableRowsSkeleton({ rows = 5, cols = 4 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rIdx) => (
        <tr
          key={rIdx}
          className="border-b border-divider/50 transition-colors animate-pulse"
        >
          {Array.from({ length: cols }).map((_, cIdx) => (
            <td key={cIdx} className="py-4 px-6">
              {cIdx === 0 ? (
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 shrink-0" rounded="rounded-full" />
                  <div className="space-y-1.5 w-full max-w-[140px]">
                    <Skeleton className="w-full h-3.5" />
                    <Skeleton className="w-2/3 h-2.5" />
                  </div>
                </div>
              ) : cIdx === cols - 1 ? (
                <div className="flex justify-center gap-2">
                  <Skeleton className="w-8 h-8" rounded="rounded-lg" />
                  <Skeleton className="w-8 h-8" rounded="rounded-lg" />
                </div>
              ) : (
                <Skeleton className="w-24 h-4" />
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

/**
 * Full Dashboard Skeleton Page
 */
export default function DashboardSkeleton({
  variant = "generic", // "admin" | "doctor" | "patient" | "generic"
  title,
}) {
  const isDoctor = variant === "doctor";
  const isPatient = variant === "patient";
  const isAdmin = variant === "admin";

  const defaultRoleTitle = isAdmin
    ? "Admin Management Portal"
    : isDoctor
    ? "Doctor Clinical Portal"
    : isPatient
    ? "Patient Health Portal"
    : "Medicare Healthcare Dashboard";

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] p-4 md:p-8 space-y-6 animate-fadeIn">
      {/* Top Floating Sync Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-transparent border border-teal-500/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#103b42] to-cyan-500 text-white shadow-md shadow-cyan-500/20">
            <HeartPulse className="w-5 h-5 animate-pulse text-cyan-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              {title || defaultRoleTitle}
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 uppercase tracking-wider">
                Syncing Live
              </span>
            </h2>
            <p className="text-xs text-default-500">
              Fetching real-time appointments, telemetry, and encrypted records...
            </p>
          </div>
        </div>

        {/* Progress pulse pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1 rounded-full bg-background/80 border border-divider text-xs text-default-600 shadow-sm">
          <Activity className="w-3.5 h-3.5 text-cyan-500 animate-spin" />
          <span className="font-medium">Loading modules</span>
        </div>
      </div>

      {/* Hero Welcome Banner Skeleton */}
      <div className="relative overflow-hidden p-6 md:p-8 rounded-3xl bg-content1/60 border border-divider/70 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Skeleton className="w-16 h-16 md:w-20 md:h-20 shrink-0" rounded="rounded-2xl" />
          <div className="space-y-2.5 w-full max-w-sm">
            <Skeleton className="w-48 h-6" />
            <Skeleton className="w-64 h-4" />
            <div className="flex gap-2 pt-1">
              <Skeleton className="w-20 h-5" rounded="rounded-full" />
              <Skeleton className="w-24 h-5" rounded="rounded-full" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <Skeleton className="w-28 h-10" rounded="rounded-xl" />
          <Skeleton className="w-32 h-10" rounded="rounded-xl" />
        </div>
      </div>

      {/* 4 Metric Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {[
          { label: "Metric 1", glow: "from-blue-500/10" },
          { label: "Metric 2", glow: "from-teal-500/10" },
          { label: "Metric 3", glow: "from-cyan-500/10" },
          { label: "Metric 4", glow: "from-amber-500/10" },
        ].map((card, i) => (
          <div
            key={i}
            className="relative overflow-hidden p-5 rounded-2xl bg-content1/70 border border-divider/60 shadow-sm flex flex-col justify-between h-36"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="w-10 h-10" rounded="rounded-xl" />
              <Skeleton className="w-14 h-5" rounded="rounded-full" />
            </div>

            <div className="space-y-2 mt-4">
              <Skeleton className="w-20 h-7" />
              <Skeleton className="w-28 h-3.5" />
            </div>

            {/* Subtle glow highlight */}
            <div
              className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-gradient-to-br ${card.glow} to-transparent blur-xl pointer-events-none`}
            />
          </div>
        ))}
      </div>

      {/* Main Content Layout: Large Chart Skeleton + Aside Widget Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left / Center 2 Cols: Main Chart / Queue Area */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-content1/70 border border-divider/60 shadow-sm space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <Skeleton className="w-36 h-5" />
              <Skeleton className="w-48 h-3.5" />
            </div>
            <Skeleton className="w-24 h-8" rounded="rounded-lg" />
          </div>

          {/* Simulated chart / waveform skeleton */}
          <div className="h-64 w-full flex items-end justify-between gap-2 pt-8 pb-2 px-4 bg-default-50/50 dark:bg-default-100/10 rounded-2xl border border-divider/40">
            {[40, 65, 30, 85, 55, 95, 70, 45, 80, 60, 90, 75].map((height, barIdx) => (
              <div key={barIdx} className="w-full flex flex-col items-center gap-2 h-full justify-end">
                <Skeleton
                  className="w-full max-w-[28px]"
                  rounded="rounded-t-lg"
                  style={{ height: `${height}%` }}
                />
                <Skeleton className="w-6 h-2.5" />
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Widget / Doctors / Appointments Skeleton */}
        <div className="p-6 rounded-3xl bg-content1/70 border border-divider/60 shadow-sm space-y-4">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="w-32 h-5" />
            <Skeleton className="w-16 h-3" />
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="p-3 rounded-2xl bg-background/60 border border-divider/50 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="w-11 h-11 shrink-0" rounded="rounded-full" />
                  <div className="space-y-1.5">
                    <Skeleton className="w-24 h-3.5" />
                    <Skeleton className="w-16 h-2.5" />
                  </div>
                </div>
                <Skeleton className="w-14 h-6" rounded="rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
