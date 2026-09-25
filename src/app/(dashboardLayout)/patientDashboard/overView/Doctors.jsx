"use client";

import { Avatar } from "@heroui/react";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

const Doctors = () => {
    return (
        <>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <div className="flex items-center justify-between mb-5">
                          <h3 className="font-bold text-lg text-foreground">Favorite Doctors</h3>
                          <button className="text-[11px] font-bold text-default-400 flex items-center gap-1.5 hover:text-foreground transition-colors uppercase tracking-wider">
                            View all <ArrowRight size={14}/>
                          </button>
                        </div>
                        
                        <div className="bg-content1 border border-divider rounded-[2rem] p-6 grid grid-cols-2 gap-4">
                           {/* Doctor 1 */}
                           <div className="bg-background border border-divider rounded-2xl p-4 flex flex-col items-center text-center hover:border-default-400 transition-all cursor-pointer group">
                              <div className="relative mb-3">
                                <Avatar src="https://i.pravatar.cc/150?u=doc1" className="w-14 h-14" />
                                <div className="absolute -bottom-1 -right-1 bg-foreground text-background p-1 rounded-full shadow-md">
                                  <Star className="w-3 h-3 fill-current text-yellow-500" />
                                </div>
                              </div>
                              <h4 className="font-bold text-sm text-foreground">Dr. Jenkins</h4>
                              <p className="text-[11px] text-default-500 font-medium mt-0.5 mb-3">Cardiology</p>
                              <button className="w-full py-1.5 bg-default-100 hover:bg-default-200 rounded-lg text-xs font-semibold text-foreground transition-colors">
                                Book
                              </button>
                           </div>
            
                           {/* Doctor 2 */}
                           <div className="bg-background border border-divider rounded-2xl p-4 flex flex-col items-center text-center hover:border-default-400 transition-all cursor-pointer group">
                              <div className="relative mb-3">
                                <Avatar src="https://i.pravatar.cc/150?u=doc4" className="w-14 h-14" />
                                <div className="absolute -bottom-1 -right-1 bg-foreground text-background p-1 rounded-full shadow-md">
                                  <Star className="w-3 h-3 fill-current text-yellow-500" />
                                </div>
                              </div>
                              <h4 className="font-bold text-sm text-foreground">Dr. Wilson</h4>
                              <p className="text-[11px] text-default-500 font-medium mt-0.5 mb-3">Neurology</p>
                              <button className="w-full py-1.5 bg-default-100 hover:bg-default-200 rounded-lg text-xs font-semibold text-foreground transition-colors">
                                Book
                              </button>
                           </div>
                        </div>
                      </motion.div>
        </>
    )
}
export default Doctors;