"use client";

import React from "react";
import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { Users, UserPlus, CalendarCheck, Star } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from "recharts";

export default function OverviewClient({ data }) {
  const stats = [
    { label: "Total Patients", value: data.totalPatients, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+8% this month" },
    { label: "Total Doctors", value: data.totalDoctors, icon: UserPlus, color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "+12 this month" },
    { label: "Total Appointments", value: data.totalAppointments, icon: CalendarCheck, color: "text-purple-500", bg: "bg-purple-500/10", trend: "145 this week" },
    { label: "Avg Doctor Rating", value: data.avgRating, icon: Star, color: "text-warning", bg: "bg-warning/10", trend: "Top 10%" },
  ];

  return (
    <div className="w-full space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Control Panel</h1>
        <p className="text-default-500 mt-1">Platform overview and system status.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }}>
            <Card className="p-6 border border-default-100/50 bg-background/60 backdrop-blur-xl shadow-medium hover:shadow-large transition-all duration-300 rounded-[2rem]">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-4 rounded-[1.25rem] ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-xs font-semibold text-default-500">{stat.trend}</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
              <p className="text-default-500 text-sm font-medium mt-1">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="p-8 border border-default-100/50 bg-background/60 backdrop-blur-xl shadow-medium rounded-[2.5rem]">
              <h2 className="text-xl font-bold text-foreground mb-6 pl-2">Appointments Over Time</h2>
              <div className="h-72 w-full -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.appointmentsChart} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.1} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dx={-10} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: 'rgba(24, 24, 27, 0.9)', borderRadius: '24px', padding: '12px 20px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)' }}
                      itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                      cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                    />
                    <Area type="natural" dataKey="appointments" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#colorPv)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="p-8 border border-default-100/50 bg-background/60 backdrop-blur-xl shadow-medium rounded-[2.5rem]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground pl-2">Top Rated Doctors</h2>
              </div>
              <div className="space-y-4">
                {data.topDoctors.map((doc, i) => {
                  const initial = doc.name.replace("Dr. ", "").charAt(0);
                  return (
                    <div key={i} className="flex items-center justify-between p-4 rounded-3xl hover:bg-default-100/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-sm">
                          {initial}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-foreground">{doc.name}</h4>
                          <div className="flex items-center text-xs text-warning mt-1">
                            <Star className="w-3 h-3 fill-current mr-1" />
                            <span className="font-medium text-foreground">{doc.rating} / 5.0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
