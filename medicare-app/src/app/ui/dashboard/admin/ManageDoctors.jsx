"use client";

import { authHeader } from "@/app/lib/core/token";
import { useState } from "react";

const ManageDoctors = ({ adminDoctors = [] }) => {
  const [doctors, setDoctors] = useState(adminDoctors);
  const [updatingId, setUpdatingId] = useState(null);

  // Update verification status via Express JS endpoint
  const handleStatusUpdate = async (doctorId, newStatus) => {
    setUpdatingId(doctorId);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
      const response = await fetch(`${baseUrl}/api/admin/doctors/${doctorId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(await authHeader()),
        },
        body: JSON.stringify({ verificationStatus: newStatus }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        console.error("Update failed:", response.status, data);
        throw new Error(
          data?.message || `Request failed with ${response.status}`,
        );
      }

      setDoctors((prev) =>
        prev.map((doctor) =>
          doctor._id === doctorId
            ? { ...doctor, verificationStatus: newStatus }
            : doctor,
        ),
      );
    } catch (err) {
      console.error("Failed to update verification status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "verified":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "rejected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
  };

  return (
    <div className="p-8 text-slate-100 min-h-screen">
      {doctors.length === 0 ? (
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-8 text-center text-slate-400">
          No doctors found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between space-y-4"
            >
              {/* Header / Profile Info */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-700 bg-slate-800 flex-shrink-0">
                    <img
                      src={doctor.profileImage}
                      alt={doctor.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-white">
                      {doctor.name}
                    </h3>
                    <p className="text-xs text-indigo-400 font-medium">
                      {doctor.specialization}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full border capitalize font-medium ${getStatusBadgeClass(
                    doctor.verificationStatus,
                  )}`}
                >
                  {doctor.verificationStatus}
                </span>
              </div>

              {/* Doctor Details Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-[#0b1120] p-3 rounded-lg border border-slate-800/60">
                <div>
                  <span className="text-slate-500 block">Qualifications</span>
                  <span className="font-medium text-slate-300">
                    {doctor.qualifications}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Hospital</span>
                  <span className="font-medium text-slate-300">
                    {doctor.hospitalName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Experience</span>
                  <span className="font-medium text-slate-300">
                    {doctor.experience} Yrs
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Fee</span>
                  <span className="font-medium text-emerald-400">
                    ${doctor.consultationFee}
                  </span>
                </div>
                <div className="col-span-2 pt-1 border-t border-slate-800/40">
                  <span className="text-slate-500 block">Availability</span>
                  <span className="font-medium text-slate-400">
                    {doctor.availableDays} ({doctor.availableSlots})
                  </span>
                </div>
              </div>

              {/* Status Controls */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <button
                  disabled={
                    updatingId === doctor._id ||
                    doctor.verificationStatus?.toLowerCase() === "approved"
                  }
                  onClick={() => handleStatusUpdate(doctor._id, "approved")}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white text-xs py-2 px-3 rounded-lg font-medium transition"
                >
                  Approve
                </button>
                <button
                  disabled={
                    updatingId === doctor._id ||
                    doctor.verificationStatus?.toLowerCase() === "rejected"
                  }
                  onClick={() => handleStatusUpdate(doctor._id, "rejected")}
                  className="flex-1 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:hover:bg-rose-600 text-white text-xs py-2 px-3 rounded-lg font-medium transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;
