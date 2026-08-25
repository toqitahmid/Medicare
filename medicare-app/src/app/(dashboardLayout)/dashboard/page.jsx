"use client";

import { useEffect, useState } from "react";
import DashboardNavbar from "@/app/ui/dashboard/DashboardNavbar";
import DashboardSidebar, {
  ROLE_SIDEBAR_ITEMS,
} from "@/app/ui/dashboard/DashboardSidebar";
import PatientOverview from "@/app/ui/dashboard/patient/PatientOverview";
import MyAppointments from "@/app/ui/dashboard/patient/MyAppointments";
import PaymentHistory from "@/app/ui/dashboard/patient/PaymentHistory";
import MyReviews from "@/app/ui/dashboard/patient/MyReviews";
import DoctorDashboard from "@/app/ui/dashboard/doctor/DoctorDashboard";
import AdminDashboard from "@/app/ui/dashboard/admin/AdminDashboard";
import { authClient } from "@/app/lib/auth-client";
import { getAppointmentById } from "@/app/lib/api/appoinments";
import { getUserSession } from "@/app/lib/core/session";
import { getPatientByUserId } from "@/app/lib/api/patients";
import { getPaymentByPatientId } from "@/app/lib/api/payments";

const tabTitles = Object.fromEntries(
  Object.values(ROLE_SIDEBAR_ITEMS)
    .flat()
    .map((item) => [item.id, item.label]),
);

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const sessionRole = session?.user?.role;
  const [selectedRole, setSelectedRole] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard-overview");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);

  const role = selectedRole || sessionRole || "patient";
  const setRole = setSelectedRole;

  useEffect(() => {
    let cancelled = false;

    async function loadAppointments() {
      try {
        const user = await getUserSession();
        const patient = await getPatientByUserId(user.id);
        const totalAppointments = await getAppointmentById(patient?._id);
        setAppointments(totalAppointments);
      } catch {
        // Patient components keep their local preview data when the API is unavailable.
      }
    }

    loadAppointments();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadPayments() {
      try {
        const user = await getUserSession();
        const patient = await getPatientByUserId(user.id);
        const totalPayments = await getPaymentByPatientId(patient._id);
        setPayments(totalPayments);
        console.log("total payments",totalPayments);
        
      } catch {
        // Patient components keep their local preview data when the API is unavailable.
      }
    }

    loadPayments();
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleTab = ROLE_SIDEBAR_ITEMS[role].some(
    (item) => item.id === activeTab,
  )
    ? activeTab
    : "dashboard-overview";

  const renderContent = () => {
    if (role === "doctor") {
      return <DoctorDashboard activeTab={visibleTab} />;
    }

    if (role === "admin") {
      return <AdminDashboard activeTab={visibleTab} />;
    }

    switch (visibleTab) {
      case "my-appointments":
        return <MyAppointments appointments={appointments} />;
      case "payment-history":
        return <PaymentHistory payments={payments} />;
      case "my-reviews":
        return <MyReviews />;
      default:
        return (
          <PatientOverview
            payments={payments}
            appointments={appointments}
            onNavigateTab={setActiveTab}
          />
        );
    }
  };

  if (isPending) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950" />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <DashboardSidebar
        role={role}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <div
        className={`min-h-screen transition-[padding] duration-300 ${isCollapsed ? "md:pl-20" : "md:pl-64"}`}
      >
        <DashboardNavbar
          role={role}
          setRole={setRole}
          activeTabTitle={tabTitles[visibleTab] || "Dashboard Overview"}
          onMobileMenuToggle={() => setIsMobileOpen((open) => !open)}
        />
        <main className="mx-auto w-full max-w-[1600px] p-4 md:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
