import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Find Doctors", href: "/nab/find-doctors" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Register", href: "/register" },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "Twitter", href: "https://twitter.com", icon: FaTwitter },
];

const MainFooter = () => {
  return (
    <footer className="mt-auto bg-[#103b42] text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-2xl font-black tracking-tight"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-xl font-bold text-[#103b42]">
                +
              </span>
              Medi<span className="text-cyan-300">Care</span>
            </Link>
            <p className="mt-5 text-sm leading-6 text-white/70">
              Compassionate care, trusted professionals, and clearer health
              decisions in one place.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit Medicare on ${label}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-cyan-300 hover:bg-cyan-300 hover:text-[#103b42]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
              Quick links
            </h2>
            <nav
              className="mt-5 flex flex-col items-start gap-3"
              aria-label="Footer navigation"
            >
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
              Contact information
            </h2>
            <div className="mt-5 space-y-4 text-sm text-white/70">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                25 Wellness Avenue, Boston, MA 02108
              </p>
              <a
                href="tel:+18006342273"
                className="flex items-center gap-3 hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-cyan-300" />
                +1 (800) 634-2273
              </a>
              <a
                href="mailto:hello@medicare.example"
                className="flex items-center gap-3 hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-cyan-300" />
                hello@medicare.example
              </a>
            </div>
          </div>

          <div className="border-l-2 border-rose-300/70 pl-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-200">
              Emergency hotline
            </h2>
            <p className="mt-4 text-sm leading-6 text-white/70">
              For urgent medical emergencies, call your local emergency service
              immediately.
            </p>
            <a
              href="tel:911"
              className="mt-4 inline-flex items-center gap-2 text-2xl font-semibold text-white hover:text-rose-200"
            >
              <Phone className="h-5 w-5" />
              911
            </a>
            <p className="mt-2 flex items-center gap-2 text-xs text-white/50">
              <Clock3 className="h-3.5 w-3.5" />
              Available 24 hours a day
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Medicare. All rights reserved.</p>
          <p>Care that moves with you.</p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
