"use client";
import React from "react";
import { Card, Avatar } from "@heroui/react";
import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";

export default function ReviewsClient({ reviews = [] }) {
    // Assuming ratings are numbers 1-5
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 
        ? (reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0) / totalReviews).toFixed(1)
        : 0;

    return (
        <div className="w-full min-h-screen text-foreground bg-background font-sans p-6 md:p-10 space-y-8">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Patient Reviews
                </h1>
                <p className="text-default-500">Read and monitor patient feedback across all doctors.</p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card className="p-8 border border-default-100 bg-background/60 backdrop-blur-xl shadow-medium rounded-[2rem] flex flex-row items-center gap-6 h-full">
                        <div className="p-5 rounded-[1.5rem] bg-yellow-500/10 text-yellow-500 flex-shrink-0">
                            <Star className="w-10 h-10 fill-current" />
                        </div>
                        <div>
                            <p className="text-default-500 font-medium mb-1">Average Rating</p>
                            <h3 className="text-4xl font-bold text-foreground">{averageRating} <span className="text-xl text-default-400 font-normal">/ 5.0</span></h3>
                        </div>
                    </Card>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Card className="p-8 border border-default-100 bg-background/60 backdrop-blur-xl shadow-medium rounded-[2rem] flex flex-row items-center gap-6 h-full">
                        <div className="p-5 rounded-[1.5rem] bg-blue-500/10 text-blue-500 flex-shrink-0">
                            <MessageSquare className="w-10 h-10" />
                        </div>
                        <div>
                            <p className="text-default-500 font-medium mb-1">Total Reviews</p>
                            <h3 className="text-4xl font-bold text-foreground">{totalReviews}</h3>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Reviews Grid */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {reviews.length > 0 ? reviews.map((review, idx) => (
                        <Card key={review._id || idx} className="p-6 border border-default-100 bg-background/60 backdrop-blur-xl shadow-medium rounded-3xl flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star 
                                                key={star} 
                                                className={`w-4 h-4 ${star <= (review.rating || 5) ? 'text-yellow-500 fill-yellow-500' : 'text-default-200'}`} 
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-default-400 font-medium">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-foreground text-sm leading-relaxed mb-6 italic">
                                    "{review.reviewText || review.comment || "Great service, highly recommended!"}"
                                </p>
                            </div>
                            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-default-100">
                                <Avatar src={`https://i.pravatar.cc/150?u=${review.patientId || idx}`} size="sm" />
                                <div>
                                    <h4 className="text-sm font-bold text-foreground">{review.patientName || "Anonymous Patient"}</h4>
                                    <p className="text-xs text-default-500 font-medium">
                                        For <span className="text-primary">Dr. {review.doctorName || "Unknown"}</span>
                                    </p>
                                </div>
                            </div>
                        </Card>
                    )) : (
                        <div className="col-span-full text-center py-12 text-default-500 bg-default-50/50 rounded-3xl border border-default-100 border-dashed">
                            No reviews found in the system.
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
