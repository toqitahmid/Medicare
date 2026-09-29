export const dynamic = "force-dynamic";
import React from "react";
import OverviewClient from "./OverviewClient";
import { getAdminOverview } from "@/app/lib/api/admin";

export default async function AdminOverviewDashboard() {
  const res = await getAdminOverview();
  
  let dashboardData = {
    totalPatients: "0",
    totalDoctors: "0",
    totalAppointments: "0",
    avgRating: "0.0",
    appointmentsChart: [],
    topDoctors: []
  };

  if (res?.success && res?.data) {
    const {
      totalPatients,
      totalDoctors,
      totalAppointments,
      avgDoctorRating,
      appointmentsOverTime,
      topRatedDoctors
    } = res.data;

    dashboardData = {
      totalPatients: totalPatients?.toLocaleString() || "0",
      totalDoctors: totalDoctors?.toLocaleString() || "0",
      totalAppointments: totalAppointments?.toLocaleString() || "0",
      avgRating: avgDoctorRating?.toString() || "0.0",
      appointmentsChart: (appointmentsOverTime || []).map(item => ({
        name: item.month,
        appointments: item.count
      })),
      topDoctors: (topRatedDoctors || []).map(doc => {
        const doctorName = doc.name || "Unknown Doctor";
        return {
          name: doctorName.includes("Dr.") ? doctorName : `Dr. ${doctorName}`,
          rating: doc.averageRating || 0
        };
      })
    };
  }

  return (
    <div>
      {res?.success === false && (
        <div className="p-4 bg-red-500 text-white rounded mb-4">
          Error fetching data: {res?.message || "Unknown error"}
        </div>
      )}
      <OverviewClient data={dashboardData} />
    </div>
  );
}