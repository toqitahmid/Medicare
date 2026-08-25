"use client";

import { Activity, CalendarCheck, Settings, ShieldCheck, Stethoscope, Users } from "lucide-react";

const sections = {
  "manage-users": { title: "Manage Users & Doctors", description: "Keep provider verification and patient access moving.", icon: Users, rows: ["5 doctor profiles awaiting verification", "12 new patient registrations this week", "2 access reviews need attention"] },
  "all-appointments": { title: "All Appointments", description: "See platform-wide appointment activity at a glance.", icon: CalendarCheck, rows: ["42 appointments scheduled today", "8 consultations currently in progress", "4 cancellations need follow-up"] },
  "system-settings": { title: "System Settings", description: "Review the controls that keep the Medicare platform healthy.", icon: Settings, rows: ["Authentication service · Operational", "Payments service · Operational", "Notifications · Operational"] },
};

export default function AdminDashboard({ activeTab }) {
  const section = sections[activeTab];
  const SectionIcon = section?.icon || Activity;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-linear-to-r from-slate-800 via-slate-700 to-cyan-800 p-6 text-white shadow-xl md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Admin console</p>
        <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">Platform health, in one clear view.</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-200/80">Track access, care delivery, and service health across the Medicare network.</p>
      </div>

      {activeTab === "dashboard-overview" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[["Total patients", "2,840", Users, "+12.4%"], ["Verified doctors", "184", Stethoscope, "+6 this month"], ["Appointments today", "42", CalendarCheck, "92% confirmed"], ["System uptime", "99.98%", ShieldCheck, "All services healthy"]].map(([label, value, Icon, note]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"><Icon className="text-cyan-700 dark:text-cyan-400" size={21} /><p className="mt-5 text-xs text-slate-500">{label}</p><p className="mt-1 text-3xl font-extrabold">{value}</p><p className="mt-1 text-[11px] font-semibold text-emerald-600">{note}</p></div>
          ))}
        </div>
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"><div className="flex items-start gap-3"><div className="rounded-xl bg-cyan-50 p-3 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300"><SectionIcon size={20} /></div><div><h3 className="text-base font-bold">{section.title}</h3><p className="mt-1 text-sm text-slate-500">{section.description}</p></div></div><div className="mt-5 divide-y divide-slate-100 dark:divide-slate-800">{section.rows.map((row) => <div key={row} className="flex items-center gap-3 py-4 text-sm"><span className="h-2 w-2 rounded-full bg-cyan-500" />{row}</div>)}</div></section>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center gap-2"><Activity size={18} className="text-cyan-700 dark:text-cyan-400" /><h3 className="text-base font-bold">Live activity</h3></div><div className="mt-4 grid gap-3 text-xs text-slate-500 sm:grid-cols-3"><span className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">Payments synced 2 min ago</span><span className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">Doctor directory updated 8 min ago</span><span className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">Backups completed today</span></div></div>
    </div>
  );
}
