"use client";
import React from "react";
import { Card, Chip, Avatar } from "@heroui/react";
import { motion } from "framer-motion";
import { DollarSign, ArrowUpRight, TrendingUp, CreditCard } from "lucide-react";

export default function PaymentsClient({ payments = [] }) {
    const totalAmount = payments.reduce((sum, p) => sum + (Number(p.amount || p.fee) || 0), 0);
    const totalTransactions = payments.length;

    return (
        <div className="w-full min-h-screen text-foreground bg-background font-sans p-6 md:p-10 space-y-8">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    System Payments
                </h1>
                <p className="text-default-500">Monitor all financial transactions across the platform.</p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card className="p-8 border border-default-100 bg-background/60 backdrop-blur-xl shadow-medium rounded-[2rem] flex flex-row justify-between items-center h-full">
                        <div>
                            <p className="text-default-500 font-medium mb-1">Total Revenue</p>
                            <h3 className="text-4xl font-bold text-foreground">${totalAmount.toLocaleString()}</h3>
                            <div className="flex items-center gap-2 mt-3">
                                <Chip size="sm" color="success" variant="flat">
                                    <span className="flex items-center gap-1">
                                        <ArrowUpRight className="w-3 h-3"/>
                                        Up 14%
                                    </span>
                                </Chip>
                                <span className="text-xs text-default-400">vs last month</span>
                            </div>
                        </div>
                        <div className="p-6 rounded-[1.5rem] bg-purple-500/10 text-purple-500 flex-shrink-0">
                            <TrendingUp className="w-10 h-10" />
                        </div>
                    </Card>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Card className="p-8 border border-default-100 bg-background/60 backdrop-blur-xl shadow-medium rounded-[2rem] flex flex-row justify-between items-center h-full">
                        <div>
                            <p className="text-default-500 font-medium mb-1">Total Transactions</p>
                            <h3 className="text-4xl font-bold text-foreground">{totalTransactions}</h3>
                            <div className="flex items-center gap-2 mt-3">
                                <span className="text-xs text-default-400">Successful payments processed</span>
                            </div>
                        </div>
                        <div className="p-6 rounded-[1.5rem] bg-blue-500/10 text-blue-500 flex-shrink-0">
                            <CreditCard className="w-10 h-10" />
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Data Table Area */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="p-8 border border-default-100 bg-background/60 backdrop-blur-xl shadow-medium rounded-[2rem]">
                    <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-foreground">Recent Transactions</h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-default-200">
                                    <th className="pb-4 pt-2 px-4 font-semibold text-default-500 text-sm">Transaction ID</th>
                                    <th className="pb-4 pt-2 px-4 font-semibold text-default-500 text-sm">Patient</th>
                                    <th className="pb-4 pt-2 px-4 font-semibold text-default-500 text-sm">Amount</th>
                                    <th className="pb-4 pt-2 px-4 font-semibold text-default-500 text-sm">Date</th>
                                    <th className="pb-4 pt-2 px-4 font-semibold text-default-500 text-sm">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.length > 0 ? payments.map((p, idx) => (
                                    <tr key={p._id || idx} className="border-b border-default-100 hover:bg-default-50/50 transition-colors">
                                        <td className="py-4 px-4">
                                            <span className="text-xs font-mono text-default-500 bg-default-100 px-2 py-1 rounded-md">
                                                {p.transactionId || p._id?.substring(0, 10) || `TRX-${1000 + idx}`}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar src={`https://i.pravatar.cc/150?u=${p.patientId || idx}`} size="sm" />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold">{p.patientName || p.patientEmail || "Unknown Patient"}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="font-semibold text-foreground">${p.amount || p.fee || 0}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm font-medium">{new Date(p.createdAt || p.paymentDate).toLocaleDateString()}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <Chip size="sm" color="success" variant="flat" className="capitalize font-medium">
                                                {p.status || p.paymentStatus || "Paid"}
                                            </Chip>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="py-8 text-center text-default-500">
                                            No payment records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
