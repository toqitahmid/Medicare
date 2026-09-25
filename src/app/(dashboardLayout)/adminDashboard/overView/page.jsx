"use client";

import React from "react";
import { Card, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Activity, Users, Shield, Server, ArrowUpRight } from "lucide-react";

export default function AdminOverviewDashboard() {
  const stats = [
    { label: "Active Users", value: "24.5K", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+12%" },
    { label: "System Health", value: "99.9%", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "Optimal" },
    { label: "Security Alerts", value: "2", icon: Shield, color: "text-warning", bg: "bg-warning/10", trend: "Needs Attention" },
    { label: "Server Load", value: "42%", icon: Server, color: "text-purple-500", bg: "bg-purple-500/10", trend: "Stable" },
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
            <Card className="p-6 border border-default-100 bg-background/60 backdrop-blur-md shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg}`}>
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
            <Card className="p-6 border border-default-100 bg-background/60 backdrop-blur-md shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-6">Platform Activity</h2>
              <div className="h-64 flex items-end gap-2 pb-4 border-b border-default-100">
                {/* Mock Chart bars */}
                {[40, 60, 30, 80, 50, 90, 70, 45, 65, 85, 55, 75].map((val, i) => (
                  <div key={i} className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm transition-all relative group cursor-pointer" style={{ height: `${val}%` }}>
                     <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs py-1 px-2 rounded font-bold transition-opacity">
                        {val}k
                     </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs font-medium text-default-400 uppercase tracking-wider">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="p-6 border border-default-100 bg-background/60 backdrop-blur-md shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-foreground">Recent Registrations</h2>
              </div>
              <div className="space-y-4">
                {['Dr. Mark Wilson', 'Sarah Jenkins', 'City General Hospital', 'Dr. Emily Chen'].map((name, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-default-100/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-sm">
                        {name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-foreground">{name}</h4>
                        <p className="text-xs text-default-500">Joined 2 hours ago</p>
                      </div>
                    </div>
                    <Button isIconOnly size="sm" variant="light" className="text-default-400">
                       <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}