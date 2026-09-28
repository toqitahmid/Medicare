"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
    { label: "Find Doctors", href: "/doctors" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
    ...(session ? [{ 
      label: "Dashboard", 
      href: session.user?.role === "admin" 
        ? "/adminDashboard/overView" 
        : session.user?.role === "doctor" 
          ? "/doctorDashboard/overView" 
          : "/patientDashboard/overView" 
    }] : []),
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
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full px-2 pt-2 md:px-4 md:pt-4"
    >
      <nav className="mx-auto flex h-14 md:h-16 max-w-6xl items-center justify-between rounded-2xl border border-divider/80 bg-background/85 px-3 md:px-5 text-foreground shadow-[0_12px_35px_rgba(18,59,66,0.12)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_16px_42px_rgba(18,59,66,0.16)] sm:px-6">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 md:gap-2.5 text-xl md:text-2xl font-black tracking-tight text-foreground hover:opacity-90 transition-opacity"
        >
          <div className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-primary-500 font-bold text-base md:text-lg text-primary-foreground shadow-md shadow-primary/30">
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
                className={`relative px-1 py-1 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-primary"
                    : "text-default-500 hover:text-foreground"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute -bottom-[6px] left-0 right-0 h-[2px] rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 md:gap-3">
          <div id="theme-toggle" className="border rounded-full px-1.5 py-0.5 md:px-2 md:pt-1">
            <ThemeToggle />
          </div>

          {!isPending && (
            <div className="hidden md:flex items-center">
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
                  className="rounded-full border border-primary/30 px-5 py-2 text-sm font-semibold text-primary shadow-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Login
                </Link>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1.5 text-default-500 hover:text-foreground focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-24 left-4 right-4 md:hidden flex flex-col gap-4 rounded-2xl border border-divider bg-background/95 p-6 shadow-xl backdrop-blur-lg"
        >
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

          {/* Mobile Authentication Buttons */}
          {!isPending && (
            <div className="mt-2 pt-4 border-t border-divider">
              {session ? (
                <Button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleSignOut();
                  }}
                  color="danger"
                  variant="flat"
                  className="w-full rounded-xl font-medium py-3 text-base"
                >
                  Logout
                </Button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-primary py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </motion.div>
      )}
    </motion.header>
  );
}
