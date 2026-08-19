"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Find Doctors", href: "/find-doctors" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="w-full px-4 pt-4 relative z-50">
      {/* Floating Navbar Container */}
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl border border-divider px-6 shadow-lg backdrop-blur-md bg-background/80 text-foreground">
        {/* Brand / Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black tracking-tight text-foreground hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-lg text-primary-foreground">
            +
          </div>
          <span>
            Doc<span className="text-primary">Care</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-default-500 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Action Area: Theme Toggle & Login */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Switch / Button Placeholder */}
          <div id="theme-toggle" className="border-2 rounded-full  px-2 pt-1 ">
            <ThemeToggle></ThemeToggle>
          </div>

          <Link href={'/login'} className="px-5 py-1 mb-1 border-2 rounded-2xl cursor-pointer" color="primary">
            Login
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className="md:hidden p-2 text-default-500 hover:text-foreground focus:outline-none transition-colors"
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

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="absolute top-24 left-4 right-4 md:hidden flex flex-col gap-4 rounded-2xl border border-divider bg-background/95 p-6 shadow-xl backdrop-blur-lg animate-in fade-in slide-in-from-top-4 duration-200">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={`w-full text-lg py-2 border-b border-divider transition-colors ${
                  isActive
                    ? "text-primary font-semibold"
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
