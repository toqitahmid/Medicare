"use client";

import { MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";

const Payments = ({ payments = [], totalAmount = 0 }) => {
    const recentPayments = [...payments].reverse().slice(0, 2);

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
                                
                                {/* Dynamic Segment */}
                                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#8b5cf6" strokeWidth="6" strokeDasharray="100, 100" />
                              </svg>
                              
                              {/* Center Text */}
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xl font-bold text-foreground">${totalAmount || 0}</span>
                                <span className="text-[10px] font-medium text-default-500 uppercase tracking-wider mt-0.5">Total Spent</span>
                              </div>
                           </div>
                           
                           <div className="flex flex-col gap-6 w-full">
                             {recentPayments.length > 0 ? recentPayments.map((payment, idx) => (
                               <div key={payment._id || idx} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-default-100/50 transition-colors cursor-pointer">
                                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${idx % 2 === 0 ? 'bg-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]'}`} />
                                  <div className="flex-1">
                                    <div className="flex justify-between items-center mb-0.5">
                                      <p className="text-sm font-bold text-foreground">{payment.purpose || "Medical Services"}</p>
                                      <p className="text-sm font-bold text-foreground">${payment.amount || 0}</p>
                                    </div>
                                    <p className="text-xs text-default-500 font-medium">{new Date(payment.createdAt).toLocaleDateString() || "Recent Payment"}</p>
                                  </div>
                               </div>
                             )) : (
                               <div className="text-sm text-default-500 py-4 text-center">
                                 No recent payments.
                               </div>
                             )}
                           </div>
                        </div>
                      </motion.div>
        </>
    )
}

export default Payments