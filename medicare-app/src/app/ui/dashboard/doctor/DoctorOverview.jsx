"use client";

import {
  CalendarDays,
  ClipboardCheck,
  FileText,
  Users,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const sections = {
  "manage-schedule": {
    title: "Manage Schedule",
    description:
      "Keep availability current so patients can book with confidence.",
    icon: CalendarDays,
    rows: [
      "Today · 09:00 AM - 01:00 PM",
      "Tomorrow · 02:00 PM - 06:00 PM",
      "Friday · 09:00 AM - 12:00 PM",
    ],
  },
  "appointment-requests": {
    title: "Appointment Requests",
    description: "Review new consultations and respond from one focused queue.",
    icon: ClipboardCheck,
    rows: [
      "Ava Williams · Cardiology · Today, 04:00 PM",
      "Noah Smith · Follow-up · Tomorrow, 10:30 AM",
      "Mia Johnson · Cardiology · Aug 28, 02:00 PM",
    ],
  },
  "prescription-management": {
    title: "Prescription Management",
    description: "Find recent patients and keep prescription notes organized.",
    icon: FileText,
    rows: [
      "Amoxicillin 500mg · Ava Williams",
      "Atorvastatin 20mg · Noah Smith",
      "Vitamin D3 · Mia Johnson",
    ],
  },
};

export default function DoctorOverview({ activeTab }) {
  const section = sections[activeTab];
  const SectionIcon = section?.icon || Users;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-linear-to-r from-teal-700 via-emerald-700 to-slate-800 p-6 text-white shadow-xl md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
          Doctor desk
        </p>
        <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
          A calmer way to run your clinic.
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50/80">
          Monitor requests, shape your availability, and keep patient care
          moving without losing the clinical details.
        </p>
      </div>

      {activeTab === "dashboard-overview" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Today’s appointments", "08", CalendarDays, "2 telehealth"],
            ["New requests", "03", ClipboardCheck, "Needs review"],
            ["Active patients", "128", Users, "+8 this month"],
            ["Prescriptions", "24", FileText, "6 this week"],
          ].map(([label, value, Icon, note]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <Icon className="text-teal-600 dark:text-teal-400" size={21} />
              <p className="mt-5 text-xs text-slate-500">{label}</p>
              <p className="mt-1 text-3xl font-extrabold">{value}</p>
              <p className="mt-1 text-[11px] font-semibold text-emerald-600">
                {note}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-teal-50 p-3 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300">
              <SectionIcon size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold">{section.title}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {section.description}
              </p>
            </div>
          </div>
          <div className="mt-5 divide-y divide-slate-100 dark:divide-slate-800">
            {section.rows.map((row) => (
              <div
                key={row}
                className="flex items-center justify-between gap-4 py-4 text-sm"
              >
                <span>{row}</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 size={14} /> Ready
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Next open slot
          </p>
          <p className="mt-2 text-xl font-bold">Today, 04:00 PM</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <Clock3 size={13} /> 30 minute consultation
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Care completion
          </p>
          <p className="mt-2 text-xl font-bold">96%</p>
          <p className="mt-1 text-xs text-emerald-600">+4% from last month</p>
        </div>
      </div>
    </div>
  );
}
