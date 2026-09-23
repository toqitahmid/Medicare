"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Baby,
  Brain,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

const trustPoints = [
  { icon: HeartPulse, label: "Care built around you" },
  { icon: ShieldCheck, label: "Trusted medical professionals" },
  { icon: Stethoscope, label: "Better health, made simpler" },
];

const Banner = () => {
  return (
    <div className="-mt-20 w-full overflow-hidden pt-0">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative rounded-2xl mt-4 min-h-[min(82vh,820px)] w-full overflow-hidden bg-[#123b42] text-white shadow-[0_24px_70px_rgba(12,34,40,0.18)]"
      >
        <Image
          src="/assets/banner.jpg"
          alt="Medical team working together in an operating room"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-70 rounded-2xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,39,45,0.94)_0%,rgba(6,39,45,0.78)_38%,rgba(6,39,45,0.26)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#06272d]/70 to-transparent" />

        <div className="relative mx-auto flex min-h-[min(82vh,820px)] w-full max-w-none flex-col justify-end px-5 pb-12 pt-24 sm:px-10 sm:pb-16 sm:pt-28 lg:px-16 lg:pb-20 lg:pt-32">
          <p className="motion-reveal mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
            <span className="h-px w-10 bg-cyan-200" />
            Your health, our purpose
          </p>
          <h1 className="motion-reveal motion-delay-1 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl">
            Care that moves with you.
          </h1>
          <p className="motion-reveal motion-delay-2 mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Medicare brings trusted doctors, clear choices, and meaningful
            support into one calm place for every step of your care.
          </p>
          <div className="motion-reveal motion-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/nab/find-doctors"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f2a38f] px-6 py-3 text-sm font-semibold text-[#123b42] shadow-lg shadow-black/10 transition-transform hover:-translate-y-1"
            >
              Find your doctor
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Join Medicare
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="motion-reveal mx-auto mt-8 flex max-w-7xl flex-col gap-5 px-5 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-14"
      >
        <div className="max-w-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            A better way to care
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            One thoughtful platform for the whole care journey.
          </h2>
        </div>
        <div className="grid flex-1 gap-3 sm:grid-cols-3">
          {trustPoints.map(({ icon: Icon, label }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex items-center gap-3 border-t border-divider pt-4 text-sm font-medium text-default-600 transition-colors hover:text-primary"
            >
              <Icon className="h-5 w-5 shrink-0 text-primary" />
              {label}
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Banner;
