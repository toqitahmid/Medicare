"use client";

import { createAppointment } from "@/app/lib/actions/appointment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Zoom } from "react-toastify";

const TOAST_OPTS = {
  position: "top-center",
  autoClose: 2500,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
  theme: "dark",
  transition: Zoom,
};

export default function AppointmentForm({
  appointments,
  patientPlan,
  patient,
  doctor,
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    symptoms: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isApproved = patient?.verificationStatus === "approved";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Guard clause: double-check eligibility before submitting
    if (!isApproved) return;

    // 1. Check Active Plan
    if (!patient?.plan || patient.plan === "N/A") {
      toast.error(
        "You need an active plan to book an appointment!",
        TOAST_OPTS,
      );
      setTimeout(() => router.push("/plans"), 2500);
      return;
    }

    // 2. Check Appointment Limit
    if (appointments?.length >= patientPlan?.appointments) {
      toast.error("You have reached your appointment limit!", TOAST_OPTS);
      setTimeout(() => router.push("/plans"), 2500);
      return;
    }

    setIsSubmitting(true);

    try {
      await createAppointment({
        doctorId: doctor._id,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        symptoms: formData.symptoms,
      });

      toast.success("Appointment booked successfully!", {
        ...TOAST_OPTS,
        autoClose: 2000,
      });
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error?.message || "Something went wrong. Please try again.",
        TOAST_OPTS,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to resolve dynamic button text
  const getButtonText = () => {
    if (isSubmitting) return "Confirming...";
    if (isApproved) return "Confirm Appointment";
    return "Not Eligible to Book";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Doctor Name</label>
          <input
            type="text"
            readOnly
            value={doctor?.name || ""}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-2.5 text-sm cursor-not-allowed text-slate-600 dark:text-slate-300 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Specialization
          </label>
          <input
            type="text"
            readOnly
            value={doctor?.specialization || ""}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-2.5 text-sm cursor-not-allowed text-slate-600 dark:text-slate-300 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Qualification
          </label>
          <input
            type="text"
            readOnly
            value={doctor?.qualifications || ""}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-2.5 text-sm cursor-not-allowed text-slate-600 dark:text-slate-300 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Appointment Date
          </label>
          <input
            type="date"
            required
            disabled={!isApproved}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100 dark:disabled:bg-slate-800"
            value={formData.appointmentDate}
            onChange={(e) =>
              setFormData({ ...formData, appointmentDate: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Appointment Time
          </label>
          <input
            type="time"
            required
            disabled={!isApproved}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100 dark:disabled:bg-slate-800"
            value={formData.appointmentTime}
            onChange={(e) =>
              setFormData({ ...formData, appointmentTime: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Symptoms / Reason for Visit
        </label>
        <textarea
          rows={4}
          required
          disabled={!isApproved}
          placeholder="Describe your symptoms or primary concern..."
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100 dark:disabled:bg-slate-800"
          value={formData.symptoms}
          onChange={(e) =>
            setFormData({ ...formData, symptoms: e.target.value })
          }
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isApproved}
        className={`w-full rounded-lg px-5 py-3 text-center text-sm font-medium text-white transition-colors focus:outline-none focus:ring-4 ${
          isApproved
            ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 dark:focus:ring-blue-800 disabled:opacity-50"
            : "bg-slate-400 dark:bg-slate-600 cursor-not-allowed"
        }`}
      >
        {getButtonText()}
      </button>
    </form>
  );
}
