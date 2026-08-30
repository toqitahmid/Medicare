"use client";

import {
  CalendarDays,
  ClipboardCheck,
  FileText,
  Users,
  Clock3,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Stethoscope,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
} from "lucide-react";

const sections = {
  "manage-schedule": {
    title: "Manage Schedule",
    description:
      "Keep availability current so patients can book with confidence.",
    icon: CalendarDays,
  },
  "appointment-requests": {
    title: "Appointment Requests",
    description: "Review new consultations and respond from one focused queue.",
    icon: ClipboardCheck,
  },
  "prescription-management": {
    title: "Prescription Management",
    description: "Find recent patients and keep prescription notes organized.",
    icon: FileText,
  },
};

export default function DoctorOverview({
  doctorAppointments = [],
  doctorTodayAppointments = [],
  schedules = [],
  doctorPrescriptions = [],
  stats = {},
  activeTab,
  doctorProfile = {}, // Pass doctor profile object containing verificationStatus
}) {
  const section = sections[activeTab];
  const SectionIcon = section?.icon || Users;

  // Filter pending appointments matching your appointmentStatus schema field
  const pendingAppointments = doctorAppointments.filter(
    (apt) => apt.appointmentStatus?.toLowerCase() === "pending",
  );

  // Map section data dynamically based on active tab
  const getSectionRows = () => {
    switch (activeTab) {
      case "manage-schedule":
        return schedules;
      case "appointment-requests":
        return doctorAppointments;
      case "prescription-management":
        return doctorPrescriptions;
      default:
        return [];
    }
  };

  const rows = getSectionRows();

  const statCards = [
    {
      label: "Today’s appointments",
      value: doctorTodayAppointments.length,
      icon: CalendarDays,
      note: stats.telehealthCount
        ? `${stats.telehealthCount} telehealth`
        : null,
    },
    {
      label: "Total Appointments",
      value: stats.newRequests ?? doctorAppointments.length,
      icon: ClipboardCheck,
      note: stats.newRequestsNote ?? null,
    },
    {
      label: "Total Patients",
      value: doctorAppointments.length ?? 0,
      icon: Users,
      note: stats.activePatientsNote ?? null,
    },
    {
      label: "Prescriptions",
      value: doctorPrescriptions?.length,
      icon: FileText,
      note: stats.prescriptionsNote ?? null,
    },
  ];

  // Render Verification Badge helper based on doctorProfile.verificationStatus
  const renderVerificationBadge = () => {
    const status = doctorProfile?.verificationStatus?.toLowerCase();

    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-md ring-1 ring-emerald-400/30">
            <ShieldCheck size={14} className="text-emerald-300" />
            Verified Doctor
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-200 backdrop-blur-md ring-1 ring-rose-400/30">
            <ShieldX size={14} className="text-rose-300" />
            Verification Rejected
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-200 backdrop-blur-md ring-1 ring-amber-400/30">
            <ShieldAlert size={14} className="text-amber-300" />
            Verification Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-linear-to-r from-teal-700 via-emerald-700 to-slate-800 p-6 text-white shadow-xl md:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
            Doctor desk
          </p>
          {/* Dynamic Verification Badge */}
          {renderVerificationBadge()}
        </div>

        <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
          Welcome back, Dr. {doctorProfile?.name || "Doctor"}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50/80">
          Monitor requests, shape your availability, and keep patient care
          moving without losing the clinical details.
        </p>
      </div>

      {activeTab === "dashboard-overview" ? (
        <div className="space-y-6">
          {/* Stat Cards Overview */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map(({ label, value, icon: Icon, note }) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
              >
                <Icon className="text-teal-600 dark:text-teal-400" size={21} />
                <p className="mt-5 text-xs text-slate-500">{label}</p>
                <p className="mt-1 text-3xl font-extrabold">{value}</p>
                {note && (
                  <p className="mt-1 text-[11px] font-semibold text-emerald-600">
                    {note}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Pending Appointments Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Pending Appointments
              </h3>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                {pendingAppointments.length} Pending
              </span>
            </div>

            {pendingAppointments.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pendingAppointments.map((apt) => (
                  <div
                    key={apt._id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-slate-100">
                            {apt.patientName}
                          </h4>
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                            <Stethoscope
                              size={12}
                              className="text-teal-600 dark:text-teal-400"
                            />
                            {apt.doctorSpecialization}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-600/20 ring-inset dark:bg-amber-950/40 dark:text-amber-400">
                          <AlertCircle size={12} />
                          {apt.appointmentStatus}
                        </span>
                      </div>

                      <div className="mt-3">
                        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                          Symptoms / Reason
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-600 line-clamp-2 dark:text-slate-400">
                          {apt.symptoms || "No symptoms specified."}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-slate-400" />
                        {apt.appointmentDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock3 size={13} className="text-slate-400" />
                        {apt.appointmentTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
                <Clock3 className="mx-auto text-slate-400" size={32} />
                <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                  No pending appointment requests right now.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-teal-50 p-3 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300">
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
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <div
                  key={row._id || row.id || index}
                  className="flex items-center justify-between gap-4 py-4 text-sm"
                >
                  <span>
                    {typeof row === "string"
                      ? row
                      : row.patientName || row.label || row.title}
                  </span>
                  {(row.appointmentStatus || row.status) && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <CheckCircle2 size={14} />{" "}
                      {row.appointmentStatus || row.status}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="py-4 text-sm text-slate-500">No data available.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
