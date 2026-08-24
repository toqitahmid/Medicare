"use client";

import { createAppointment } from "@/app/lib/actions/appointment";
import { getAppointmentById } from "@/app/lib/api/appoinments";
import { getPlanById } from "@/app/lib/api/plans";
import { useState } from "react";
import { toast, Zoom } from "react-toastify";

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

    // const appointments = await getAppointmentById(patient?.id)
    // const plan = await getPlanById(patient?.plan || 'N/A')
    // console.log(appointments);
    // console.log(plan);

    const payload = {
      patientId: patient._id,
      doctorId: doctor._id,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      symptoms: formData.symptoms,
      appointmentStatus: "Pending",
    };

    try {
      if(patient.plan === "N/A"){
        toast.success("You have to buy a plan!", {
                  position: "top-center",
                  autoClose: 2500,
                  hideProgressBar: true,
                  closeOnClick: false,
                  pauseOnHover: false,
                  draggable: true,
                  theme: "dark",
                  transition: Zoom,
                });
          return;
      }
     await createAppointment(payload);
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 disabled:opacity-50"
      >
        {isSubmitting
          ? "Confirming..."
          : `Confirm Appointment`}
      </button>
    </form>
  );
}
