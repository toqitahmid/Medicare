"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldCheck, HeartPulse } from "lucide-react";

const DEFAULT_MESSAGES = [
  "Connecting to Medicare network...",
  "Synchronizing clinical records...",
  "Checking doctor availability...",
  "Securing your healthcare portal...",
  "Loading personalized experience...",
];

export default function MedicareLoader({
  title = "MediCare",
  subtitle,
  variant = "fullscreen", // "fullscreen" | "inline" | "card"
  showSecurityBadge = true,
}) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % DEFAULT_MESSAGES.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const currentMessage = subtitle || DEFAULT_MESSAGES[msgIndex];

  const containerClasses =
    variant === "fullscreen"
      ? "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl px-4 py-8 overflow-hidden"
      : "w-full min-h-[400px] flex items-center justify-center p-4 md:p-8 relative";

  return (
    <div className={containerClasses}>
      {/* Ambient background glow orbs */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-cyan-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-teal-500/20 blur-3xl -translate-y-12 translate-x-16"
        />
      </div>

      {/* Main Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 md:p-10 rounded-3xl border border-divider/70 bg-background/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(16,59,66,0.15)] flex flex-col items-center text-center"
      >
        {/* Animated Medical Cross Badge with Pulsing Rings */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Outermost pulsing ring */}
          <motion.div
            animate={{
              scale: [1, 1.45, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute w-24 h-24 rounded-full border-2 border-cyan-400/40"
          />

          {/* Secondary glowing ring */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.8, 0.2, 0.8],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
            className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-teal-500/20 to-cyan-500/20 border border-teal-500/30"
          />

          {/* Central Logo Symbol */}
          <motion.div
            animate={{
              rotate: [0, 6, -6, 0],
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#103b42] via-[#0d6e77] to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/25 border border-white/20"
          >
            <span className="text-white text-2xl font-semibold leading-none select-none">
              +
            </span>

            {/* Micro heart pulse icon in bottom corner */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-cyan-400 text-[#103b42] flex items-center justify-center shadow-sm">
              <HeartPulse className="w-3 h-3 animate-pulse" />
            </div>
          </motion.div>
        </div>

        {/* Brand Name */}
        <div className="space-y-1 mb-3">
          <h2 className="text-xl md:text-2xl font-semibold tracking-normal text-foreground">
            {title === "MediCare" ? (
              <>
                Medi<span className="text-cyan-500 dark:text-cyan-400">Care</span>
              </>
            ) : (
              title
            )}
          </h2>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-300 text-[11px] font-medium">
            <Activity className="w-3 h-3 animate-pulse text-teal-500" />
            Health Platform
          </div>
        </div>

        {/* Dynamic Heartbeat / EKG Pulse Wave SVG */}
        <div className="w-full max-w-[260px] h-10 my-3 relative overflow-hidden flex items-center justify-center">
          <svg
            className="w-full h-full text-cyan-500 dark:text-cyan-400"
            viewBox="0 0 260 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background faint guide track */}
            <path
              d="M 10 20 L 70 20 L 80 10 L 90 32 L 100 4 L 110 36 L 120 18 L 130 20 L 250 20"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Glowing active tracing heartbeat path */}
            <motion.path
              d="M 10 20 L 70 20 L 80 10 L 90 32 L 100 4 L 110 36 L 120 18 L 130 20 L 250 20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0.1, pathOffset: 0 }}
              animate={{
                pathLength: [0.15, 0.45, 0.15],
                pathOffset: [0, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="drop-shadow-[0_0_4px_rgba(6,182,212,0.6)]"
            />
          </svg>
        </div>

        {/* Dynamic Message Cycler */}
        <div className="h-7 flex items-center justify-center mb-5">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-xs md:text-sm font-medium text-default-600 dark:text-default-400"
            >
              {currentMessage}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Sleek Progress Track with Beam Animation */}
        <div className="w-full max-w-[240px] h-1.5 rounded-full bg-default-200/50 dark:bg-default-100/30 overflow-hidden relative mb-6">
          <motion.div
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1/2 h-full rounded-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_8px_rgba(6,182,212,0.6)]"
          />
        </div>

        {/* Security & Verification Tag */}
        {showSecurityBadge && (
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-default-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>256-bit Encrypted HIPAA Healthcare Gateway</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
