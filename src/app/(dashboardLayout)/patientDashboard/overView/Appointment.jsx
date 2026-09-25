"use client";

import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const Appointment = () => {
    return (
        <>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <div className="flex justify-between items-center mb-5">
                    <h3 className="font-bold text-lg text-foreground">Appointment History</h3>
                    <button className="text-[11px] font-bold text-default-400 flex items-center gap-1.5 hover:text-foreground transition-colors uppercase tracking-wider">
                        Full History <ArrowRight size={14} />
                    </button>
                </div>

                <div className="space-y-3.5">
                    {/* History Item 1 */}
                    <div className="bg-content1 border border-divider rounded-2xl p-4 flex items-center justify-between hover:bg-content2 transition-all cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-500/10 p-3 rounded-xl border border-green-500/20 text-green-500">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-foreground">Dr. Emily Chen</h4>
                                <p className="text-xs text-default-500 font-medium mt-0.5">Dermatology • Completed</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 mr-2">
                            <span className="text-[11px] font-bold text-default-400">Sep 15, 2026</span>
                            <span className="text-[10px] font-medium text-default-500">10:00 AM</span>
                        </div>
                    </div>

                    {/* History Item 2 */}
                    <div className="bg-content1 border border-divider rounded-2xl p-4 flex items-center justify-between hover:bg-content2 transition-all cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-500/10 p-3 rounded-xl border border-green-500/20 text-green-500">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-foreground">Dr. Sarah Jenkins</h4>
                                <p className="text-xs text-default-500 font-medium mt-0.5">Cardiology • Completed</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 mr-2">
                            <span className="text-[11px] font-bold text-default-400">Aug 22, 2026</span>
                            <span className="text-[10px] font-medium text-default-500">2:30 PM</span>
                        </div>
                    </div>

                    {/* History Item 3 (Cancelled) */}
                    <div className="bg-content1 border border-divider rounded-2xl p-4 flex items-center justify-between hover:bg-content2 transition-all cursor-pointer group opacity-70">
                        <div className="flex items-center gap-4">
                            <div className="bg-red-500/10 p-3 rounded-xl border border-red-500/20 text-red-500">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-foreground">Blood Test</h4>
                                <p className="text-xs text-default-500 font-medium mt-0.5 text-red-400/70">Cancelled</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 mr-2">
                            <span className="text-[11px] font-bold text-default-400">Jul 10, 2026</span>
                            <span className="text-[10px] font-medium text-default-500">9:00 AM</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
export default Appointment;