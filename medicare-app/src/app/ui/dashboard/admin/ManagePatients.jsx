"use client";

import { useState } from "react";

const ManagePatients = ({ adminPatients = [] }) => {
  const [patients, setPatients] = useState(adminPatients);
  const [updatingId, setUpdatingId] = useState(null);

  // Update verification status via Express JS endpoint
  const handleStatusUpdate = async (patientId, newStatus) => {
    setUpdatingId(patientId);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
      const response = await fetch(
        `${baseUrl}/api/admin/patients/${patientId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ verificationStatus: newStatus }),
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        console.error("Update failed:", response.status, data);
        throw new Error(
          data?.message || `Request failed with ${response.status}`,
        );
      }

      setPatients((prev) =>
        prev.map((patient) =>
          patient._id === patientId
            ? { ...patient, verificationStatus: newStatus }
            : patient,
        ),
      );
    } catch (err) {
      console.error("Failed to update verification status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
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
      {/* Header */}
      

      {patients.length === 0 ? (
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-8 text-center text-slate-400">
          No patients found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
          {patients.map((patient) => (
            <div
              key={patient._id}
              className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between space-y-4"
            >
              {/* Header / Profile Info */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-700 bg-slate-800 flex-shrink-0">
                    <img
                      src={patient.photo}
                      alt={patient.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-white">
                      {patient.name}
                    </h3>
                    <p className="text-xs text-slate-400">{patient.phone}</p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full border capitalize font-medium ${getStatusBadgeClass(
                    patient.verificationStatus,
                  )}`}
                >
                  {patient.verificationStatus}
                </span>
              </div>

              {/* Patient Details */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-[#0b1120] p-3 rounded-lg border border-slate-800/60">
                <div>
                  <span className="text-slate-500 block">Gender</span>
                  <span className="font-medium text-slate-300 capitalize">
                    {patient.gender}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Plan</span>
                  <span className="font-medium text-indigo-400 uppercase">
                    {patient.plan}
                  </span>
                </div>
              </div>

              {/* Status Verification Controls */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <button
                  disabled={
                    updatingId === patient._id ||
                    patient.verificationStatus === "approved"
                  }
                  onClick={() => handleStatusUpdate(patient._id, "approved")}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white text-xs py-2 px-3 rounded-lg font-medium transition"
                >
                  Approve
                </button>
                <button
                  disabled={
                    updatingId === patient._id ||
                    patient.verificationStatus === "rejected"
                  }
                  onClick={() => handleStatusUpdate(patient._id, "rejected")}
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

export default ManagePatients;
