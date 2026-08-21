"use client";

import { useState } from "react";

export default function AppointmentForm({ patient, doctor }) {
  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    symptoms: "",
    paymentStatus: "Pending",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      patientId: patient._id,
      doctorId: doctor._id,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      symptoms: formData.symptoms,
      paymentStatus: formData.paymentStatus,
      appointmentStatus: "Pending",
    };

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Appointment booked successfully!");
      } else {
        alert("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      {/* Payment Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Payment Method</label>
        <div className="grid grid-cols-2 gap-4">
          <label
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border p-4 text-center transition-all ${
              formData.paymentStatus === "Pending"
                ? "border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                : "border-slate-300 dark:border-slate-700"
            }`}
          >
            <input
              type="radio"
              name="paymentStatus"
              value="Pending"
              checked={formData.paymentStatus === "Pending"}
              onChange={() =>
                setFormData({ ...formData, paymentStatus: "Pending" })
              }
              className="sr-only"
            />
            <span className="text-sm font-semibold">Pay at Clinic</span>
            <span className="text-xs opacity-75">Status: Pending</span>
          </label>

          <label
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border p-4 text-center transition-all ${
              formData.paymentStatus === "Paid"
                ? "border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                : "border-slate-300 dark:border-slate-700"
            }`}
          >
            <input
              type="radio"
              name="paymentStatus"
              value="Paid"
              checked={formData.paymentStatus === "Paid"}
              onChange={() =>
                setFormData({ ...formData, paymentStatus: "Paid" })
              }
              className="sr-only"
            />
            <span className="text-sm font-semibold">Online Payment</span>
            <span className="text-xs opacity-75">
              Pay ${doctor.consultationFee} now
            </span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 disabled:opacity-50"
      >
        {isSubmitting
          ? "Confirming..."
          : `Confirm Appointment ($${doctor.consultationFee})`}
      </button>
    </form>
  );
}
