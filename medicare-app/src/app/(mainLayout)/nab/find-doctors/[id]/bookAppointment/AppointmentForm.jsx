"use client";

import { createAppointment } from "@/app/lib/actions/appointment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Zoom } from "react-toastify";

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
    paymentStatus: "Pending",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      patientId: patient._id,
      patientName: patient?.name,
      doctorId: doctor._id,
      doctorName: doctor?.name,
      doctorSpecialization: doctor?.specialization,
      doctorQualifications: doctor?.qualifications,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      symptoms: formData.symptoms,
      appointmentStatus: "Pending",
    };

    if (patient.plan === "N/A") {
      toast.error("You have to buy a plan!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        transition: Zoom,
      });
      setTimeout(() => {
        router.push("/plans");
      }, 2500);
      return;
    }

    if (appointments.length >= patientPlan.appointments) {
      toast.error("You reached your limit!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        transition: Zoom,
      });
      setTimeout(() => {
        router.push("/plans");
      }, 2500);
      return;
    }

    setIsSubmitting(true);

    try {
      await createAppointment(payload);
      toast.success("Appointment booked successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        transition: Zoom,
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        transition: Zoom,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Pre-filled Doctor Information */}
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

      {/* Date & Time Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Appointment Date
          </label>
          <input
            type="date"
            required
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.appointmentTime}
            onChange={(e) =>
              setFormData({ ...formData, appointmentTime: e.target.value })
            }
          />
        </div>
      </div>

      {/* Symptoms Field */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Symptoms / Reason for Visit
        </label>
        <textarea
          rows={4}
          required
          placeholder="Describe your symptoms or primary concern..."
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={formData.symptoms}
          onChange={(e) =>
            setFormData({ ...formData, symptoms: e.target.value })
          }
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 disabled:opacity-50"
      >
        {isSubmitting ? "Confirming..." : "Confirm Appointment"}
      </button>
    </form>
  );
}
