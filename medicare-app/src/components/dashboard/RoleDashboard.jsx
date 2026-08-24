"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, Avatar } from "@heroui/react";
import { authClient } from "@/app/lib/auth-client";

import {
  House,
  LayoutDashboard,
  CalendarDays,
  CreditCard,
  Star,
  Clock3,
  Mail,
  FileText,
  UserCheck,
  Users,
  Stethoscope,
} from "lucide-react";
const roleTabs = {
  patient: [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "appointments", label: "My Appointments", icon: CalendarDays },
    { id: "payments", label: "Payment History", icon: CreditCard },
    { id: "reviews", label: "My Reviews", icon: Star },
  ],

  doctor: [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "schedule", label: "Manage Schedule", icon: Clock3 },
    { id: "requests", label: "Appointment Requests", icon: Mail },
    { id: "prescriptions", label: "Prescriptions", icon: FileText },
    { id: "profile", label: "Profile", icon: UserCheck },
  ],

  admin: [
    { id: "users", label: "Manage Users", icon: Users },
    { id: "doctors", label: "Manage Doctors", icon: Stethoscope },
    {
      id: "appointments",
      label: "Manage Appointments",
      icon: CalendarDays,
    },
    { id: "payments", label: "Payment Management", icon: CreditCard },
  ],
};

function TabContent({ activeTabId }) {
  switch (activeTabId) {
    case "overview":
      return (
        <div>
          <h2 className="text-xl font-bold">Overview</h2>

          <p className="mt-2 text-default-500">
            Summary metrics and stats here.
          </p>
        </div>
      );

    case "appointments":
      return (
        <div>
          <h2 className="text-xl font-bold">My Appointments</h2>

          <p className="mt-2 text-default-500">
            List of scheduled appointments.
          </p>
        </div>
      );

    case "payments":
      return (
        <div>
          <h2 className="text-xl font-bold">Payment History</h2>

          <p className="mt-2 text-default-500">Recent payment invoices.</p>
        </div>
      );

    case "reviews":
      return (
        <div>
          <h2 className="text-xl font-bold">My Reviews</h2>

          <p className="mt-2 text-default-500">Doctor reviews and ratings.</p>
        </div>
      );

    default:
      return (
        <div className="text-default-500">Select a section from the menu.</div>
      );
  }
}

export default function RoleDashboard() {
  const { data: session, isPending } = authClient.useSession();

  const role = session?.user?.role;
  const user = session?.user;
  const tabs = role ? roleTabs[role] : undefined;

  const [selectedTab, setSelectedTab] = useState("overview");

  if (isPending) {
    return (
      <main className="min-h-screen bg-background">
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </main>
    );
  }

  if (!tabs) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center text-default-500">
        Dashboard access requires a patient, doctor, or admin account.
      </main>
    );
  }

  const activeTab = tabs.find((tab) => tab.id === selectedTab);
  const ActiveIcon = activeTab?.icon;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-divider bg-content1/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          {/* Logo / Portal */}
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <LayoutDashboard size={20} strokeWidth={2.2} />
            </div>

            <div className="hidden sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                {role} Portal
              </p>

              <h1 className="text-base font-bold tracking-tight">Dashboard</h1>
            </div>
          </div>

          {/* User Area */}
          <div className="flex items-center gap-3">
            {/* User Profile */}
              <Avatar>
                <Avatar.Image
                src={session?.user?.image}
                className="size-10 rounded-full"
                  alt="John Doe"
                />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>

            {/* Home */}
            <Link
              href="/"
              aria-label="Back to home"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-divider bg-default-50/50 text-default-600 transition-all duration-200 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              <House size={18} strokeWidth={2} />
            </Link>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="flex flex-1 flex-col gap-5 p-4 sm:p-6 lg:flex-row lg:gap-6 lg:p-7">
          {/* Sidebar */}
          <aside className="w-full shrink-0 rounded-2xl border border-divider bg-content1 shadow-sm lg:w-[250px]">
            <div className="flex h-full flex-col p-4">
              {/* Sidebar Title */}
              <div className="mb-5 rounded-xl bg-primary/5 px-4 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                  {role} Dashboard
                </p>

                <h2 className="mt-1 text-lg font-bold tracking-tight">
                  Workspace
                </h2>
              </div>

              {/* Navigation Tabs */}
              <Tabs
                selectedKey={selectedTab}
                onSelectionChange={(key) => setSelectedTab(String(key))}
                variant="light"
                radius="lg"
                className="w-full"
                classNames={{
                  base: "w-full",
                  tabList: "w-full gap-1.5 bg-transparent p-0 lg:flex-col",
                  tab: "h-11 w-full justify-start rounded-xl px-3.5 text-xs font-medium transition-all duration-200 sm:text-sm",
                  tabContent:
                    "text-default-600 group-data-[selected=true]:font-semibold group-data-[selected=true]:text-primary",
                  cursor: "rounded-xl bg-primary/10 shadow-none",
                }}
              >
                <Tabs.ListContainer>
                  <Tabs.List className="flex w-full flex-row gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;

                      return (
                        <Tabs.Tab
                          key={tab.id}
                          id={tab.id}
                          className="min-w-fit lg:min-w-0"
                        >
                          <div className="flex w-full items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-default-100 transition-colors duration-200 group-data-[selected=true]:bg-primary group-data-[selected=true]:text-primary-foreground">
                              <Icon size={16} strokeWidth={2} />
                            </div>

                            <span className="truncate">{tab.label}</span>
                          </div>
                        </Tabs.Tab>
                      );
                    })}
                  </Tabs.List>
                </Tabs.ListContainer>
              </Tabs>

              {/* Sidebar Bottom */}
              <div className="mt-auto hidden border-t border-divider pt-4 lg:block">
                <Link
                  href="/"
                  className="flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium text-default-500 transition-colors hover:bg-default-100 hover:text-foreground"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-default-100">
                    <House size={15} />
                  </div>

                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="min-w-0 flex-1">
            <div className="h-full rounded-2xl border border-divider bg-content1 shadow-sm">
              {/* Content Header */}
              <div className="flex min-h-[74px] items-center justify-between border-b border-divider px-5 sm:px-7">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {role} Portal
                  </p>

                  <h2 className="mt-0.5 text-lg font-bold tracking-tight sm:text-xl">
                    {activeTab?.label}
                  </h2>
                </div>

                {ActiveIcon && (
                  <div className="hidden h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary sm:flex">
                    <ActiveIcon size={18} strokeWidth={2} />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 sm:p-7 lg:p-8">
                <TabContent activeTabId={selectedTab} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
