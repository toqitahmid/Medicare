"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Activity,
  User,
  Plus,
  Trash2,
  X,
  FileText,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PrescriptionManagement({ doctorAppointments = [] }) {
  // Filter only accepted appointments
  const acceptedAppointments = doctorAppointments.filter(
    (app) => app.appointmentStatus?.toLowerCase() === "accepted",
  );

  // Modal & Form States
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notes, setNotes] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", duration: "", instructions: "" },
  ]);

  const openPrescriptionModal = (appointment) => {
    setSelectedAppointment(appointment);
    setNotes("");
    setMedicines([{ name: "", dosage: "", duration: "", instructions: "" }]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  // Dynamic Medicine Input Handlers
  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const addMedicineRow = () => {
    setMedicines([
      ...medicines,
      { name: "", dosage: "", duration: "", instructions: "" },
    ]);
  };

  const removeMedicineRow = (index) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter((_, i) => i !== index));
    }
  };

  // POST Request Handler with React Toastify
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    // Construct Payload matching your required structure
    const payload = {
      doctorId: selectedAppointment.doctorId,
      doctorName: selectedAppointment.doctorName,
      patientId: selectedAppointment.patientId,
      appointmentId: selectedAppointment._id,
      notes,
      medicines: medicines.filter((m) => m.name.trim() !== ""),
    };

    try {
      setIsSubmitting(true);
    
      
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; 
      const response = await fetch(`${baseUrl}/api/prescriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit prescription");
      }

      const result = await response.json();
      console.log("Prescription Posted Successfully:", result);

      // Toast notification using your specified config
      toast.success("Prescription created successfully!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        transition: Zoom,
      });

      closeModal();
    } catch (error) {
      console.error("Error submitting prescription:", error);

      toast.error("Failed to submit prescription!", {
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
    <div className="w-full min-h-screen  text-slate-200 p-8 font-sans">
      <ToastContainer />

      {/* Header Breadcrumb & Title */}
      <div className="mb-6">
        <p className="text-[11px] text-cyan-400 font-semibold tracking-wide uppercase">
          DOCTOR DASHBOARD • PRESCRIPTION MANAGEMENT
        </p>
        <h1 className="text-2xl font-bold text-white mt-1">
          Accepted Appointments
        </h1>
      </div>

      {/* Accepted Appointments Grid */}
      {acceptedAppointments.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#080e1e] border border-slate-800/80 text-slate-400">
          No accepted appointments found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols- lg:grid-cols-3 gap-6">
          {acceptedAppointments.map((app) => (
            <div
              key={app._id}
              className="bg-[#070e20] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {app.patientName}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        ID: {app.patientId}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Accepted
                  </span>
                </div>

                {/* Info Bar */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/60 text-xs text-slate-300 my-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{app.appointmentDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{app.appointmentTime}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="truncate">{app.symptoms}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => openPrescriptionModal(app)}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition shadow-md"
                >
                  <FileText className="w-4 h-4" />
                  Write Prescription
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prescription Modal */}
      {isModalOpen && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#070e20] border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#040814]">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Create Prescription
                </h3>
                <p className="text-xs text-slate-400">
                  Patient:{" "}
                  <span className="text-cyan-400 font-semibold">
                    {selectedAppointment.patientName}
                  </span>
                </p>
              </div>
              <button
                onClick={closeModal}
                disabled={isSubmitting}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-6 overflow-y-auto flex-1"
            >
              {/* Medicines List Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-slate-200">
                    Medicines
                  </label>
                  <button
                    type="button"
                    onClick={addMedicineRow}
                    disabled={isSubmitting}
                    className="text-xs flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium disabled:opacity-50"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Medicine
                  </button>
                </div>

                <div className="space-y-3">
                  {medicines.map((med, index) => (
                    <div
                      key={index}
                      className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl grid grid-cols-12 gap-2 items-center"
                    >
                      <div className="col-span-4">
                        <input
                          type="text"
                          placeholder="Medicine Name"
                          value={med.name}
                          onChange={(e) =>
                            handleMedicineChange(index, "name", e.target.value)
                          }
                          disabled={isSubmitting}
                          className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:border-cyan-500 disabled:opacity-50"
                          required
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="text"
                          placeholder="Dosage (1-0-1)"
                          value={med.dosage}
                          onChange={(e) =>
                            handleMedicineChange(
                              index,
                              "dosage",
                              e.target.value,
                            )
                          }
                          disabled={isSubmitting}
                          className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:border-cyan-500 disabled:opacity-50"
                        />
                      </div>
                      <div className="col-span-4">
                        <input
                          type="text"
                          placeholder="Instructions / Duration"
                          value={med.instructions}
                          onChange={(e) =>
                            handleMedicineChange(
                              index,
                              "instructions",
                              e.target.value,
                            )
                          }
                          disabled={isSubmitting}
                          className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:border-cyan-500 disabled:opacity-50"
                        />
                      </div>
                      <div className="col-span-1 flex justify-center">
                        {medicines.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMedicineRow(index)}
                            disabled={isSubmitting}
                            className="text-rose-400 hover:text-rose-300 p-1 disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Doctor Notes
                </label>
                <textarea
                  rows="4"
                  placeholder="Enter notes, dietary recommendations, or follow-up instructions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full bg-slate-900/60 border border-slate-800 text-xs text-slate-200 p-3 rounded-xl focus:outline-none focus:border-cyan-500 disabled:opacity-50"
                ></textarea>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting && (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  )}
                  {isSubmitting ? "Submitting..." : "Submit Prescription"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
