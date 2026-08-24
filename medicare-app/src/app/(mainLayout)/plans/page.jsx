// app/pricing/page.jsx
"use client";

import { useState } from "react";

const plans = [
  {
    id: "starter",
    name: "Starter Care",
    price: 20,
    appointments: 3,
    unitPrice: "$6.67/visit",
    description:
      "Perfect for quick routine check-ups and general consultations.",
    isPopular: false,
    features: [
      "3 Doctor Appointments",
      "General Physician Access",
      "Digital Prescription Downloads",
      "Standard Support",
      "Valid for 30 Days",
    ],
  },
  {
    id: "standard",
    name: "Standard Health",
    price: 30,
    appointments: 7,
    unitPrice: "$4.28/visit",
    description:
      "Best value for regular health monitoring and specialist visits.",
    isPopular: true,
    badgeText: "Most Popular",
    features: [
      "7 Doctor Appointments",
      "General & Specialist Doctors",
      "Priority Appointment Slots",
      "Lab Report Analysis",
      "24/7 Live Chat Support",
      "Valid for 60 Days",
    ],
  },
  {
    id: "family",
    name: "Family & Max",
    price: 40,
    appointments: 12,
    unitPrice: "$3.33/visit",
    description: "Ideal for chronic care management or family health coverage.",
    isPopular: false,
    features: [
      "12 Doctor Appointments",
      "All Specialists & Consultants",
      "Instant VIP Booking",
      "Complete Health Tracking",
      "Free Follow-up Reviews",
      "Valid for 90 Days",
    ],
  },
];

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState("standard");

  return (
    <div className="min-h-screen py-16 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-[var(--bg-subtle)] px-3 py-1 rounded-full border border-[var(--border-color)]">
          Medicare Packages
        </span>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
          Simple, Transparent Healthcare Pricing
        </h1>
        <p className="mt-3 text-[var(--text-subtle)]">
          Pre-book doctor appointment bundles to save on consultation fees.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col justify-between rounded-2xl p-6 bg-[var(--bg-card)] border transition-all ${
              plan.isPopular
                ? "border-teal-500 shadow-lg shadow-teal-500/10 scale-105 z-10"
                : "border-[var(--border-color)]"
            }`}
          >
            {plan.isPopular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {plan.badgeText}
              </span>
            )}

            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{plan.name}</h2>
                <span className="text-xs font-medium text-[var(--text-subtle)] bg-[var(--bg-subtle)] border border-[var(--border-color)] px-2.5 py-1 rounded">
                  {plan.unitPrice}
                </span>
              </div>

              <p className="mt-2 text-sm text-[var(--text-subtle)]">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">${plan.price}</span>
                <span className="text-xs text-[var(--text-subtle)]">
                  / package
                </span>
              </div>

              {/* Package Highlight */}
              <div className="mt-3 inline-flex items-center gap-1.5 bg-[var(--bg-subtle)] text-teal-600 dark:text-teal-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-[var(--border-color)]">
                {plan.appointments} Appointments Included
              </div>

              {/* Features List */}
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm gap-2">
                    <svg
                      className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button */}
            <form action="/api/checkout_sessions" method="POST">
              <section>
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  type="submit"
                  role="link"
                  className={`mt-8 w-full py-3 rounded-xl font-semibold text-sm transition-opacity ${
                    plan.isPopular
                      ? "bg-teal-600 hover:opacity-90 text-white"
                      : "bg-[var(--text-main)] text-[var(--bg-main)] hover:opacity-90"
                  }`}
                >
                  Book {plan.appointments} for ${plan.price}
                </button>
              </section>
            </form>
            {/* <button
              onClick={() => setSelectedPlan(plan.id)}
              className={`mt-8 w-full py-3 rounded-xl font-semibold text-sm transition-opacity ${
                plan.isPopular
                  ? "bg-teal-600 hover:opacity-90 text-white"
                  : "bg-[var(--text-main)] text-[var(--bg-main)] hover:opacity-90"
              }`}
            >
              Book {plan.appointments} for ${plan.price}
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
}
