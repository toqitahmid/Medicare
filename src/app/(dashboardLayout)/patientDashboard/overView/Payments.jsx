"use client";

import { MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";

const Payments = () => {
    return (
        <>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <div className="flex justify-between items-center mb-5">
                          <h3 className="font-bold text-lg text-foreground">Total Payments</h3>
                          <button className="text-default-500 hover:text-foreground transition-colors">
                            <MoreHorizontal className="w-5 h-5"/>
                          </button>
                        </div>
                        
                        <div className="bg-content1 border border-divider rounded-[2rem] p-8 flex flex-col sm:flex-row items-center gap-10">
                           {/* SVG Donut Chart for Payment Breakdown */}
                           <div className="relative w-40 h-40 flex-shrink-0">
                              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                <circle cx="18" cy="18" r="15.9155" fill="none" className="stroke-default-200 dark:stroke-default-100" strokeWidth="6" />
                                
                                {/* Consultations Segment (65%) */}
                                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#8b5cf6" strokeWidth="6" strokeDasharray="65, 100" />
                                
                                {/* Lab Tests Segment (35%) */}
                                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f97316" strokeWidth="6" strokeDasharray="35, 100" strokeDashoffset="-65" />
                              </svg>
                              
                              {/* Center Text */}
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xl font-bold text-foreground">$1,250</span>
                                <span className="text-[10px] font-medium text-default-500 uppercase tracking-wider mt-0.5">Total Spent</span>
                              </div>
                              
                              <div className="absolute top-2 -right-4 bg-foreground text-background text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                35%
                              </div>
                           </div>
                           
                           <div className="flex flex-col gap-6 w-full">
                             <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-default-100/50 transition-colors cursor-pointer">
                                <div className="w-2.5 h-2.5 rounded-full bg-purple-500 mt-1.5 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                                <div className="flex-1">
                                  <div className="flex justify-between items-center mb-0.5">
                                    <p className="text-sm font-bold text-foreground">Consultations</p>
                                    <p className="text-sm font-bold text-foreground">$812</p>
                                  </div>
                                  <p className="text-xs text-default-500 font-medium">Doctor visits & checkups</p>
                                </div>
                             </div>
                             
                             <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-default-100/50 transition-colors cursor-pointer">
                                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 mt-1.5 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                                <div className="flex-1">
                                  <div className="flex justify-between items-center mb-0.5">
                                    <p className="text-sm font-bold text-foreground">Lab Tests</p>
                                    <p className="text-sm font-bold text-foreground">$438</p>
                                  </div>
                                  <p className="text-xs text-default-500 font-medium">Pathology & Radiology</p>
                                </div>
                             </div>
                           </div>
                        </div>
                      </motion.div>
        </>
    )
}

export default Payments