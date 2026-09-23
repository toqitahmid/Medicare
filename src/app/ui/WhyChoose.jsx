"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  ClipboardPlus,
  Headphones,
  ShieldCheck,
} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Trusted doctors",
    description:
      "Meet verified professionals who put your needs and comfort first.",
  },
  {
    icon: CalendarCheck,
    title: "Effortless appointments",
    description:
      "Find a time that works for you and keep every visit organized.",
  },
  {
    icon: ClipboardPlus, // Updated reference
    title: "Connected care",
    description:
      "Keep your health journey clear with support that follows along.",
  },
  {
    icon: Headphones,
    title: "Here when needed",
    description:
      "Get helpful guidance whenever questions come up between visits.",
  },
];

const WhyChoose = () => {
  return (
    <section className="motion-reveal px-5 py-14 sm:px-10 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
        <div className="max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Why Medicare
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            Healthcare should feel simpler.
          </h2>
          <p className="mt-5 text-base leading-7 text-default-600">
            From your first search to your next follow-up, Medicare brings the
            people and tools you need into one thoughtful experience.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-divider pt-6">
            <div>
              <p className="text-3xl font-semibold tracking-tight text-primary">
                24/7
              </p>
              <p className="mt-1 text-sm text-default-600">Care guidance</p>
            </div>
            <div>
              <p className="text-3xl font-semibold tracking-tight text-primary">
                1 place
              </p>
              <p className="mt-1 text-sm text-default-600">For your care</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {reasons.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group rounded-xl border border-divider bg-default-50/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_14px_28px_rgba(18,59,66,0.08)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:rotate-6">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-default-600">
                {description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
