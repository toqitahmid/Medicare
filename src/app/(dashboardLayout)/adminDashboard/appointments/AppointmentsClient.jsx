"use client";
import React from "react";
import { Card, Chip, Avatar } from "@heroui/react";
import { motion } from "framer-motion";
import { Calendar, Clock, Activity, Users } from "lucide-react";

export default function AppointmentsClient({ appointments = [] }) {
    const totalAppointments = appointments.length;
    const completed = appointments.filter(a => a.appointmentStatus === "Completed" || a.appointmentStatus === "completed").length;
    const pending = appointments.filter(a => a.appointmentStatus === "Pending" || a.appointmentStatus === "pending").length;

    return (
        <div className="w-full min-h-screen text-foreground bg-background font-sans p-6 md:p-10 space-y-8">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    System Appointments
                </h1>
                <p className="text-default-500">Monitor and manage all patient-doctor appointments.</p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card className="p-6 border border-default-100 bg-background/60 backdrop-blur-xl shadow-medium rounded-[2rem] flex flex-row items-center gap-4">
                        <div className="p-4 rounded-[1.25rem] bg-blue-500/10 text-blue-500">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-default-500 text-sm font-medium">Total Appointments</p>
                            <h3 className="text-2xl font-bold text-foreground mt-1">{totalAppointments}</h3>
                        </div>
                    </Card>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Card className="p-6 border border-default-100 bg-background/60 backdrop-blur-xl shadow-medium rounded-[2rem] flex flex-row items-center gap-4">
                        <div className="p-4 rounded-[1.25rem] bg-emerald-500/10 text-emerald-500">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-default-500 text-sm font-medium">Completed</p>
                            <h3 className="text-2xl font-bold text-foreground mt-1">{completed}</h3>
                        </div>
                    </Card>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Card className="p-6 border border-default-100 bg-background/60 backdrop-blur-xl shadow-medium rounded-[2rem] flex flex-row items-center gap-4">
                        <div className="p-4 rounded-[1.25rem] bg-warning/10 text-warning">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-default-500 text-sm font-medium">Pending</p>
                            <h3 className="text-2xl font-bold text-foreground mt-1">{pending}</h3>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Data Table Area */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="p-8 border border-default-100 bg-background/60 backdrop-blur-xl shadow-medium rounded-[2rem]">
                    <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-foreground">All Appointments</h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-default-200">
                                    <th className="pb-4 pt-2 px-4 font-semibold text-default-500 text-sm">Patient</th>
                                    <th className="pb-4 pt-2 px-4 font-semibold text-default-500 text-sm">Doctor</th>
                                    <th className="pb-4 pt-2 px-4 font-semibold text-default-500 text-sm">Date & Time</th>
                                    <th className="pb-4 pt-2 px-4 font-semibold text-default-500 text-sm">Status</th>
                                    <th className="pb-4 pt-2 px-4 font-semibold text-default-500 text-sm">Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.length > 0 ? appointments.map((app, idx) => (
                                    <tr key={app._id || idx} className="border-b border-default-100 hover:bg-default-50/50 transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar src={`https://i.pravatar.cc/150?u=${app.patientId || idx}`} size="sm" />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold">{app.patientName || "Patient"}</span>
                                                    <span className="text-xs text-default-400">{app.patientId || "N/A"}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar src={`https://i.pravatar.cc/150?u=${app.doctorId || idx}`} size="sm" />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold">Dr. {app.doctorName || "Doctor"}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm font-medium">{app.appointmentDate}</span>
                                                <span className="text-xs text-default-500 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {app.appointmentTime}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <Chip size="sm" color={
                                                app.appointmentStatus === "Completed" || app.appointmentStatus === "completed" ? "success" :
                                                app.appointmentStatus === "Cancelled" || app.appointmentStatus === "cancelled" ? "danger" : "warning"
                                            } variant="flat" className="capitalize font-medium">
                                                {app.appointmentStatus || "Pending"}
                                            </Chip>
                                        </td>
                                        <td className="py-4 px-4">
                                            <Chip size="sm" color={app.paymentStatus === "Paid" || app.paymentStatus === "paid" ? "success" : "default"} variant="dot" className="capitalize border-none">
                                                {app.paymentStatus || "Unpaid"}
                                            </Chip>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="py-8 text-center text-default-500">
                                            No appointments found in the system.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
