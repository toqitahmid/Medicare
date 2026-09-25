import React from "react";
import OverviewClient from "./OverviewClient";

export default function AdminOverviewDashboard() {
  // Mock dashboard data that would typically be fetched server-side from a database
  const dashboardData = {
    totalPatients: "14,250",
    totalDoctors: "128",
    totalAppointments: "4,320",
    avgRating: "4.8",
    appointmentsChart: [
      { name: "Jan", appointments: 300 },
      { name: "Feb", appointments: 450 },
      { name: "Mar", appointments: 400 },
      { name: "Apr", appointments: 600 },
      { name: "May", appointments: 550 },
      { name: "Jun", appointments: 800 },
      { name: "Jul", appointments: 750 },
      { name: "Aug", appointments: 900 },
      { name: "Sep", appointments: 850 },
      { name: "Oct", appointments: 1100 },
      { name: "Nov", appointments: 1050 },
      { name: "Dec", appointments: 1250 },
    ],
    topDoctors: [
      { name: "Dr. Mark Wilson", rating: 4.9 },
      { name: "Dr. Emily Chen", rating: 4.8 },
      { name: "Dr. Sarah Jenkins", rating: 4.8 },
      { name: "Dr. Michael Chang", rating: 4.7 },
    ]
  };

  return <OverviewClient data={dashboardData} />;
}