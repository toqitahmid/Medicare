"use client";
import React, { useState } from "react";
import { Card, CardBody, CardHeader, Button, Avatar, Textarea, Chip } from "@heroui/react";
import { Star, User, Calendar, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createReview } from "@/app/lib/actions/review.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function PatientReviewsClient({ prescriptions }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReviews, setSubmittedReviews] = useState({});
  const router = useRouter();

  // Extract unique doctors from prescriptions so we don't review the same doctor multiple times
  // Or we can just let them review based on the prescription encounter.
  // The instructions said "based on prescriptions in payload".
  // Extract unique doctors from prescriptions so we don't review the same doctor multiple times
  const validPrescriptions = Array.isArray(prescriptions) ? prescriptions.filter(p => p.doctorId) : [];

  const handleSelectPrescription = (prescription) => {
    setSelectedDoctor(prescription);
    setRating(0);
    setReviewText("");
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!reviewText.trim()) {
      toast.error("Please write a review");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        patientId: selectedDoctor.patientId,
        doctorId: selectedDoctor.doctorId,
        doctorName: selectedDoctor.doctorName || "Doctor",
        patientName: selectedDoctor.patientName || selectedDoctor.patientId,
        rating: rating,
        comment: reviewText,
        createdAt: new Date().toISOString()
      };

      const res = await createReview(payload);
      if (res.success) {
        toast.success("Review submitted successfully! Thank you for your feedback.");
        setSubmittedReviews({...submittedReviews, [selectedDoctor._id]: true});
        setSelectedDoctor(null);
      } else {
        toast.error(res.message || "Failed to submit review");
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
          <Star className="w-10 h-10 text-primary" />
          Review Your Doctors
        </h1>
        <p className="text-default-500 text-lg">Share your experience with doctors you've consulted recently.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left sidebar - Prescription/Doctor Selection */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 flex flex-col h-[700px]"
        >
          <div className="bg-background/60 backdrop-blur-xl border border-default-200 rounded-[2rem] shadow-xl shadow-default-200/50 flex-1 overflow-hidden flex flex-col">
            <div className="p-6 bg-default-50/50 border-b border-default-100">
              <h2 className="text-xl font-bold text-foreground">Past Consultations</h2>
            </div>
            
            <div className="overflow-y-auto flex-1 p-4 space-y-3 custom-scrollbar">
              {validPrescriptions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-default-400 p-6 text-center">
                  <User className="w-12 h-12 mb-3 opacity-50" />
                  <p>You haven't received any prescriptions yet.</p>
                </div>
              ) : (
                validPrescriptions.map((prescription, idx) => (
                  <motion.div
                    key={prescription._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => !submittedReviews[prescription._id] && handleSelectPrescription(prescription)}
                    className={`p-4 rounded-2xl cursor-pointer border-2 transition-all duration-300 ${
                      submittedReviews[prescription._id] ? "bg-success/5 border-success/20 opacity-70 cursor-not-allowed" :
                      selectedDoctor?._id === prescription._id 
                        ? "bg-primary/10 border-primary shadow-md shadow-primary/20" 
                        : "bg-default-50/50 border-transparent hover:bg-default-100 hover:border-default-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <Avatar 
                          name={prescription.doctorName ? prescription.doctorName.charAt(0) : <User className="w-4 h-4"/>} 
                          className={`shrink-0 ${selectedDoctor?._id === prescription._id ? "bg-primary text-white" : "bg-secondary/20 text-secondary"}`}
                        />
                        <div className="overflow-hidden">
                          <p className="font-semibold text-foreground truncate text-sm">
                            Dr. {prescription.doctorName || "Doctor"}
                          </p>
                          <p className="text-xs text-default-500 truncate">
                            Diagnosis: {prescription.diagnosis || "Consultation"}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-default-400 mt-1">
                            <Calendar className="w-3 h-3" />
                            <span className="truncate">{new Date(prescription.createdAt || Date.now()).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      {submittedReviews[prescription._id] && (
                        <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>

        {/* Right side - Review Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-7"
        >
          <AnimatePresence mode="wait">
            {!selectedDoctor ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[700px] flex flex-col items-center justify-center bg-background/40 backdrop-blur-md border border-default-200 border-dashed rounded-[2rem]"
              >
                <div className="bg-default-100 p-8 rounded-full mb-6">
                  <MessageSquare className="w-16 h-16 text-default-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Write a Review</h3>
                <p className="text-default-500 text-center max-w-sm">
                  Select a past consultation from the list to share your feedback about the doctor.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-background/80 backdrop-blur-xl border border-default-200 rounded-[2rem] shadow-2xl shadow-primary/5 overflow-hidden flex flex-col h-[700px]"
              >
                {/* Review Header */}
                <div className="bg-gradient-to-r from-secondary/10 via-primary/5 to-secondary/10 p-8 border-b border-default-200/50">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Review Dr. {selectedDoctor.doctorName || "Doctor"}
                  </h2>
                  <p className="text-sm text-default-500">
                    For your consultation regarding: <span className="font-semibold text-foreground">{selectedDoctor.diagnosis || "General"}</span>
                  </p>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmitReview} className="p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-8">
                    {/* Rating Stars */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-foreground">How would you rate your experience?</label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            type="button"
                            key={star}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="p-1 outline-none focus:outline-none transition-colors"
                          >
                            <Star 
                              className={`w-10 h-10 ${
                                star <= (hoveredRating || rating) 
                                  ? "fill-warning text-warning" 
                                  : "text-default-300"
                              } transition-all duration-200`} 
                            />
                          </motion.button>
                        ))}
                        <span className="ml-4 text-sm font-medium text-default-500">
                          {rating === 1 && "Poor"}
                          {rating === 2 && "Fair"}
                          {rating === 3 && "Good"}
                          {rating === 4 && "Very Good"}
                          {rating === 5 && "Excellent"}
                        </span>
                      </div>
                    </div>

                    {/* Review Text */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        Detailed Feedback
                      </label>
                      <textarea
                        placeholder="Please share details about your consultation, the doctor's bedside manner, and whether you would recommend them..."
                        rows={6}
                        required
                        className="w-full p-4 text-base bg-default-50 hover:bg-default-100 border-2 border-default-200 focus:border-primary focus:outline-none rounded-[1.5rem] shadow-sm transition-colors resize-none"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-default-100">
                    <Button 
                      type="button" 
                      variant="flat" 
                      color="default" 
                      size="lg" 
                      radius="full"
                      className="px-8 font-semibold"
                      onPress={() => setSelectedDoctor(null)}
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
                      Post Review
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

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
