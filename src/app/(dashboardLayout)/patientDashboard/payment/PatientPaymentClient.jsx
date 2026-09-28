"use client";
import React from "react";
import { Chip } from "@heroui/react";
import { Calendar, CreditCard, DollarSign, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function PatientPaymentClient({ payments }) {
  if (!payments || payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="bg-default-100 p-8 rounded-full mb-6">
          <CreditCard className="w-16 h-16 text-default-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Payment History</h2>
        <p className="text-default-500 text-center max-w-md">
          You haven't made any payments yet. When you pay for an appointment, the receipts will appear here!
        </p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Payment History
        </h1>
        <p className="text-default-500 text-lg">View your past transactions and receipts.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full overflow-hidden rounded-[2rem] border border-default-200 bg-background/60 backdrop-blur-xl shadow-xl shadow-default-200/50"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-default-100/80 text-default-600 border-b border-default-200 text-sm uppercase tracking-wider">
                <th className="px-6 py-5 font-bold rounded-tl-[2rem]">Doctor</th>
                <th className="px-6 py-5 font-bold">Transaction ID</th>
                <th className="px-6 py-5 font-bold">Date Paid</th>
                <th className="px-6 py-5 font-bold">Amount</th>
                <th className="px-6 py-5 font-bold rounded-tr-[2rem]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-default-100">
              {payments.map((payment, index) => (
                <motion.tr 
                  key={payment._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group hover:bg-default-50/50 transition-colors duration-200"
                >
                  {/* Doctor Column */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {payment.doctorName ? payment.doctorName.charAt(0).toUpperCase() : (payment.doctorId ? payment.doctorId.charAt(0).toUpperCase() : "D")}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm max-w-[150px] truncate">
                          {payment.doctorName || payment.doctorId}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Transaction ID Column */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-xs font-mono bg-default-100 p-2 rounded-lg max-w-[180px] truncate">
                      {payment.transactionId}
                    </div>
                  </td>

                  {/* Date Column */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-default-600">
                      <Calendar className="w-4 h-4 text-primary" />
                      {formatDate(payment.paymentDate || payment.createdAt)}
                    </div>
                  </td>

                  {/* Amount Column */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1 font-bold text-foreground">
                      <DollarSign className="w-4 h-4 text-default-500" />
                      {payment.amount}
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-5">
                    <Chip
                      color="success"
                      variant="flat"
                      size="sm"
                      className="font-bold uppercase tracking-wider text-[10px] shadow-sm"
                    >
                      <div className="flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Successful
                      </div>
                    </Chip>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
