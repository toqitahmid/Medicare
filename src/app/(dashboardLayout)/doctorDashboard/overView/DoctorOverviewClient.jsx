"use client";

import React from "react";
import { Card, Avatar, Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { Users, DollarSign, CalendarCheck, TrendingUp, ChevronRight, Video } from "lucide-react";

export default function DoctorOverviewClient({ userName, status, overviewData }) {
  const upcomingAppointments = overviewData?.appointments?.filter(a => a.appointmentStatus !== "Cancelled" && a.appointmentStatus !== "Completed" && a.appointmentStatus !== "cancelled" && a.appointmentStatus !== "completed") || [];
  
  const stats = [
    { label: "Total Patients", value: overviewData?.totalPatients?.toString() || "0", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", trend: "Active" },
    { label: "Upcoming Appointments", value: upcomingAppointments.length.toString(), icon: CalendarCheck, color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "Booked" },
    { label: "Revenue (Month)", value: `$${overviewData?.revenueMonth || 0}`, icon: DollarSign, color: "text-purple-500", bg: "bg-purple-500/10", trend: "This Month" },
  ];

  return (
    <div className="w-full space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome back, <span className="text-primary">Dr. {userName.split(' ')[0]}</span>! 👋
            </h1>
            <Chip size="sm" color="success" variant="flat" className="font-semibold uppercase tracking-wider text-[10px]">
              {status}
            </Chip>
          </div>
          <p className="text-default-500 mt-1">Here is your daily summary.</p>
        </div>
        <Button color="primary" className="rounded-xl shadow-lg shadow-primary/30 font-semibold" startContent={<Video className="w-4 h-4" />}>
          Start Telehealth
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }}>
            <Card className="p-6 border border-default-100/50 bg-background/60 backdrop-blur-xl shadow-medium hover:shadow-large transition-all duration-300 rounded-[2rem]">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-[1.25rem] ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-default-500 text-sm font-medium">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-foreground mt-1">{stat.value}</h3>
                  </div>
                </div>
                <Chip size="sm" variant="flat" color="success" className="font-medium">{stat.trend}</Chip>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="p-8 border border-default-100/50 bg-background/60 backdrop-blur-xl shadow-medium rounded-[2.5rem] h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-foreground pl-2">Today's Schedule</h2>
              <Button variant="light" color="primary" endContent={<ChevronRight className="w-4 h-4" />}>
                View Calendar
              </Button>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.length > 0 ? upcomingAppointments.slice(0, 3).map((app, i) => (
                <div key={app._id || i} className="flex items-center justify-between p-4 rounded-3xl border border-default-100 bg-default-50/50 hover:bg-default-100/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar src={`https://i.pravatar.cc/150?u=${app.patientId || i}`} />
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{app.patientName || "Patient"}</h4>
                      <p className="text-xs text-default-500">{app.symptoms || "Routine Checkup"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{app.appointmentTime || "10:30 AM"}</p>
                    <p className="text-xs text-primary font-medium">{app.appointmentDate}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-4 text-default-500 text-sm">
                  No upcoming appointments in schedule.
                </div>
              )}
            </div>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="p-8 border border-default-100/50 bg-background/60 backdrop-blur-xl shadow-medium rounded-[2.5rem] h-full flex flex-col justify-center items-center text-center">
             <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
               <TrendingUp className="w-10 h-10 text-primary" />
             </div>
             <h3 className="text-2xl font-bold text-foreground mb-2">Patient Rating: {overviewData?.averageRating ? overviewData.averageRating.toFixed(1) : "N/A"} ⭐</h3>
             <p className="text-default-500 max-w-sm mb-6">This is your overall patient satisfaction score based on {overviewData?.reviews?.length || 0} reviews. Keep up the great work!</p>
             <Button color="secondary" variant="flat" className="rounded-xl font-medium">View Analytics Report</Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
