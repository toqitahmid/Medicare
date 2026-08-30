"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  User,
  ChevronRight,
  FileText,
  CalendarX,
  GraduationCap,
  Stethoscope,
  Activity,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { toast, Zoom } from "react-toastify";
import { authHeader } from "@/app/lib/core/token";

// Helper function to format ISO date strings into readable text
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function MyAppointments({ appointments = [] }) {
  const appointmentList = appointments.length > 0 ? appointments : [];

  // Modal and Form States
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openReviewModal = (appointment) => {
    setSelectedAppointment(appointment);
    setRating(5);
    setReviewText("");
  };

  const closeReviewModal = () => {
    setSelectedAppointment(null);
    setRating(5);
    setHoverRating(0);
    setReviewText("");
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    setIsSubmitting(true);

    // Payload containing required appointment and review details
    const payload = {
      appointmentId: selectedAppointment.id || selectedAppointment._id,
      patientId: selectedAppointment.patientId,
      patientName: selectedAppointment.patientName || "Anonymous Patient",
      doctorId: selectedAppointment.doctorId,
      doctorName: selectedAppointment.doctorName,
      rating: Number(rating),
      reviewText: reviewText,
    };
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
      const response = await fetch(`${baseUrl}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(await authHeader()),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit review.");
      }

      toast.success("Review submitted successfully!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        transition: Zoom,
      });

      closeReviewModal();
    } catch (error) {
      toast.error(
        error.message || "Failed to submit review. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            My Appointments
          </h2>
          <p className="text-xs text-slate-500">
            Manage your booked medical appointments and telehealth sessions
          </p>
        </div>

        <Link
          href="/nab/find-doctors"
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} /> Book New Appointment
        </Link>
      </div>

      {/* Appointments List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {appointmentList.map((nextAppointment, index) => {
          const status =
            nextAppointment.appointmentStatus ||
            nextAppointment.status ||
            "Pending";
          const date = nextAppointment.appointmentDate || nextAppointment.date;
          const time = nextAppointment.appointmentTime || nextAppointment.time;
          const specialization =
            nextAppointment.doctorSpecialization ||
            nextAppointment.specialization ||
            "General Medicine";

          return (
            <div
              key={nextAppointment.id || index}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="w-full p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
                {/* Section Header & Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar className="text-blue-600" size={18} /> Next
                    Scheduled Appointment
                  </h3>
                  {nextAppointment && (
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                          status.toLowerCase() === "accepted" ||
                          status.toLowerCase() === "upcoming"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                            : status.toLowerCase() === "completed"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                              : status.toLowerCase() === "cancelled"
                                ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  )}
                </div>

                {/* Appointment Card Data */}
                {nextAppointment ? (
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                    <div className="flex items-start gap-4">
                      {/* Doctor Avatar Badge */}
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-md shrink-0">
                        {nextAppointment.doctorName
                          ? nextAppointment.doctorName
                              .replace(/^Dr\.\s*/i, "")
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)
                          : "DR"}
                      </div>

                      {/* Doctor & Visit Details */}
                      <div className="space-y-1.5">
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-base">
                            Dr.{" "}
                            {nextAppointment.doctorName?.replace(
                              /^Dr\.\s*/i,
                              "",
                            )}
                          </h4>

                          {nextAppointment.doctorQualifications && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              <GraduationCap
                                size={13}
                                className="text-slate-400"
                              />
                              {nextAppointment.doctorQualifications}
                            </p>
                          )}
                        </div>

                        {/* Specialization */}
                        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                          <Stethoscope size={13} />
                          {specialization}
                        </p>

                        {/* Reported Symptoms */}
                        {nextAppointment.symptoms && (
                          <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                            <Activity size={13} className="text-rose-500" />
                            <span className="font-medium text-slate-500">
                              Symptoms:
                            </span>{" "}
                            {nextAppointment.symptoms}
                          </p>
                        )}

                        {/* Date & Time */}
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-300 pt-1 flex items-center gap-1.5">
                          <Clock size={13} className="text-blue-500" />
                          <span>{formatDate(date)}</span>
                          <span>•</span>
                          <span>{time}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row-reverse w-full sm:w-auto">
                      {status.toLowerCase() === "accepted" && (
                        <Button
                          onClick={() => openReviewModal(nextAppointment)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all"
                        >
                          Give Review
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Empty State */
                  <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-dashed border-slate-200 dark:border-slate-800 text-center flex flex-col items-center justify-center gap-3">
                    <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                      <CalendarX size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        No upcoming visits
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        You don't have any pending or accepted consultations
                        right now.
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
            </div>
          );
        })}
      </div>

      {/* Review Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Leave a Review
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Share your feedback for Dr. {selectedAppointment.doctorName}
                </p>
              </div>
              <button
                onClick={closeReviewModal}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-hidden transition-transform hover:scale-110"
                    >
                      <Star
                        size={28}
                        className={`${
                          star <= (hoverRating || rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300 dark:text-slate-700"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-bold text-amber-500">
                    {hoverRating || rating} / 5
                  </span>
                </div>
              </div>

              {/* Text Review Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Your Feedback
                </label>
                <textarea
                  required
                  rows={4}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us about your consultation experience..."
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  onClick={closeReviewModal}
                  className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2 rounded-xl transition-all shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
