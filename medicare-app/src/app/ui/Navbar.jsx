"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { authClient } from "../lib/auth-client";

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Better Auth session hook
  const { data: session, isPending } = authClient.useSession();

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Find Doctors", href: "/nab/find-doctors" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
    ...(session ? [{ label: "Dashboard", href: "/dashboard" }] : []),
  ];

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <header className="w-full px-4 pt-4 relative z-50">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl border border-divider px-6 shadow-lg backdrop-blur-md bg-background/80 text-foreground">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black tracking-tight text-foreground hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-lg text-primary-foreground">
            +
          </div>
          <span>
            Medi<span className="text-primary">Care</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-all duration-200 ${
                  isActive
                    ? "text-primary font-bold border-b-2 border-primary pb-1"
                    : "text-default-500 hover:text-foreground font-medium"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div id="theme-toggle" className="border rounded-full px-2 pt-1">
            <ThemeToggle />
          </div>

          {!isPending && (
            <>
              {session ? (
                <Button
                  onClick={handleSignOut}
                  color="danger"
                  variant="flat"
                  size="sm"
                  className="rounded-2xl font-medium"
                >
                  Logout
                </Button>
              ) : (
                <Link
                  href="/login"
                  className="px-5 py-1.5 border rounded-2xl text-sm font-medium hover:bg-default-100 transition-colors"
                >
                  Login
                </Link>
              )}
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-default-500 hover:text-foreground focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="absolute top-24 left-4 right-4 md:hidden flex flex-col gap-4 rounded-2xl border border-divider bg-background/95 p-6 shadow-xl backdrop-blur-lg">
          {menuItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full text-lg py-2 border-b border-divider transition-colors ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-default-600 hover:text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
