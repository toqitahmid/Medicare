import React, { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiActivity,
  FiCheck,
  FiX,
  FiCheckCircle,
  FiXCircle,
  FiLoader,
} from "react-icons/fi";

export default function AppointmentRequests({ doctorAppointments = [] }) {
  // Use prop directly as the initial state
  const [appointments, setAppointments] = useState(doctorAppointments);
  const [loadingId, setLoadingId] = useState(null);

  const handleStatusChange = async (id, newStatus) => {
    setLoadingId(id);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; 
    try {
      const response = await fetch(
        `${baseUrl}/api/appointments/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ appointmentStatus: newStatus }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setAppointments((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, appointmentStatus: newStatus } : app,
          ),
        );
      } else {
        alert(data.message || "Failed to update appointment in database.");
      }
    } catch (error) {
      console.error("Database update error:", error);
      alert("Network error: Could not reach the server.");
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Accepted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <FiCheckCircle className="w-3.5 h-3.5" /> Accepted
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <FiXCircle className="w-3.5 h-3.5" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen text-slate-100 p-8 font-sans">
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
          Doctor Dashboard • Appointment Requests
        </p>
        <h1 className="text-2xl font-bold text-white mt-1">
          Manage Appointments
        </h1>
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-3">
        {appointments.length === 0 ? (
          <div className="bg-[#0f172a] border border-slate-800/80 rounded-xl p-12 text-center text-slate-400">
            No appointment requests found.
          </div>
        ) : (
          appointments.map((item) => (
            <div
              key={item._id}
              className="bg-[#0f172a] border border-slate-800/80 rounded-xl p-6 shadow-xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between sm:justify-start sm:gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
                        <FiUser className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {item.patientName}
                        </h3>
                        <p className="text-xs text-slate-400">
                          ID: {item.patientId}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(item.appointmentStatus)}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-slate-300 pt-2">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-cyan-400 flex-shrink-0" />
                      <span>{item.appointmentDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FiClock className="text-cyan-400 flex-shrink-0" />
                      <span>{item.appointmentTime}</span>
                    </div>

                    <div className="flex items-center gap-2 sm:col-span-2 md:col-span-1">
                      <FiActivity className="text-cyan-400 flex-shrink-0" />
                      <span className="truncate" title={item.symptoms}>
                        {item.symptoms}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                  {loadingId === item._id ? (
                    <div className="flex items-center gap-2 text-slate-400 text-sm px-4 py-2">
                      <FiLoader className="animate-spin w-5 h-5 text-cyan-400" />{" "}
                      Updating Database...
                    </div>
                  ) : item.appointmentStatus === "Pending" ? (
                    <>
                      <button
                        onClick={() => handleStatusChange(item._id, "Accepted")}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors"
                      >
                        <FiCheck className="w-4 h-4" /> Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(item._id, "Rejected")}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30 font-medium text-sm transition-colors"
                      >
                        <FiX className="w-4 h-4" /> Reject
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(item._id, "Pending")}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                    >
                      Reset Status
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
