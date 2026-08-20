import Link from "next/link";
import Image from "next/image";
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
    <div className="overflow-hidden mt-10">
      {/* Updated section: Removed mx margins, mt margin, max-w limits, and rounded corners */}
      <section className="relative w-full min-h-[min(72vh,680px)] overflow-hidden bg-[#123b42] text-white">
        <Image
          src="/assets/banner.jpg"
          alt="Medical team working together in an operating room"
          fill
          priority
          className="absolute inset-0 h-full w-full object-cover object-center opacity-65"
        />
        <div className="absolute inset-0 bg-[#06272d]/65" />

        {/* Content container remains constrained to match the rest of your site layout */}
        <div className="relative mx-auto flex min-h-[min(72vh,680px)] max-w-7xl flex-col justify-end  py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-20">
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
            <span className="h-px w-10 bg-cyan-200" />
            Your health, our purpose
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl">
            Care that moves with you.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Medicare brings trusted doctors, clear choices, and meaningful
            support into one calm place for every step of your care.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/nab/find-doctors"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#123b42] transition-transform hover:-translate-y-0.5"
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
      </section>

      <section className="mx-4 flex max-w-7xl flex-col gap-5 py-10 sm:mx-6 sm:py-14 lg:mx-auto lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            A better way to care
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            One thoughtful platform for the whole care journey.
          </h2>
        </div>
        <div className="grid flex-1 gap-3 sm:grid-cols-3">
          {trustPoints.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 border-t border-divider pt-4 text-sm font-medium text-default-600"
            >
              <Icon className="h-5 w-5 shrink-0 text-primary" />
              {label}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Banner;
