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
  { icon: HeartPulse, name: "Cardiology" },
  { icon: Brain, name: "Neurology" },
  { icon: Activity, name: "Orthopedic" },
  { icon: Baby, name: "Pediatrics" },
  { icon: Sparkles, name: "Dermatology" },
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
              href="/nab/find-doctors"
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
                  href={`/nab/find-doctors?specialization=${name}`}
                  className="group flex items-center justify-between rounded-xl border border-divider bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_14px_28px_rgba(18,59,66,0.1)]"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {name}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-default-400 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
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
