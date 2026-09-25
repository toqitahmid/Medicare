"use client";

const { HeartPulse, Activity, Stethoscope } = require("lucide-react");
import { Avatar } from "@heroui/react";
import { motion } from "framer-motion";

const UpComming = () => {
    return (
        <>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>

                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-foreground">Upcoming Appointments</h3>
                </div>

                <div className="space-y-4">
                    {/* Active Card (Nearest Appointment) */}
                    <div className="bg-foreground rounded-3xl p-5 flex items-center justify-between shadow-lg transform transition-transform hover:scale-[1.01] cursor-pointer">
                        <div className="flex items-center gap-5">
                            <div className="bg-background text-foreground p-3.5 rounded-2xl">
                                <Stethoscope className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-background text-lg">Dr. Sarah Jenkins</h3>
                                <p className="text-background/70 text-xs mt-0.5 font-medium">Cardiology • Oct 24, 9:00 AM</p>
                            </div>
                        </div>
                        <div className="flex -space-x-3 mr-2">
                            <Avatar src="https://i.pravatar.cc/150?u=doc1" size="sm" className="border-2 border-foreground" />
                        </div>
                    </div>

                    {/* Inactive Card 1 */}
                    <div className="bg-content1 rounded-3xl p-5 flex items-center justify-between border border-divider hover:bg-content2 transition-colors cursor-pointer">
                        <div className="flex items-center gap-5">
                            <div className="bg-orange-500/10 text-orange-500 p-3.5 rounded-2xl">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground text-lg">Blood Test Lab</h3>
                                <p className="text-default-500 text-xs mt-0.5 font-medium">Pathology • Oct 28, 11:00 AM</p>
                            </div>
                        </div>
                        <div className="flex -space-x-3 mr-2 opacity-80">
                            <Avatar src="https://i.pravatar.cc/150?u=nurse1" size="sm" className="border-2 border-content1" />
                        </div>
                    </div>

                    {/* Inactive Card 2 */}
                    <div className="bg-content1 rounded-3xl p-5 flex items-center justify-between border border-divider hover:bg-content2 transition-colors cursor-pointer">
                        <div className="flex items-center gap-5">
                            <div className="bg-blue-500/10 text-blue-500 p-3.5 rounded-2xl">
                                <HeartPulse className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground text-lg">Dr. Michael Chen</h3>
                                <p className="text-default-500 text-xs mt-0.5 font-medium">General • Nov 2, 2:30 PM</p>
                            </div>
                        </div>
                        <div className="flex -space-x-3 mr-2 opacity-80">
                            <Avatar src="https://i.pravatar.cc/150?u=doc3" size="sm" className="border-2 border-content1" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default UpComming;