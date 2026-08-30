"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquareText, Phone, Send } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    title: "Visit us",
    value: "25 Wellness Avenue, Boston, MA 02108",
  },
  {
    icon: Phone,
    title: "Call us",
    value: "+1 (800) 634-2273",
  },
  {
    icon: Mail,
    title: "Email us",
    value: "hello@medicare.example",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ContactUsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      <motion.section
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]"
      >
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_26px_70px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_26px_70px_rgba(2,6,23,0.5)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-300">
            Contact us
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            We’re here to help.
          </h1>
          <p className="mt-4 max-w-md text-base leading-7 text-slate-600 dark:text-slate-300">
            Whether you’re looking for care guidance, support with appointments,
            or a quick question about the platform, our team is ready to help.
          </p>

          <div className="mt-8 space-y-4">
            {contactDetails.map(({ icon: Icon, title, value }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45 }}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/80"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm dark:bg-slate-700 dark:text-emerald-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-300">
                    {title}
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                    {value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-[30px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-6 text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)] dark:border-slate-700 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 sm:p-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
              <MessageSquareText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-300">
                Send a message
              </p>
              <h2 className="text-2xl font-semibold text-white">
                Let’s start the conversation
              </h2>
            </div>
          </div>

          <form className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm text-slate-200">
                <span className="mb-2 block">Full name</span>
                <input
                  type="text"
                  placeholder="Alex Morgan"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-emerald-400 focus:bg-white/10"
                />
              </label>
              <label className="block text-sm text-slate-200">
                <span className="mb-2 block">Email</span>
                <input
                  type="email"
                  placeholder="alex@email.com"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-emerald-400 focus:bg-white/10"
                />
              </label>
            </div>

            <label className="block text-sm text-slate-200">
              <span className="mb-2 block">Subject</span>
              <input
                type="text"
                placeholder="How can we help?"
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-emerald-400 focus:bg-white/10"
              />
            </label>

            <label className="block text-sm text-slate-200">
              <span className="mb-2 block">Message</span>
              <textarea
                rows={5}
                placeholder="Tell us a little about what you need..."
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-emerald-400 focus:bg-white/10"
              />
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-900 transition-transform duration-200 hover:-translate-y-0.5"
            >
              Send message
              <Send className="h-4 w-4" />
            </button>
          </form>
        </motion.div>
      </motion.section>
    </div>
  );
}
