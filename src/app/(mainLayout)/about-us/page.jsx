"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: HeartHandshake,
    title: "Patient-first care",
    description:
      "We design every experience around clarity, warmth, and trust so patients always feel informed and supported.",
  },
  {
    icon: ShieldCheck,
    title: "Verified specialists",
    description:
      "Only trusted professionals are listed, making it easier to find the right expertise for your health needs.",
  },
  {
    icon: Users,
    title: "Connected journeys",
    description:
      "From discovery to follow-up, we keep each step organized so care feels simple and continuous.",
  },
];

const stats = [
  { value: "8k+", label: "patients supported" },
  { value: "180+", label: "care experts" },
  { value: "96%", label: "satisfaction rate" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function AboutUsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      <motion.section
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-emerald-50 shadow-[0_32px_80px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950 dark:shadow-[0_32px_80px_rgba(2,6,23,0.6)]"
      >
        <div className="grid gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-16">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              About Medicare
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              Thoughtful healthcare, designed for real life.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
              We are building a calmer, more human healthcare experience—one
              that helps patients find trusted doctors, understand their
              choices, and stay connected to their care from anywhere.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/nab/find-doctors"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 dark:bg-emerald-400 dark:text-slate-950"
              >
                Find a doctor
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                Talk to us
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-emerald-200/70 blur-3xl dark:bg-emerald-500/20" />
            <div className="absolute -right-6 bottom-12 h-32 w-32 rounded-full bg-cyan-200/60 blur-3xl dark:bg-cyan-500/20" />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_24px_80px_rgba(2,6,23,0.7)]"
            >
              <div className="rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                      Care promise
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                      Better care starts with trust.
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-500 dark:bg-emerald-500/15 dark:text-emerald-300">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/80"
                    >
                      <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="mt-16"
      >
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
              Our values
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              A care experience built around people.
            </h2>
          </div>
          <div className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 sm:block">
            Human-centered by design
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {values.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_22px_50px_rgba(15,23,42,0.05)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_22px_50px_rgba(2,6,23,0.4)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {description}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="mt-16 rounded-[30px] border border-slate-200 bg-slate-900 px-6 py-8 text-white shadow-[0_28px_60px_rgba(15,23,42,0.16)] dark:border-slate-700 dark:bg-slate-950 sm:px-8 lg:px-10"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Why choose us
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Compassionate support, practical care.
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 dark:border-slate-700 dark:bg-slate-900/80">
            <Award className="h-4 w-4 text-emerald-300" />
            Trusted by modern healthcare families
          </div>
        </div>
      </motion.section>
    </div>
  );
}
