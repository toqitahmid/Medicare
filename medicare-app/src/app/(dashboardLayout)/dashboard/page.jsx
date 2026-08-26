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
import AdminDashboard from "@/app/ui/dashboard/admin/AdminDashboard";
import { authClient } from "@/app/lib/auth-client";
import { getAppointmentByDoctorId, getAppointmentById, getTodayAppointmentByDoctorId } from "@/app/lib/api/appoinments";
import { getUserSession } from "@/app/lib/core/session";
import { getPatientByUserId } from "@/app/lib/api/patients";
import { getPaymentByPatientId } from "@/app/lib/api/payments";
import ManageSchedule from "@/app/ui/dashboard/doctor/ManageSchedule";
import AppointmentRequest from "@/app/ui/dashboard/doctor/AppointmentRequest";
import PrescriptionManagement from "@/app/ui/dashboard/doctor/PrescriptionManagement";
import DoctorOverview from "@/app/ui/dashboard/doctor/DoctorOverview";
import { getDoctorByUserId } from "@/app/lib/api/doctors";
import { getPrescriptionsByDoctorId } from "@/app/lib/api/prescriptions";

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
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [doctorTodayAppointments, setDoctorTodayAppointments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [DoctorData, setDoctorData] = useState(null);
  const [doctorPrescriptions, setDoctorPrescription] = useState([]);

  const role = selectedRole || sessionRole || "patient";
  const setRole = setSelectedRole;


  // --------- patient useEffect ---------- //
  useEffect(() => {
    let cancelled = false;

    async function loadPatientData() {
      try{
        const user = await getUserSession();
        const patient = await getPatientByUserId(user.id);

        const [totalAppointments, totalPayments] = await Promise.all([
          getAppointmentById(patient?._id),
          getPaymentByPatientId(patient?._id),
        ])
        if(cancelled){
          return;
        }
        setAppointments(totalAppointments);
        setPayments(totalPayments)
      }
      catch(err){
        console.error(err);
      }
    }

     loadPatientData();
     return () => {
       cancelled = false;
     };
  }, []);


  // --------- doctor useEffect ----------- //
  useEffect(() => {
    let cancelled = false;

    async function loadDoctorData() {
      try {
        const user = await getUserSession();
        const doctorData = await getDoctorByUserId(user.id);

        const [totalAppointments, todayAppoitnments, totalPrescriptions] = await Promise.all([
          getAppointmentByDoctorId(doctorData?._id),
          getTodayAppointmentByDoctorId(doctorData?._id),
          getPrescriptionsByDoctorId(doctorData?._id),
        ]);

        if (cancelled) return;

        setDoctorData(doctorData);
        setDoctorAppointments(totalAppointments);
        setDoctorTodayAppointments(todayAppoitnments);
        setDoctorPrescription(totalPrescriptions);
      } catch (err) {
        console.error(err);
      }
    }
    
    
    loadDoctorData();
    return () => {
      cancelled = true
    }
  }, [])


  const visibleTab = ROLE_SIDEBAR_ITEMS[role].some(
    (item) => item.id === activeTab,
  )
    ? activeTab
    : "dashboard-overview";

  const renderContent = () => {
    if (role === "doctor") {
      switch(visibleTab){
        case "manage-schedule":
          return <ManageSchedule DoctorData={DoctorData}></ManageSchedule>;
        case "appointment-requests":
          return (
            <AppointmentRequest
              doctorAppointments={doctorAppointments}
            ></AppointmentRequest>
          );
        case "prescription-management":
          return (
            <PrescriptionManagement
              doctorAppointments={doctorAppointments}
            ></PrescriptionManagement>
          );
        default:
          return (
            <DoctorOverview
              doctorPrescriptions={doctorPrescriptions}
              doctorAppointments={doctorAppointments}
              doctorTodayAppointments={doctorTodayAppointments}
              activeTab={activeTab}
            ></DoctorOverview>
          );
      }
    }

    if (role === "admin") {
      return <AdminDashboard activeTab={visibleTab} />;
    }

    if(role === "patient"){
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
