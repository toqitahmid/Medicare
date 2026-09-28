"use client";

import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const Appointment = ({ appointments = [] }) => {
    const historyList = [...appointments].reverse().slice(0, 3);

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
                    {historyList.length > 0 ? historyList.map((app, index) => {
                        const isCancelled = app.appointmentStatus === "Cancelled" || app.appointmentStatus === "cancelled";
                        const isCompleted = app.appointmentStatus === "Completed" || app.appointmentStatus === "completed";
                        
                        let iconBgClass = "bg-default-500/10 border-default-500/20 text-default-500";
                        if (isCompleted) iconBgClass = "bg-green-500/10 border-green-500/20 text-green-500";
                        if (isCancelled) iconBgClass = "bg-red-500/10 border-red-500/20 text-red-500";

                        return (
                            <div key={app._id || index} className={`bg-content1 border border-divider rounded-2xl p-4 flex items-center justify-between hover:bg-content2 transition-all cursor-pointer group ${isCancelled ? 'opacity-70' : ''}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl border ${iconBgClass}`}>
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-foreground">{app.doctorName || "Doctor"}</h4>
                                        <p className={`text-xs font-medium mt-0.5 ${isCancelled ? 'text-red-400/70' : 'text-default-500'}`}>
                                            {app.appointmentStatus || "Pending"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1 mr-2">
                                    <span className="text-[11px] font-bold text-default-400">{app.appointmentDate}</span>
                                    <span className="text-[10px] font-medium text-default-500">{app.appointmentTime}</span>
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="text-center py-4 text-default-500 text-sm">
                            No appointment history.
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    )
}
export default Appointment;