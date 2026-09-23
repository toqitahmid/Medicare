"use client";

import { authHeader } from "@/app/lib/core/token";
import React, { useState, useMemo } from "react";

const ManageSchedule = ({ DoctorData }) => {
  // Parse comma-separated string safely into an array
  const parseDays = (days) => {
    if (!days) return [];
    if (Array.isArray(days)) return days;
    return days.split(",").map((day) => day.trim());
  };

  // Derive initial schedule dynamically from incoming prop without useEffect
  const currentSchedule = useMemo(() => {
    return {
      availableDays: parseDays(DoctorData?.availableDays),
      availableSlots: DoctorData?.availableSlots || "",
    };
  }, [DoctorData]);

  // UI state
  const [schedule, setSchedule] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    availableDays: [],
    availableSlots: "",
  });
  const [loading, setLoading] = useState(false);

  // Active schedule values fallback to derived prop data if state hasn't been locally modified
  const activeDays = schedule?.availableDays ?? currentSchedule.availableDays;
  const activeSlots =
    schedule?.availableSlots ?? currentSchedule.availableSlots;

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Open edit mode pre-populated with active data
  const handleEditClick = () => {
    setFormData({
      availableDays: activeDays,
      availableSlots: activeSlots,
    });
    setIsEditing(true);
  };

  // Toggle selected day in form
  const handleDayToggle = (day) => {
    const updatedDays = formData.availableDays.includes(day)
      ? formData.availableDays.filter((d) => d !== day)
      : [...formData.availableDays, day];

    setFormData({ ...formData, availableDays: updatedDays });
  };

  // Handle PATCH request to update MongoDB
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!DoctorData?._id) return;
    setLoading(true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
      const response = await fetch(
        `${baseUrl}/api/doctors/update_schedule/${DoctorData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(await authHeader()),
          },
          body: JSON.stringify({
            availableDays: formData.availableDays,
            availableSlots: formData.availableSlots,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setSchedule({
          availableDays: formData.availableDays,
          availableSlots: formData.availableSlots,
        });
        setIsEditing(false);
      } else {
        console.error("Update failed:", data.message);
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-white p-6 font-sans">
      {/* Top Banner */}
      <div className="bg-emerald-600 rounded-xl p-6 mb-6">
        <span className="text-xs uppercase tracking-wider text-emerald-100 font-semibold">
          Doctor Desk • {DoctorData?.specialization || "Specialist"}
        </span>
        <h1 className="text-2xl font-bold mt-1">
          Welcome, {DoctorData?.name || "Doctor"}
        </h1>
        <p className="text-emerald-100 text-sm mt-1">
          Manage working days and consultation slots for{" "}
          {DoctorData?.hospitalName || "your hospital"}.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Schedule Overview */}
        <div className="lg:col-span-1 bg-[#0d1427] border border-gray-800 rounded-xl p-6 h-fit">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-200">
              Current Schedule
            </h2>
            {!isEditing && (
              <button
                onClick={handleEditClick}
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition"
              >
                Edit Schedule
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400 mb-2">AVAILABLE DAYS</p>
              <div className="flex flex-wrap gap-2">
                {activeDays.length > 0 ? (
                  activeDays.map((day) => (
                    <span
                      key={day}
                      className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-3 py-1 rounded-md font-medium"
                    >
                      {day}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-gray-500">No days selected</p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs text-gray-400 mb-1">AVAILABLE SLOTS</p>
              <p className="text-sm font-medium text-gray-200">
                {activeSlots || "No slots set"}
              </p>
            </div>
          </div>
        </div>

        {/* Schedule Form */}
        {isEditing && (
          <div className="lg:col-span-2 bg-[#0d1427] border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-200 mb-6">
              Update Available Slots & Days
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs text-gray-400 mb-3">
                  SELECT AVAILABLE DAYS
                </label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => {
                    const isSelected = formData.availableDays.includes(day);
                    return (
                      <button
                        type="button"
                        key={day}
                        onClick={() => handleDayToggle(day)}
                        className={`text-xs px-4 py-2 rounded-lg font-medium transition ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-[#131c35] text-gray-400 border border-gray-700 hover:bg-gray-800"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-2">
                  AVAILABLE TIME SLOTS
                </label>
                <input
                  type="text"
                  value={formData.availableSlots}
                  onChange={(e) =>
                    setFormData({ ...formData, availableSlots: e.target.value })
                  }
                  placeholder="e.g. 09:30 AM - 04:00 PM"
                  className="w-full bg-[#131c35] border border-gray-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                  className="px-4 py-2 text-xs text-gray-400 hover:text-white transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Schedule"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSchedule;
