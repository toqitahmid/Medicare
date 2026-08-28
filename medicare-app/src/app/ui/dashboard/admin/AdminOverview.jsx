"use client";

import {
  Activity,
  CalendarCheck,
  Settings,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

export default function AdminOverview({
  activeTab = "dashboard-overview",
  adminUsers = [],
  adminPatients = [],
  adminDoctors = [],
  adminAppointments = [],
  adminReviews = [],
  AdminData = {},
}) {
  // Array lengths directly
  const usersCount = adminUsers.length;
  const patientsCount = adminPatients.length;
  const doctorsCount = adminDoctors.length;
  const appointmentsCount = adminAppointments.length;
  const reviewsCount = adminReviews.length;

  // Console log props and counts for debugging
  console.log("AdminOverview Props & Counts:", {
    activeTab,
    usersCount,
    patientsCount,
    doctorsCount,
    appointmentsCount,
    reviewsCount,
    adminUsers,
    adminPatients,
    adminDoctors,
    adminAppointments,
    adminReviews,
  });

  const sections = {
    "manage-users": {
      title: "Manage Users & Doctors",
      description: "Overview of user and doctor counts.",
      icon: Users,
      rows: [
        `Total Users: ${usersCount}`,
        `Total Patients: ${patientsCount}`,
        `Total Doctors: ${doctorsCount}`,
      ],
    },
    "all-appointments": {
      title: "All Appointments",
      description: "Total appointment metrics.",
      icon: CalendarCheck,
      rows: [`Total Appointments: ${appointmentsCount}`],
    },
    "system-settings": {
      title: "System Settings",
      description: "Platform health and review counts.",
      icon: Settings,
      rows: [`Total Reviews: ${reviewsCount}`],
    },
  };

  const section = sections[activeTab];
  const SectionIcon = section?.icon || Activity;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-linear-to-r from-slate-800 via-slate-700 to-cyan-800 p-6 text-white shadow-xl md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
          Admin console
        </p>
        <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
          Platform health, in one clear view.
        </h2>
      </div>

      {activeTab === "dashboard-overview" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Users", usersCount, Users],
            ["Patients", patientsCount, Users],
            ["Doctors", doctorsCount, Stethoscope],
            ["Appointments", appointmentsCount, CalendarCheck],
            ["Reviews", reviewsCount, ShieldCheck],
          ].map(([label, count, Icon]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <Icon className="text-cyan-700 dark:text-cyan-400" size={21} />
              <p className="mt-5 text-xs text-slate-500">{label}</p>
              <p className="mt-1 text-3xl font-extrabold">{count}</p>
            </div>
          ))}
        </div>
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-cyan-50 p-3 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
              <SectionIcon size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold">{section?.title}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {section?.description}
              </p>
            </div>
          </div>
          <div className="mt-5 divide-y divide-slate-100 dark:divide-slate-800">
            {section?.rows.map((row) => (
              <div
                key={row}
                className="flex items-center gap-3 py-4 text-sm font-semibold"
              >
                <span className="h-2 w-2 rounded-full bg-cyan-500" />
                {row}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
