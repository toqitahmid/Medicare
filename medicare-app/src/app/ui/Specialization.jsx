import Link from "next/link";
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
      <section className="border-y border-divider bg-default-50/60 px-4 py-12 sm:px-6 sm:py-16">
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
            {specializations.map(({ icon: Icon, name }) => (
              <Link
                key={name}
                href={`/nab/find-doctors?specialization=${name}`}
                className="group flex items-center justify-between border border-divider bg-background rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Specialization;
