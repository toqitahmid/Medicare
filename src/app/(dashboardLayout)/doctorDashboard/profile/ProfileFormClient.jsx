"use client";

import React, { useState } from "react";
import { Card, Input, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { User, Briefcase, Award, Clock, Calendar, DollarSign, Building, Camera, Save } from "lucide-react";
import { toast, Zoom } from "react-toastify";

export default function ProfileFormClient({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    specialization: "",
    qualifications: "",
    experience: "",
    consultationFee: "",
    hospitalName: "",
    details: "",
    availableDays: [],
    availableSlots: [],
  });

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = ["09:00 AM - 11:00 AM", "11:00 AM - 01:00 PM", "02:00 PM - 04:00 PM", "04:00 PM - 06:00 PM", "06:00 PM - 08:00 PM"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, keys) => {
    setFormData((prev) => ({ ...prev, [name]: Array.from(keys) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...formData,
      name: user?.name,
      photo: user?.photo || formData.profileImage,
      objectId: user?._id,
    };

    console.log("Submitting Doctor Profile:", payload);

    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Profile updated successfully!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        transition: Zoom,
      });
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Doctor Profile</h1>
        <p className="text-default-500 mt-1">Update your medical credentials and availability.</p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-8 border border-default-100/50 bg-background/60 backdrop-blur-xl shadow-medium rounded-[2rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Details / Bio */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1.5">Professional Details / Bio</label>
                <textarea
                  name="details"
                  placeholder="Tell us a little about your background, expertise, and approach to medicine."
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-default-200 bg-default-100 text-foreground text-sm outline-none focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all resize-y"
                  rows={4}
                />
              </div>

              {/* Specialization */}
              <Input
                label="Specialization"
                name="specialization"
                placeholder="e.g. Cardiologist, Dermatologist"
                value={formData.specialization}
                onChange={handleChange}
                startContent={<Briefcase className="w-4 h-4 text-default-400" />}
                variant="bordered"
                isRequired
              />

              {/* Qualifications */}
              <Input
                label="Qualifications"
                name="qualifications"
                placeholder="e.g. MBBS, MD"
                value={formData.qualifications}
                onChange={handleChange}
                startContent={<Award className="w-4 h-4 text-default-400" />}
                variant="bordered"
                isRequired
              />

              {/* Experience */}
              <div className="md:col-span-2">
                <Input
                  label="Years of Experience"
                  name="experience"
                  type="number"
                  placeholder="e.g. 5 years"
                  value={formData.experience}
                  onChange={handleChange}
                  startContent={<Clock className="w-4 h-4 text-default-400" />}
                  variant="bordered"
                  isRequired
                />
              </div>

              {/* Consultation Fee */}
              <Input
                label="Consultation Fee ($)"
                name="consultationFee"
                type="number"
                placeholder="e.g. 100$"
                value={formData.consultationFee}
                onChange={handleChange}
                startContent={<DollarSign className="w-4 h-4 text-default-400" />}
                variant="bordered"
                isRequired
              />

              {/* Hospital Name */}
              <Input
                label="Hospital / Clinic Name"
                name="hospitalName"
                placeholder="e.g. City General Hospital"
                value={formData.hospitalName}
                onChange={handleChange}
                startContent={<Building className="w-4 h-4 text-default-400" />}
                variant="bordered"
                isRequired
              />

              {/* Available Days */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-foreground">
                  <Calendar className="w-4 h-4 text-default-400" />
                  Available Days
                </label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => {
                    const isSelected = formData.availableDays.includes(day);
                    return (
                      <div
                        key={day}
                        onClick={() => {
                          const newDays = isSelected
                            ? formData.availableDays.filter((d) => d !== day)
                            : [...formData.availableDays, day];
                          setFormData((prev) => ({ ...prev, availableDays: newDays }));
                        }}
                        className={`cursor-pointer px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/30"
                            : "bg-default-100 text-default-500 border-default-200 hover:bg-default-200"
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Available Slots */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-foreground mt-2">
                  <Clock className="w-4 h-4 text-default-400" />
                  Available Time Slots
                </label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = formData.availableSlots.includes(slot);
                    return (
                      <div
                        key={slot}
                        onClick={() => {
                          const newSlots = isSelected
                            ? formData.availableSlots.filter((s) => s !== slot)
                            : [...formData.availableSlots, slot];
                          setFormData((prev) => ({ ...prev, availableSlots: newSlots }));
                        }}
                        className={`cursor-pointer px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                          isSelected
                            ? "bg-secondary text-secondary-foreground border-secondary shadow-md shadow-secondary/30"
                            : "bg-default-100 text-default-500 border-default-200 hover:bg-default-200"
                        }`}
                      >
                        {slot}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            <div className="mt-8 flex justify-end">
              <Button 
                type="submit"
                color="primary" 
                size="lg"
                className="font-bold rounded-[1rem] shadow-lg shadow-primary/30 px-8"
                isLoading={isLoading}
                startContent={!isLoading && <Save className="w-5 h-5" />}
              >
                Save Profile
              </Button>
            </div>
          </Card>
        </motion.div>
      </form>
    </div>
  );
}
