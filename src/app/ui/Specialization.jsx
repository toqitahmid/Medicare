"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Baby,
  Brain,
  HeartPulse,
  Sparkles,
} from "lucide-react";
const specializations = [
  { icon: HeartPulse, name: "Cardiologist" },
  { icon: Brain, name: "Neurologist" },
  { icon: Activity, name: "Orthopedic" },
  { icon: Baby, name: "Pediatrics" },
  { icon: Sparkles, name: "Dermatologist" },
];

const Specialization = () => {
  return (
    <div>
      <section className="motion-reveal border-y border-divider px-5 py-14 sm:px-10 sm:py-20 dark:bg-default-50/20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Find focused care
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                Medical specializations
              </h2>
            </div>
            <Link
              href="/doctors"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
            >
              Explore all doctors
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {specializations.map(({ icon: Icon, name }, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Link
                  href={`/doctors?specialization=${name}`}
                  className="group flex items-center justify-between rounded-2xl border border-divider/50 bg-background/60 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_20px_40px_rgba(18,59,66,0.08)]"
                >
                  <span className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-[15px] font-bold text-foreground group-hover:text-primary transition-colors">
                      {name}
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 text-default-300 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-primary" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Specialization;
