import React from "react";

export default function AppointmentRecordsTable({
  adminAppointments = [],
  onViewDetails,
}) {
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "approved":
      case "confirmed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "cancelled":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="bg-[#0b1128] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl text-slate-200 font-sans">
      {/* Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">
            Appointment Records
          </h3>
          <p className="text-xs text-slate-400">
            Total {adminAppointments.length} appointments scheduled
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#121936] text-slate-400 uppercase text-[10px] tracking-wider font-semibold border-b border-slate-800">
            <tr>
              <th className="py-3.5 px-6">Patient</th>
              <th className="py-3.5 px-6">Doctor</th>
              <th className="py-3.5 px-6">Date & Time</th>
              <th className="py-3.5 px-6">Symptoms</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {adminAppointments.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="py-12 text-center text-slate-500 text-xs"
                >
                  No appointments found.
                </td>
              </tr>
            ) : (
              adminAppointments.map((data) => (
                <tr
                  key={data._id}
                  className="hover:bg-slate-800/20 transition-colors"
                >
                  {/* Patient Details */}
                  <td className="py-4 px-6">
                    <div className="font-semibold text-white text-sm">
                      {data.patientName}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      ID:{" "}
                      {data.patientId
                        ? `${data.patientId.slice(0, 8)}...`
                        : "N/A"}
                    </div>
                  </td>

                  {/* Doctor Details */}
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-200">
                      {data.doctorName?.startsWith("Dr.")
                        ? data.doctorName
                        : `Dr. ${data.doctorName}`}
                    </div>
                    <div className="text-[11px] text-blue-400">
                      {data.doctorSpecialization}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {data.doctorQualifications}
                    </div>
                  </td>

                  {/* Date & Time */}
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-200">
                      {data.appointmentDate}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {data.appointmentTime}
                    </div>
                  </td>

                  {/* Symptoms */}
                  <td className="py-4 px-6 max-w-xs">
                    <div
                      className="truncate text-slate-300"
                      title={data.symptoms}
                    >
                      {data.symptoms}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${getStatusBadge(data.appointmentStatus)}`}
                    >
                      {data.appointmentStatus}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => onViewDetails && onViewDetails(data)}
                      className="px-3 py-1.5 bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/20 rounded-lg text-xs font-medium transition-all"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
