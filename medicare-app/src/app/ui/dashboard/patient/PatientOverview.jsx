"use client";
import React from "react";
import {
  Calendar,
  Clock,
  HeartPulse,
  Plus,
  CalendarX,
  Stethoscope,
  Activity,
  CreditCard,
  GraduationCap,
  ShieldCheck,
  Receipt,
  CheckCircle2, // Icon added for verified status
  Clock3, // Icon added for pending status
} from "lucide-react";
import Link from "next/link";

const PatientOverview = ({
  appointments = [],
  onNavigateTab,
  payments = [],
  // Pass user object or destructure verificationStatus directly
  user = { verificationStatus: "pending" },
}) => {
  const upcomingAppointments = appointments.filter((app) => {
    const status = app?.appointmentStatus?.toLowerCase();
    return status === "pending" || status === "accepted";
  });

  const upcomingVisitsCount = upcomingAppointments.length;
  const nextAppointment = upcomingAppointments.slice(0, 2);
  const paymentInfo =
    Array.isArray(payments) && payments.length > 0
      ? payments[payments.length - 1]
      : null;

  const latestPlanId = paymentInfo?.planId || "No Active Plan";

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? dateStr
      : date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  };

  // Helper component to render the dynamic status badge
  const renderVerificationBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "verified":
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2
              size={13}
              className="text-emerald-600 dark:text-emerald-400"
            />
            Verified
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Clock3 size={13} className="text-amber-600 dark:text-amber-400" />
            Verification Pending
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Welcome */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 -mr-12 -mt-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md">
              <HeartPulse size={14} /> Health Overview
            </span>
            {/* Added Verification Badge in Banner */}
            {renderVerificationBadge(user?.verificationStatus)}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome back to your Health Hub!
          </h2>
          <p className="mt-2 text-blue-100 text-sm">
            Manage your medical consultations, view prescriptions, track
            billing, and schedule appointments with top specialized doctors.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateTab?.("my-appointments")}
              className="px-4 py-2 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Calendar size={14} /> View Appointments
            </button>
            <Link
              href="/nab/find-doctors"
              className="px-4 py-2 rounded-xl bg-blue-700/60 hover:bg-blue-700 text-white font-medium text-xs backdrop-blur-md transition-all flex items-center gap-2 border border-white/20"
            >
              <Plus size={14} /> Book New Doctor
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Total Appointments
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {appointments.length}
            </h3>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Calendar size={22} />
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Upcoming Visits
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {upcomingVisitsCount}
            </h3>
          </div>
          <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
            <Clock size={22} />
          </div>
        </div>

        {/* Current Plan Card */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Current Plan</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {latestPlanId}
            </h3>
          </div>
          <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <ShieldCheck size={22} />
          </div>
        </div>

        {/* Total Payments Card */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Total Payments</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {payments.length}
            </h3>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Receipt size={22} />
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6 grid-cols-1">
        {nextAppointment.map((NXA, index) => (
          <div
            key={index}
            className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="text-blue-600" size={18} /> Next Scheduled
                Appointment
              </h3>
              {NXA && (
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                      NXA.appointmentStatus?.toLowerCase() === "accepted"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                    }`}
                  >
                    {NXA.appointmentStatus}
                  </span>
                </div>
              )}
            </div>

            {NXA ? (
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-md shrink-0">
                    {NXA.doctorName
                      ? NXA.doctorName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)
                      : "DR"}
                  </div>

                  <div className="space-y-1.5">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-1.5">
                        Dr. {NXA.doctorName}
                        {/* Optional Doctor verification check */}
                        {NXA.isVerified && (
                          <CheckCircle2
                            size={16}
                            className="text-blue-500 fill-blue-500/20"
                          />
                        )}
                      </h4>

                      {NXA.doctorQualifications && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <GraduationCap size={13} className="text-slate-400" />
                          {NXA.doctorQualifications}
                        </p>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <Stethoscope size={13} />
                      {NXA.doctorSpecialization || "General Medicine"}
                    </p>

                    {NXA.symptoms && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        <Activity size={13} className="text-rose-500" />
                        <span className="font-medium text-slate-500">
                          Symptoms:
                        </span>{" "}
                        {NXA.symptoms}
                      </p>
                    )}

                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300 pt-1 flex items-center gap-1.5">
                      <Clock size={13} className="text-blue-500" />
                      <span>{formatDate(NXA.appointmentDate)}</span>
                      <span>•</span>
                      <span>{NXA.appointmentTime}</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-dashed border-slate-200 dark:border-slate-800 text-center flex flex-col items-center justify-center gap-3">
                <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                  <CalendarX size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    No upcoming visits
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    You don't have any pending or accepted consultations right
                    now.
                  </p>
                </div>
                <Link
                  href="/nab/find-doctors"
                  className="mt-1 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors shadow-xs"
                >
                  Book a Visit
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientOverview;
