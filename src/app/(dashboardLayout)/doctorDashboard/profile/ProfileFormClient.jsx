"use client";

import React, { useState } from "react";
import { Card, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { User, Briefcase, Award, Clock, Calendar, DollarSign, Building, Camera, Save, Check } from "lucide-react";
import { toast, Zoom } from "react-toastify";
import { createDoctorProfile } from "@/app/lib/actions/doctors.actions";

export default function ProfileFormClient({ user, existingProfile }) {
  const [currentProfile, setCurrentProfile] = useState(existingProfile);
  const [isEditing, setIsEditing] = useState(!existingProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    specialization: existingProfile?.specialization || "",
    qualifications: existingProfile?.qualifications || "",
    experience: existingProfile?.experience || "",
    consultationFee: existingProfile?.consultationFee || "",
    hospitalName: existingProfile?.hospitalName || "",
    details: existingProfile?.details || "",
    availableDays: existingProfile?.availableDays || [],
    availableSlots: existingProfile?.availableSlots || [],
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
      email: user?.email,
    };

    console.log("Submitting Doctor Profile:", payload);

    // Call Server Action
    try {
      const response = await createDoctorProfile(payload);

      if (response.success) {
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
        setCurrentProfile(payload); // Instantly populate view state
        setIsEditing(false); // Switch to View mode after successfully saving
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile", {
        position: "top-center",
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isEditing && currentProfile !== null) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Your Profile</h1>
            <p className="text-default-500 mt-1">Manage your public medical credentials and availability.</p>
          </div>
          <Button color="primary" variant="flat" onPress={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-8 md:p-10 border border-default-100/50 bg-background/60 backdrop-blur-xl shadow-medium rounded-[2rem]">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 shrink-0 rounded-[2rem] bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-background shadow-lg">
                {user?.photo ? (
                  <img src={user.photo} alt={user?.name || "Doctor"} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-primary" />
                )}
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Dr. {user?.name || "Doctor"}</h2>
                  <p className="text-primary font-semibold flex items-center gap-2 mt-2">
                    <Briefcase className="w-5 h-5" /> {currentProfile.specialization}
                  </p>
                </div>
                
                <p className="text-default-500 text-sm leading-relaxed max-w-2xl">
                  {currentProfile.details}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-default-100/60">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[1.25rem] bg-default-100 flex items-center justify-center">
                      <Award className="w-5 h-5 text-default-500" />
                    </div>
                    <div>
                      <p className="text-xs text-default-500 font-medium">Qualifications</p>
                      <p className="text-sm font-bold text-foreground">{currentProfile.qualifications}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[1.25rem] bg-default-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-default-500" />
                    </div>
                    <div>
                      <p className="text-xs text-default-500 font-medium">Experience</p>
                      <p className="text-sm font-bold text-foreground">{currentProfile.experience} Years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[1.25rem] bg-default-100 flex items-center justify-center">
                      <Building className="w-5 h-5 text-default-500" />
                    </div>
                    <div>
                      <p className="text-xs text-default-500 font-medium">Hospital</p>
                      <p className="text-sm font-bold text-foreground">{currentProfile.hospitalName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[1.25rem] bg-default-100 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-default-500" />
                    </div>
                    <div>
                      <p className="text-xs text-default-500 font-medium">Consultation Fee</p>
                      <p className="text-sm font-bold text-foreground">${currentProfile.consultationFee}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-default-100/60">
              <h3 className="text-xl font-bold text-foreground mb-6">Availability</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-sm font-bold flex items-center gap-2 text-default-500 mb-4 uppercase tracking-wider">
                    <Calendar className="w-4 h-4" /> Working Days
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.availableDays?.map(day => (
                      <span key={day} className="px-4 py-2 bg-primary font-semibold rounded-xl text-xs shadow-md shadow-primary/30">
                        {day}
                      </span>
                    ))}
                    {(!currentProfile.availableDays || currentProfile.availableDays.length === 0) && (
                      <p className="text-sm text-default-400">No days specified.</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-bold flex items-center gap-2 text-default-500 mb-4 uppercase tracking-wider">
                    <Clock className="w-4 h-4" /> Time Slots
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.availableSlots?.map(slot => (
                      <span key={slot} className="px-4 py-2 bg-secondaryfont-semibold rounded-xl text-xs shadow-md shadow-secondary/30">
                        {slot}
                      </span>
                    ))}
                    {(!currentProfile.availableSlots || currentProfile.availableSlots.length === 0) && (
                      <p className="text-sm text-default-400">No slots specified.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (isEditing || currentProfile === null) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {currentProfile ? "Edit Profile" : "Create Profile"}
            </h1>
            <p className="text-default-500 mt-1">
              {currentProfile ? "Update your medical credentials and availability." : "Fill out your medical credentials and availability."}
            </p>
          </div>
          {currentProfile && (
            <Button color="danger" variant="flat" onPress={() => setIsEditing(false)}>
              Cancel Edit
            </Button>
          )}
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
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Specialization</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="w-4 h-4 text-default-400" />
                    </div>
                    <input
                      name="specialization"
                      placeholder="e.g. Cardiologist, Dermatologist"
                      value={formData.specialization}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-default-200 bg-default-100 text-foreground text-sm outline-none focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
  
                {/* Qualifications */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Qualifications</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Award className="w-4 h-4 text-default-400" />
                    </div>
                    <input
                      name="qualifications"
                      placeholder="e.g. MBBS, MD"
                      value={formData.qualifications}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-default-200 bg-default-100 text-foreground text-sm outline-none focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
  
                {/* Experience */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-1.5">Years of Experience</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="w-4 h-4 text-default-400" />
                    </div>
                    <input
                      name="experience"
                      type="number"
                      placeholder="e.g. 5 years"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-default-200 bg-default-100 text-foreground text-sm outline-none focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
  
                {/* Consultation Fee */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Consultation Fee ($)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="w-4 h-4 text-default-400" />
                    </div>
                    <input
                      name="consultationFee"
                      type="number"
                      placeholder="e.g. 100$"
                      value={formData.consultationFee}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-default-200 bg-default-100 text-foreground text-sm outline-none focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
  
                {/* Hospital Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Hospital / Clinic Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="w-4 h-4 text-default-400" />
                    </div>
                    <input
                      name="hospitalName"
                      placeholder="e.g. City General Hospital"
                      value={formData.hospitalName}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-default-200 bg-default-100 text-foreground text-sm outline-none focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
  
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
                          className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${isSelected
                            ? "bg-primary text-white border-primary shadow-md shadow-primary/30"
                            : "bg-default-100 text-default-500 border-default-200 hover:bg-default-200"
                            }`}
                        >
                          {isSelected && <Check className="w-4 h-4" />}
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
                          className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${isSelected
                            ? "bg-secondary text-white border-secondary shadow-md shadow-secondary/30"
                            : "bg-default-100 text-default-500 border-default-200 hover:bg-default-200"
                            }`}
                        >
                          {isSelected && <Check className="w-4 h-4" />}
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
}
