"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Avatar } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

import {
    LayoutGrid,
    Calendar,
    CreditCard,
    Star,
    Clock,
    ClipboardList,
    Pill,
    UserCog,
    Users,
} from "lucide-react";
import { Menu, X } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";

// Nav items configuration
const patientNavItems = [
    {
        label: "Overview",
        href: "/patientDashboard/overView",
        icon: LayoutGrid,
    },
    {
        label: "My Appointments",
        href: "/patientDashboard/appointments",
        icon: Calendar,
    },
    {
        label: "Payment History",
        href: "/patientDashboard/payment",
        icon: CreditCard,
    },
    {
        label: "My Reviews",
        href: "/patientDashboard/reviews",
        icon: Star,
    },
];
const doctorNavItems = [
    {
        label: "Overview",
        href: "/doctorDashboard/overView",
        icon: LayoutGrid,
    },
    {
        label: "Appointment Requests",
        href: "/doctorDashboard/appointments",
        icon: ClipboardList,
    },
    {
        label: "Prescription Management",
        href: "/doctorDashboard/prescriptions",
        icon: Pill,
    },
    {
        label: "Profile Management",
        href: "/doctorDashboard/profile",
        icon: UserCog,
    },
    {
        label: "My Payments",
        href: "/doctorDashboard/payment",
        icon: Clock,
    },
];
const adminNavItems = [
    {
        label: "Overview",
        href: "/adminDashboard/overView",
        icon: LayoutGrid,
    },
    {
        label: "Manage Users",
        href: "/adminDashboard/users",
        icon: Users,
    },
    {
        label: "Appointments",
        href: "/adminDashboard/appointments",
        icon: Calendar,
    },
    {
        label: "Reviews",
        href: "/adminDashboard/reviews",
        icon: Star,
    },
    {
        label: "Payments",
        href: "/adminDashboard/payments",
        icon: CreditCard,
    },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const onOpenChange = (open) => setIsOpen(open);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const navItems = user?.role === "admin" ? adminNavItems : user?.role === "doctor" ? doctorNavItems : patientNavItems;

    // Get the current pathname from Next.js navigation hook
    const pathname = usePathname();

    // Helper function to check if the path is active
    const isItemActive = (itemHref) => {
        return pathname === itemHref;
    };

    // Render function for the navigation links
    const renderNavLinks = () => (
        <nav className="flex-1 space-y-1 w-full">
            {navItems.map((item) => {
                const isActive = isItemActive(item.href);

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => onOpenChange(false)}
                        className={`flex items-center justify-between w-[calc(100%-16px)] mx-2 py-3 px-4 rounded-xl transition-all duration-300 group relative ${isActive
                            ? "bg-primary/10 text-primary font-semibold shadow-sm"
                            : "text-default-500 hover:bg-default-100/50 hover:text-foreground"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon
                                className={`w-5 h-5 transition-transform duration-300 ${isActive ? "text-primary" : "text-default-400 group-hover:scale-110 group-hover:text-foreground"}`}
                            />
                            <span className="text-[14px] tracking-wide">
                                {item.label}
                            </span>
                        </div>

                        {/* Active indicator */}
                        {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 bg-primary h-1/2 rounded-r-md shadow-sm" />
                        )}
                    </Link>
                );
            })}
        </nav>
    );

    // Render function for the branding and User profile card
    const renderHeaderAndUser = () => (
        <div className="px-6 pt-6 pb-4 w-full">
            {/* Brand / Logo Section */}
            <Link
                href="/"
                className="flex items-center gap-2.5 text-2xl font-black tracking-tight text-foreground hover:opacity-90 transition-opacity mb-5"
            >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-primary-500 font-bold text-lg text-primary-foreground shadow-md shadow-primary/30">
                    +
                </div>
                <span>
                    Medi<span className="text-primary">Care</span>
                </span>
            </Link>

            {/* User Card Layout */}
            <div className="flex flex-col items-start mb-6">
                
                {/* Premium Account Badge */}
                <span className="text-[10px] font-bold tracking-wider text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full uppercase shadow-sm">
                    {user?.role} Account
                </span>
            </div>
        </div>
    );

    return (
        <>
            {/* ========================================================= */}
            {/* 1. DESKTOP SIDEBAR (Visible on md screens and up)        */}
            {/* ========================================================= */}
            <aside className="hidden md:flex flex-col w-[280px] shrink-0 h-screen bg-content1 text-foreground sticky top-0 border-r border-divider">
                {renderHeaderAndUser()}
                <div className="mt-4 flex-1">{renderNavLinks()}</div>
            </aside>

            {/* ========================================================= */}
            {/* 2. MOBILE DRAWER (Visible on screens below md)            */}
            {/* ========================================================= */}
            <div className="md:hidden">
                {/* Mobile floating trigger button */}
                <Button
                    isIconOnly
                    variant="light"
                    className="fixed top-4 left-4 z-50 text-foreground bg-content1 border border-divider shadow-xl"
                    onClick={() => setIsOpen(true)}
                >
                    <Menu className="w-5 h-5" />
                </Button>

                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-md"
                            />

                            {/* Drawer Content */}
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                className="fixed top-0 left-0 bottom-0 z-[70] w-[280px] bg-content1 shadow-2xl flex flex-col pt-4 border-r border-divider"
                            >
                                {/* Close Button */}
                                <Button
                                    isIconOnly
                                    variant="light"
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-4 right-4 text-default-500 hover:text-foreground z-50"
                                >
                                    <X className="w-5 h-5" />
                                </Button>

                                {renderHeaderAndUser()}

                                <div className="flex-1 px-0 mt-4 overflow-y-auto pb-6">
                                    {renderNavLinks()}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
