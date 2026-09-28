"use client";

const { HeartPulse, Activity, Stethoscope } = require("lucide-react");
import { Avatar } from "@heroui/react";
import { motion } from "framer-motion";

const UpComming = ({ appointments = [] }) => {
    // Filter for non-completed and non-cancelled appointments
    const upcomingList = appointments
        .filter(app => app.appointmentStatus !== "Completed" && app.appointmentStatus !== "Cancelled" && app.appointmentStatus !== "cancelled" && app.appointmentStatus !== "completed")
        .slice(0, 3);

    return (
        <>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>

                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-foreground">Upcoming Appointments</h3>
                </div>

                <div className="space-y-4">
                    {upcomingList.length > 0 ? upcomingList.map((app, index) => {
                        const isActive = index === 0;
                        return (
                            <div key={app._id || index} className={`${isActive ? 'bg-foreground' : 'bg-content1 border border-divider hover:bg-content2'} rounded-3xl p-5 flex items-center justify-between shadow-lg transform transition-transform hover:scale-[1.01] cursor-pointer`}>
                                <div className="flex items-center gap-5">
                                    <div className={`${isActive ? 'bg-background text-foreground' : 'bg-blue-500/10 text-blue-500'} p-3.5 rounded-2xl`}>
                                        <Stethoscope className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold ${isActive ? 'text-background' : 'text-foreground'} text-lg`}>{app.doctorName || "Doctor"}</h3>
                                        <p className={`${isActive ? 'text-background/70' : 'text-default-500'} text-xs mt-0.5 font-medium`}>
                                            {app.appointmentDate} • {app.appointmentTime}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex -space-x-3 mr-2 opacity-80">
                                    <Avatar src={`https://i.pravatar.cc/150?u=${app.doctorId || app._id}`} size="sm" className={`border-2 ${isActive ? 'border-foreground' : 'border-content1'}`} />
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="text-center py-6 text-default-500 text-sm">
                            No upcoming appointments.
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    )
}

export default UpComming;