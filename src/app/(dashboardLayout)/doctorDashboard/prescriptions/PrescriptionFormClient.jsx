"use client";
import React, { useState } from "react";
import { Button, Input, TextArea, Select, SelectItem, Card, CardBody, CardHeader, Avatar, Chip } from "@heroui/react";
import { FileSignature, User, Calendar, Activity, CheckCircle2, ChevronRight, Stethoscope, Pill, ClipboardList, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPrescription } from "@/app/lib/actions/prescription.actions";
import { updateAppointmentStatus } from "@/app/lib/actions/appointment.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function PrescriptionFormClient({ appointments }) {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [prescriptionData, setPrescriptionData] = useState({ diagnosis: "", medications: "", notes: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Filter out appointments that already have completed status or maybe just show all for now?
  // Let's only show Approved or Pending appointments to write prescriptions for, or all if we want to allow updating.
  // Actually, let's just show all, but we can group or sort them.
  const activeAppointments = appointments?.filter(a => a.appointmentStatus !== "Rejected" && a.appointmentStatus !== "Cancelled") || [];

  const handleSubmitPrescription = async (e) => {
    e.preventDefault();
    if (!selectedAppointment) {
      toast.error("Please select a patient appointment first");
      return;
    }
    if (!prescriptionData.diagnosis || !prescriptionData.medications) {
      toast.error("Please fill in the required fields (Diagnosis and Medications)");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        doctorId: selectedAppointment.doctorId,
        patientId: selectedAppointment.patientId,
        doctorName: selectedAppointment.doctorName || "Doctor",
        patientName: selectedAppointment.patientName || selectedAppointment.patientId,
        appointmentId: selectedAppointment._id,
        diagnosis: prescriptionData.diagnosis,
        medications: prescriptionData.medications,
        notes: prescriptionData.notes
      };

      const res = await createPrescription(payload);
      if (res.success) {
        toast.success("Prescription successfully created and sent to the patient!");
        if (selectedAppointment.appointmentStatus !== "Completed") {
            await updateAppointmentStatus(selectedAppointment._id, "Completed");
        }
        setPrescriptionData({ diagnosis: "", medications: "", notes: "" });
        setSelectedAppointment(null);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to submit prescription");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary flex items-center gap-3">
          <FileSignature className="w-10 h-10 text-primary" />
          Write Prescription
        </h1>
        <p className="text-default-500 text-lg">Select a patient and compose a detailed medical prescription.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left sidebar - Patient Selection */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-4 flex flex-col h-[700px]"
        >
          <div className="bg-background/60 backdrop-blur-xl border border-default-200 rounded-[2rem] shadow-xl shadow-default-200/50 flex-1 overflow-hidden flex flex-col">
            <div className="p-6 bg-default-50/50 border-b border-default-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Select Patient</h2>
              <Chip color="primary" variant="flat" size="sm" className="font-semibold">{activeAppointments.length} Appts</Chip>
            </div>
            
            <div className="overflow-y-auto flex-1 p-4 space-y-3 custom-scrollbar">
              {activeAppointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-default-400 p-6 text-center">
                  <User className="w-12 h-12 mb-3 opacity-50" />
                  <p>No active appointments found to prescribe for.</p>
                </div>
              ) : (
                activeAppointments.map((appt, idx) => (
                  <motion.div
                    key={appt._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedAppointment(appt)}
                    className={`p-4 rounded-2xl cursor-pointer border-2 transition-all duration-300 flex items-center justify-between group ${
                      selectedAppointment?._id === appt._id 
                        ? "bg-primary/10 border-primary shadow-md shadow-primary/20" 
                        : "bg-default-50/50 border-transparent hover:bg-default-100 hover:border-default-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <Avatar 
                        name={appt.patientName ? appt.patientName.charAt(0) : <User className="w-4 h-4"/>} 
                        className={`shrink-0 ${selectedAppointment?._id === appt._id ? "bg-primary text-white" : "bg-secondary/20 text-secondary"}`}
                      />
                      <div className="overflow-hidden">
                        <p className="font-semibold text-foreground truncate text-sm">
                          {appt.patientName || appt.patientId}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-default-500 mt-1">
                          <Calendar className="w-3 h-3" />
                          <span className="truncate">{appt.appointmentDate} - {appt.appointmentTime}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 shrink-0 transition-transform ${selectedAppointment?._id === appt._id ? "text-primary translate-x-1" : "text-default-300 group-hover:translate-x-1 group-hover:text-default-500"}`} />
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>

        {/* Right side - Prescription Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-8"
        >
          <AnimatePresence mode="wait">
            {!selectedAppointment ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[700px] flex flex-col items-center justify-center bg-background/40 backdrop-blur-md border border-default-200 border-dashed rounded-[2rem]"
              >
                <div className="bg-default-100 p-8 rounded-full mb-6">
                  <FileSignature className="w-16 h-16 text-default-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Ready to Prescribe</h3>
                <p className="text-default-500 text-center max-w-sm">
                  Select a patient from the list on the left to start writing their medical prescription.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-background/80 backdrop-blur-xl border border-default-200 rounded-[2rem] shadow-2xl shadow-primary/5 overflow-hidden"
              >
                {/* Prescription Header */}
                <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 p-8 border-b border-default-200/50">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        Patient Prescription
                      </h2>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5 text-sm text-default-600 font-medium">
                          <User className="w-4 h-4 text-primary" />
                          {selectedAppointment.patientName || selectedAppointment.patientId}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-default-500">
                          <Activity className="w-4 h-4 text-secondary" />
                          {selectedAppointment.symptoms || "No symptoms listed"}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-xs font-semibold text-default-400 uppercase tracking-wider">Date</span>
                      <span className="text-sm font-medium">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmitPrescription} className="p-8 space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 ml-1">
                      <Stethoscope className="w-4 h-4 text-primary" />
                      Clinical Diagnosis
                    </label>
                    <Input
                      placeholder="e.g. Acute Viral Pharyngitis, Mild Hypertension..."
                      variant="faded"
                      size="lg"
                      radius="lg"
                      required
                      className="text-base font-medium bg-default-50 hover:bg-default-100 border-default-200 focus-within:!border-primary shadow-sm"
                      value={prescriptionData.diagnosis}
                      onChange={(e) => setPrescriptionData({...prescriptionData, diagnosis: e.target.value})}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 ml-1">
                      <Pill className="w-4 h-4 text-secondary" />
                      Medications & Dosage
                    </label>
                    <TextArea
                      placeholder="1. Paracetamol 500mg - 1 tab every 8 hours for 3 days&#10;2. Amoxicillin 500mg - 1 cap every 12 hours for 7 days"
                      rows={5}
                      required
                      className="w-full p-4 text-base leading-relaxed bg-default-50 hover:bg-default-100 border-2 border-default-200 focus:border-secondary focus:outline-none rounded-lg shadow-sm transition-colors"
                      value={prescriptionData.medications}
                      onChange={(e) => setPrescriptionData({...prescriptionData, medications: e.target.value})}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 ml-1">
                      <ClipboardList className="w-4 h-4 text-default-500" />
                      Additional Notes / Advice
                    </label>
                    <TextArea
                      placeholder="Dietary restrictions, rest recommendations, follow-up schedule..."
                      rows={3}
                      className="w-full p-4 text-base bg-default-50 hover:bg-default-100 border-2 border-default-200 focus:border-default-400 focus:outline-none rounded-lg shadow-sm transition-colors"
                      value={prescriptionData.notes}
                      onChange={(e) => setPrescriptionData({...prescriptionData, notes: e.target.value})}
                    />
                  </div>
                  
                  <hr className="my-6 border-default-200" />

                  <div className="flex items-center justify-end gap-4 pt-2">
                    <Button 
                      type="button" 
                      variant="flat" 
                      color="default" 
                      size="lg" 
                      radius="full"
                      className="px-8 font-semibold"
                      onPress={() => setSelectedAppointment(null)}
                      isDisabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      color="primary" 
                      size="lg" 
                      radius="full"
                      className="px-8 font-bold shadow-lg shadow-primary/30"
                      isLoading={isSubmitting}
                      endContent={!isSubmitting && <Send className="w-4 h-4" />}
                    >
                      Issue Prescription
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Custom Styles for Scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
        }
      `}</style>
    </div>
  );
}
