"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, FileCheck } from "lucide-react";

export default function PaymentHistory({ payments = [] }) {
  // Extract latest payment details for the top card safely
  const latestPayment =
    Array.isArray(payments) && payments.length > 0
      ? payments[payments.length - 1]
      : null;

  // Helper to format ISO Date strings safely
  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Payment History & Billing
        </h2>
        <p className="text-xs text-slate-500">
          Track consultation fees, subscription plans, and invoice history
        </p>
      </div>

      {/* Summary Card */}
      <div className="grid grid-cols-1">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Active Membership
            </p>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize mt-1">
              {latestPayment?.planId
                ? `${latestPayment.planId} Plan`
                : "No Active Plan"}
            </h3>
            <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
              {latestPayment
                ? `Subscribed on ${formatDate(latestPayment.createdAt)}`
                : "Inactive"}
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <ShieldCheck size={22} />
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck className="text-blue-600" size={18} /> Invoices &
            Receipts
          </h3>
          <span className="text-xs text-slate-500">
            Showing {payments.length} transaction
            {payments.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-3 rounded-l-xl">Patient Email</th>
                <th className="p-3">Plan Name</th>
                <th className="p-3">Date</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {payments.length > 0 ? (
                payments.map((tx) => (
                  <tr
                    key={tx._id?.toString() || tx._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="p-3 font-bold text-slate-900 dark:text-white">
                      {tx.email}
                    </td>
                    <td className="p-3">
                      <p className="font-semibold text-slate-900 dark:text-white capitalize">
                        {tx.planId}
                      </p>
                    </td>
                    <td className="p-3 text-slate-500">
                      {formatDate(tx.createdAt)}
                    </td>
                    <td className="p-3 text-slate-500 text-center">Stripe</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 inline-flex items-center gap-1">
                        <CheckCircle2 size={10} /> Paid
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-400">
                    No payment records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
