import React from "react";
import { getAllDoctors } from "@/app/lib/actions/doctors.actions";
import { Briefcase, Clock, Award, Building, DollarSign, Calendar, Mail, ArrowLeft, CalendarPlus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@heroui/react";
import { Card } from "@heroui/react";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const response = await getAllDoctors();
  const doctors = response?.success ? response.data : [];
  const doctor = doctors.find((doc) => doc._id === id);

  if (!doctor) return { title: "Doctor Not Found" };
  return { title: `Dr. ${doctor.name} | Medicare` };
}

export default async function DoctorDetailsPage({ params }) {
  const { id } = await params;
  const response = await getAllDoctors();
  const doctors = response?.success ? response.data : [];
  const doctor = doctors.find((doc) => doc._id === id);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-8 min-h-[80vh]">
      <Link href="/doctors" className="inline-flex items-center gap-2 text-default-500 hover:text-primary transition-colors font-semibold group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to specialists
      </Link>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column: Profile Card */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="p-8 border border-default-100/50 bg-background/60 backdrop-blur-xl shadow-medium rounded-[2.5rem] flex flex-col items-center text-center sticky top-24">
            <div className="w-56 h-56 rounded-4xl bg-primary/10 flex items-center justify-center overflow-hidden border-8 border-background shadow-xl mb-6">
              {doctor.photo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-default-200" />
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-foreground mb-1">Dr. {doctor.name}</h1>
            <p className="text-primary font-bold tracking-wide uppercase text-sm mb-6 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> {doctor.specialization}
            </p>
            
            <div className="w-full flex flex-col gap-4 mt-2">
              <Button color="primary" size="lg" className="w-full font-bold shadow-lg shadow-primary/30 rounded-xl py-6" startContent={<CalendarPlus className="w-5 h-5" />}>
                Book Appointment
              </Button>
              <Button color="default" variant="flat" size="lg" className="w-full font-bold rounded-xl py-6" startContent={<Mail className="w-5 h-5" />}>
                Message Doctor
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Information */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="p-8 md:p-10 border border-default-100/50 bg-background/60 backdrop-blur-xl shadow-medium rounded-[2.5rem]">
            <h2 className="text-2xl font-extrabold text-foreground mb-6 border-b border-default-100 pb-4">Professional Overview</h2>
            <p className="text-default-600 leading-relaxed text-lg mb-10 whitespace-pre-wrap">
              {doctor.details || "No professional biography provided."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-5 p-5 rounded-3xl bg-default-50/50 border border-default-100 transition-colors hover:border-primary/30">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-default-500 font-bold uppercase tracking-wider mb-1">Qualifications</p>
                  <p className="font-extrabold text-foreground text-lg">{doctor.qualifications}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-5 p-5 rounded-3xl bg-default-50/50 border border-default-100 transition-colors hover:border-warning/30">
                <div className="w-14 h-14 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-xs text-default-500 font-bold uppercase tracking-wider mb-1">Experience</p>
                  <p className="font-extrabold text-foreground text-lg">{doctor.experience} Years</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-5 rounded-3xl bg-default-50/50 border border-default-100 transition-colors hover:border-secondary/30">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <Building className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-default-500 font-bold uppercase tracking-wider mb-1">Hospital / Clinic</p>
                  <p className="font-extrabold text-foreground text-lg">{doctor.hospitalName}</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-5 rounded-3xl bg-default-50/50 border border-default-100 transition-colors hover:border-success/30">
                <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <DollarSign className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-xs text-default-500 font-bold uppercase tracking-wider mb-1">Consultation Fee</p>
                  <p className="font-extrabold text-foreground text-lg">${doctor.consultationFee}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-default-100">
              <h3 className="text-2xl font-extrabold text-foreground mb-8">Availability</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-default-50/30 p-6 rounded-4xl border border-default-100">
                  <p className="text-sm font-extrabold flex items-center gap-2 text-primary mb-6 uppercase tracking-wider">
                    <Calendar className="w-5 h-5" /> Working Days
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {doctor.availableDays?.map((day) => (
                      <span key={day} className="px-4 py-2 bg-primary text-primary-foreground font-bold rounded-xl text-sm shadow-md shadow-primary/30">
                        {day}
                      </span>
                    ))}
                    {!doctor.availableDays?.length && <p className="text-default-400 font-medium">Not specified</p>}
                  </div>
                </div>
                
                <div className="bg-default-50/30 p-6 rounded-4xl border border-default-100">
                  <p className="text-sm font-extrabold flex items-center gap-2 text-secondary mb-6 uppercase tracking-wider">
                    <Clock className="w-5 h-5" /> Time Slots
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {doctor.availableSlots?.map((slot) => (
                      <span key={slot} className="px-4 py-2 bg-secondary text-secondary-foreground font-bold rounded-xl text-sm shadow-md shadow-secondary/30">
                        {slot}
                      </span>
                    ))}
                    {!doctor.availableSlots?.length && <p className="text-default-400 font-medium">Not specified</p>}
                  </div>
                </div>
              </div>
            </div>

          </Card>
        </div>
      </div>
    </div>
  );
}
