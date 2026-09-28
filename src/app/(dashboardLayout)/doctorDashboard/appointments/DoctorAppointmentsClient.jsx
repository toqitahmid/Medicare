"use client";
import React, { useState } from "react";
import { Chip, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Calendar, Clock, Activity, CheckCircle2, User, MoreVertical, XCircle, Check, Loader2, FileSignature } from "lucide-react";
import { motion } from "framer-motion";
import { updateAppointmentStatus } from "@/app/lib/actions/appointment.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function DoctorAppointmentsClient({ appointments }) {
  const [loadingId, setLoadingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  


  const router = useRouter();

  if (!appointments || appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="bg-default-100 p-8 rounded-full mb-6">
          <Calendar className="w-16 h-16 text-default-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Appointments Found</h2>
        <p className="text-default-500 text-center max-w-md">
          You don't have any appointments booked yet. Patient requests will appear here once scheduled.
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

  const handleUpdateStatus = async (appointmentId, newStatus) => {
    setLoadingId(appointmentId);
    try {
      const res = await updateAppointmentStatus(appointmentId, newStatus);
      if (res.success) {
        toast.success(`Appointment marked as ${newStatus}`);
        router.refresh(); 
      } else {
        toast.error(res.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoadingId(null);
    }
  };



  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          My Appointments
        </h1>
        <p className="text-default-500 text-lg">Manage your schedule and view upcoming patient consultations.</p>
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
                <th className="px-6 py-5 font-bold rounded-tl-[2rem]">Patient</th>
                <th className="px-6 py-5 font-bold">Schedule</th>
                <th className="px-6 py-5 font-bold">Symptoms/Notes</th>
                <th className="px-6 py-5 font-bold">Appt Status</th>
                <th className="px-6 py-5 font-bold">Payment</th>
                <th className="px-6 py-5 font-bold rounded-tr-[2rem] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-default-100">
              {appointments.map((appointment, index) => (
                <motion.tr 
                  key={appointment._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group hover:bg-default-50/50 transition-colors duration-200"
                >
                  {/* Patient Column */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold shrink-0">
                        {appointment.patientName ? appointment.patientName.charAt(0).toUpperCase() : (appointment.patientId ? appointment.patientId.charAt(0).toUpperCase() : <User className="w-5 h-5"/>)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm truncate max-w-[150px]">
                          {appointment.patientName || appointment.patientId}
                        </p>
                        <p className="text-xs text-default-400 truncate max-w-[150px]">{appointment.patientEmail}</p>
                      </div>
                    </div>
                  </td>

                  {/* Schedule Column */}
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        {appointment.appointmentDate}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-default-500">
                        <Clock className="w-3.5 h-3.5" />
                        {appointment.appointmentTime}
                      </div>
                    </div>
                  </td>

                  {/* Symptoms Column */}
                  <td className="px-6 py-5">
                    <div className="flex items-start gap-2">
                      <Activity className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground line-clamp-2 max-w-[200px]" title={appointment.symptoms}>
                          {appointment.symptoms || "No symptoms listed"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-5">
                    <Chip
                      color={getStatusColor(appointment.appointmentStatus)}
                      variant="flat"
                      size="sm"
                      className="font-bold uppercase tracking-wider text-[10px] shadow-sm"
                    >
                      <div className="flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {appointment.appointmentStatus || "Pending"}
                      </div>
                    </Chip>
                  </td>

                  {/* Payment Column */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-2">
                        <Chip
                        color={getPaymentColor(appointment.paymentStatus)}
                        variant="dot"
                        size="sm"
                        className="font-bold border-none bg-default-100"
                        >
                        {appointment.paymentStatus || "Unpaid"}
                        </Chip>
                        <div className="flex items-center gap-1 font-bold text-success text-sm">
                            <span className="text-default-400 text-xs font-normal mr-1">Fee:</span>
                            ${appointment.fee || 50}
                        </div>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-5 text-right">
                    {loadingId === appointment._id ? (
                      <Button isIconOnly variant="light" size="sm" isLoading className="opacity-50">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </Button>
                    ) : (
                      <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                          <div role="button" tabIndex={0} className="p-2 text-default-500 hover:text-foreground hover:bg-default-100 rounded-lg outline-none flex items-center justify-center cursor-pointer transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </div>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Appointment Actions" variant="flat">
                          <DropdownItem 
                            key="approve" 
                            startContent={<Check className="w-4 h-4 text-success" />}
                            color="success"
                            onClick={() => handleUpdateStatus(appointment._id, "Approved")}
                            className={appointment.appointmentStatus === "Approved" || appointment.appointmentStatus === "Completed" ? "hidden" : ""}
                          >
                            Approve
                          </DropdownItem>
                          <DropdownItem 
                            key="prescribe" 
                            startContent={<FileSignature className="w-4 h-4 text-secondary" />}
                            color="secondary"
                            href="/doctorDashboard/prescriptions"
                            className={appointment.appointmentStatus !== "Approved" && appointment.appointmentStatus !== "Completed" ? "hidden" : ""}
                          >
                            Write Prescription
                          </DropdownItem>
                          <DropdownItem 
                            key="complete" 
                            startContent={<CheckCircle2 className="w-4 h-4 text-primary" />}
                            color="primary"
                            onClick={() => handleUpdateStatus(appointment._id, "Completed")}
                            className={appointment.appointmentStatus === "Completed" ? "hidden" : ""}
                          >
                            Mark as Completed
                          </DropdownItem>
                          <DropdownItem 
                            key="reject" 
                            startContent={<XCircle className="w-4 h-4 text-danger" />}
                            color="danger"
                            className="text-danger"
                            onClick={() => handleUpdateStatus(appointment._id, "Rejected")}
                          >
                            Reject / Cancel
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    )}
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
