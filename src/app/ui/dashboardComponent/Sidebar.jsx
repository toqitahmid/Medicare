"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer, Button, Avatar } from "@heroui/react";

import {
    LayoutGrid,
    Building2,
    Briefcase,
    FileText,
    Settings,
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
        icon: Building2,
    },
    {
        label: "Payment History",
        href: "/patientDashboard/payment", 
        icon: FileText,
    },
    {
      label: "My Reviews",
      href: "/patientDashboard/reviews",
      icon: Settings,
    },
];
const doctorNavItems = [
    {
        label: "Overview",
        href: "/doctorDashboard/overView",
        icon: LayoutGrid,
    },
    {
        label: "Manage Schedule",
        href: "/doctorDashboard/schedule",
        icon: Building2,
    },
    {
        label: "Appointment Requests",
        href: "/doctorDashboard/requests", 
        icon: FileText,
    },
    {
      label: "Prescription Management",
      href: "/doctorDashboard/prescription",
      icon: Settings,
    },
    {
      label: "Profile Management",
      href: "/doctorDashboard/profile",
      icon: Settings,
    },
];

export default function Sidebar() {

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const navItems = user?.role === "admin"? adminNavItems : user?.role === "doctor" ? doctorNavItems : patientNavItems;

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
                        className={`flex items-center justify-between w-full py-4 px-6 transition-all duration-200 group relative ${isActive
                                ? "bg-zinc-800/60 text-white"
                                : "text-zinc-500 hover:text-zinc-300"
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <item.icon
                                className={`w-5 h-5 ${isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`}
                            />
                            <span className="text-[15px] font-medium tracking-wide">
                                {item.label}
                            </span>
                        </div>

                        {/* The white vertical line indicator on the right side for the active tab */}
                        {isActive && (
                            <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-white h-full" />
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
                className="flex items-center gap-1 text-2xl font-black tracking-tight text-blue-500 hover:opacity-90 transition-opacity mb-5"
            >
                hire<span className="text-orange-500">l</span>
                <div className="w-3.5 h-3.5 rounded-full border-2 border-orange-500 flex items-center justify-center -mx-0.5">
                    <div className="w-1 h-1 rounded-full bg-blue-400" />
                </div>
                <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-orange-400" />
                </div>
                <span className="text-orange-500 -ml-0.5">p</span>
            </Link>

            {/* User Card Layout */}
            <div className="flex flex-col items-start mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <Avatar className="w-11 h-11 border border-zinc-800" radius="sm">
                        {user?.image ? (
                            <Avatar.Image
                                src={user.image}
                                alt={user.name || "User Avatar"}
                                className="object-cover"
                            />
                        ) : (
                            <Avatar.Fallback>
                                {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
                            </Avatar.Fallback>
                        )}
                    </Avatar>
                    <div>
                        <h2 className="text-sm font-semibold text-zinc-200 tracking-wide">
                            {user?.name}
                        </h2>
                        <p className="text-xs text-zinc-500 font-medium">{user?.role}</p>
                    </div>
                </div>
                {/* Premium Account Badge */}
                <span className="text-[10px] font-bold tracking-wider text-zinc-300 bg-zinc-800/80 border border-zinc-700 px-2 py-1 rounded-sm uppercase">
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
            <aside className="hidden md:flex flex-col w-60 h-screen bg-[#111112] text-zinc-100 sticky top-0 border-r border-zinc-900/50">
                {renderHeaderAndUser()}
                <div className="mt-4 flex-1">{renderNavLinks()}</div>
            </aside>

            {/* ========================================================= */}
            {/* 2. MOBILE DRAWER (Visible on screens below md)            */}
            {/* ========================================================= */}
            <div className="md:hidden">
                <Drawer>
                    {/* Mobile floating trigger button */}
                    <Button
                        isIconOnly
                        variant="light"
                        className="fixed top-4 left-4 z-50 text-white bg-[#111112] border border-zinc-800 shadow-xl"
                    >
                        <Menu className="w-5 h-5" />
                    </Button>

                    <Drawer.Backdrop variant="blur">
                        <Drawer.Content
                            placement="left"
                            className="w-64 bg-[#111112] text-zinc-100 p-0"
                        >
                            <Drawer.Dialog className="h-full flex flex-col pt-4 relative">
                                {/* Close Trigger Button for Mobile Panel */}
                                <Drawer.CloseTrigger>
                                    <div
                                        role="button"
                                        aria-label="Close drawer"
                                        className="absolute top-4 right-4 text-zinc-500 hover:text-white"
                                    >
                                        <X className="w-5 h-5" />
                                    </div>
                                </Drawer.CloseTrigger>

                                {renderHeaderAndUser()}

                                <Drawer.Body className="flex-1 px-0 mt-4 overflow-y-auto">
                                    {renderNavLinks()}
                                </Drawer.Body>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>
            </div>
        </>
    );
}
