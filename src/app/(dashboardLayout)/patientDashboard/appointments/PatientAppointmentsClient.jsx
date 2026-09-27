"use client";
import React from "react";
import { Chip, Button } from "@heroui/react";
import { Calendar, Clock, Activity, FileText, CheckCircle2, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export default function PatientAppointmentsClient({ appointments }) {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="bg-default-100 p-8 rounded-full mb-6">
          <Calendar className="w-16 h-16 text-default-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Appointments Found</h2>
        <p className="text-default-500 text-center max-w-md">
          You haven't booked any appointments yet. Head over to the Doctors Directory to find a specialist and book your first consultation!
        </p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
      case "rejected":
        return "danger";
      default:
        return "default";
    }
  };

  const getPaymentColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "success";
      case "unpaid":
      case "pending":
        return "warning";
      case "failed":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          My Appointments
        </h1>
        <p className="text-default-500 text-lg">Track and manage your medical consultations.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full overflow-hidden rounded-[2rem] border border-default-200 bg-background/60 backdrop-blur-xl shadow-xl shadow-default-200/50"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-default-100/80 text-default-600 border-b border-default-200 text-sm uppercase tracking-wider">
                <th className="px-6 py-5 font-bold rounded-tl-[2rem]">Doctor</th>
                <th className="px-6 py-5 font-bold">Schedule</th>
                <th className="px-6 py-5 font-bold">Status</th>
                <th className="px-6 py-5 font-bold">Fee</th>
                <th className="px-6 py-5 font-bold">Payment</th>
                <th className="px-6 py-5 font-bold">Symptoms</th>
                <th className="px-6 py-5 font-bold rounded-tr-[2rem]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-default-100">
              {appointments.map((apt, index) => (
                <motion.tr 
                  key={apt._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group hover:bg-default-50/50 transition-colors duration-200"
                >
                  {/* Doctor Column */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {apt.doctorName ? apt.doctorName.charAt(0).toUpperCase() : (apt.doctorId ? apt.doctorId.charAt(0).toUpperCase() : "D")}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm max-w-[150px] truncate">
                          {apt.doctorName || apt.doctorId}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Schedule Column */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Calendar className="w-4 h-4 text-primary" />
                        {apt.appointmentDate}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-default-500">
                        <Clock className="w-3.5 h-3.5" />
                        {apt.appointmentTime}
                      </div>
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-5">
                    <Chip
                      color={getStatusColor(apt.appointmentStatus)}
                      variant="flat"
                      size="sm"
                      className="font-bold uppercase tracking-wider text-[10px] shadow-sm"
                    >
                      <div className="flex items-center">
                        {apt.appointmentStatus === "Approved" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {apt.appointmentStatus || "Pending"}
                      </div>
                    </Chip>
                  </td>

                  {/* Fee Column */}
                  <td className="px-6 py-5">
                    <p className="font-bold text-foreground">${apt.fee || "0"}</p>
                  </td>

                  {/* Payment Column */}
                  <td className="px-6 py-5">
                    <Chip
                      color={getPaymentColor(apt.paymentStatus)}
                      variant="dot"
                      size="sm"
                      className="font-medium capitalize text-xs border-none bg-default-100/50"
                    >
                      {apt.paymentStatus || "Unpaid"}
                    </Chip>
                  </td>

                  {/* Symptoms Column */}
                  <td className="px-6 py-5">
                    <div className="flex items-start gap-2 max-w-[200px]">
                      <FileText className="w-4 h-4 text-default-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-default-600 line-clamp-2 italic">
                        {apt.symptoms || "No symptoms provided"}
                      </p>
                    </div>
                  </td>

                  {/* Action Column */}
                  <td className="px-6 py-5">
                    <Button 
                      color="primary" 
                      variant={apt.paymentStatus === "Paid" ? "flat" : "solid"}
                      isDisabled={apt.paymentStatus === "Paid"}
                      size="sm"
                      className="font-bold shadow-md w-full"
                      startContent={<CreditCard className="w-4 h-4" />}
                    >
                      {apt.paymentStatus === "Paid" ? "Paid" : "Pay Now"}
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
