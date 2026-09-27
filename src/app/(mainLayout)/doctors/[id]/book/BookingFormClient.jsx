"use client";
import React, { useState } from "react";
import { Card, Button } from "@heroui/react";
import { Calendar as CalendarIcon, Clock, Activity, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { createAppointment } from "@/app/lib/actions/appointment.actions";
import { useRouter } from "next/navigation";

export default function BookingFormClient({ doctor, user }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    symptoms: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      patientId: user?.email || user?.id, // using email as ID if DB objectId isn't available
      patientName: user?.name,
      doctorId: doctor._id,
      doctorName: doctor.name,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      appointmentStatus: "Pending",
      paymentStatus: "Unpaid",
      symptoms: formData.symptoms,
      fee: doctor.consultationFee,
    };

    const res = await createAppointment(payload);
    setIsLoading(false);

    if (res.success) {
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/patientDashboard/appointments");
      }, 3000);
    } else {
      alert("Something went wrong booking your appointment. Ensure backend is running!");
    }
  };

  if (isSuccess) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-20 max-w-2xl mx-auto">
        <Card className="p-10 flex flex-col items-center text-center bg-success-50/50 border border-success-200 shadow-lg rounded-4xl">
          <div className="w-20 h-20 bg-success/20 text-success rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Appointment Requested!</h2>
          <p className="text-default-600 text-lg mb-8">
            Your appointment with <span className="font-bold">Dr. {doctor.name}</span> on <span className="font-bold">{formData.appointmentDate}</span> at <span className="font-bold">{formData.appointmentTime}</span> has been requested successfully. 
          </p>
          <Button color="success" variant="flat" onPress={() => router.push("/patientDashboard/appointments")} size="lg" className="font-bold">
            View My Appointments
          </Button>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-foreground mb-3">Book an Appointment</h1>
        <p className="text-default-500 text-lg">Schedule your consultation with Dr. {doctor.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Doctor Summary Sidebar */}
        <div className="md:col-span-1">
          <Card className="p-6 bg-background/60 backdrop-blur-xl border border-default-200 shadow-medium rounded-3xl sticky top-24">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-2xl bg-primary/10 overflow-hidden mb-4">
                {doctor.photo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-default-200" />
                )}
              </div>
              <h3 className="text-xl font-bold text-foreground">Dr. {doctor.name}</h3>
              <p className="text-primary font-bold text-sm uppercase tracking-wider mt-1">{doctor.specialization}</p>
              
              <div className="w-full h-px bg-default-200 my-6"></div>
              
              <div className="w-full space-y-4 text-left">
                <div>
                  <p className="text-xs text-default-500 font-bold uppercase">Consultation Fee</p>
                  <p className="font-bold text-foreground text-lg">${doctor.consultationFee}</p>
                </div>
                <div>
                  <p className="text-xs text-default-500 font-bold uppercase">Working Days</p>
                  <p className="font-bold text-foreground text-sm">{doctor.availableDays?.join(", ") || "Any"}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Booking Form */}
        <div className="md:col-span-2">
          <Card className="p-8 md:p-10 bg-background/60 backdrop-blur-xl border border-default-200 shadow-medium rounded-[2.5rem]">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold flex items-center gap-2 text-default-500 mb-3 uppercase tracking-wider">
                    <CalendarIcon className="w-4 h-4" /> Select Date
                  </label>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-default-200 bg-default-100/50 backdrop-blur-md text-foreground text-sm outline-none focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold flex items-center gap-2 text-default-500 mb-3 uppercase tracking-wider">
                    <Clock className="w-4 h-4" /> Select Time Slot
                  </label>
                  <div className="relative">
                    <select
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-default-200 bg-default-100/50 backdrop-blur-md text-foreground text-sm outline-none focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all appearance-none"
                    >
                      <option value="">Choose an available slot</option>
                      {doctor.availableSlots?.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-default-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold flex items-center gap-2 text-default-500 mb-3 uppercase tracking-wider">
                    <Activity className="w-4 h-4" /> Symptoms / Reason for Visit
                  </label>
                  <textarea
                    name="symptoms"
                    placeholder="Briefly describe what you are experiencing..."
                    value={formData.symptoms}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-default-200 bg-default-100/50 backdrop-blur-md text-foreground text-sm outline-none focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all resize-y min-h-[100px]"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-default-200">
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  className="w-full font-bold rounded-2xl shadow-lg shadow-primary/30 py-7 text-lg"
                  isLoading={isLoading}
                  endContent={!isLoading && <Send className="w-5 h-5" />}
                >
                  Confirm Booking
                </Button>
                <p className="text-xs text-center text-default-400 mt-4 font-medium">Payment status will be recorded as Unpaid. You can pay at the clinic.</p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
