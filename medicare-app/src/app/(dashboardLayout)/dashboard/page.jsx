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
import { authClient } from "@/app/lib/auth-client";
import { getAppointmentByDoctorId, getAppointmentById, getTodayAppointmentByDoctorId } from "@/app/lib/api/appoinments";
import { getUserSession, requiredRole } from "@/app/lib/core/session";
import { getPatientByUserId } from "@/app/lib/api/patients";
import { getPaymentByPatientId } from "@/app/lib/api/payments";
import ManageSchedule from "@/app/ui/dashboard/doctor/ManageSchedule";
import AppointmentRequest from "@/app/ui/dashboard/doctor/AppointmentRequest";
import PrescriptionManagement from "@/app/ui/dashboard/doctor/PrescriptionManagement";
import DoctorOverview from "@/app/ui/dashboard/doctor/DoctorOverview";
import { getDoctorByUserId } from "@/app/lib/api/doctors";
import { getPrescriptionsByDoctorId } from "@/app/lib/api/prescriptions";
import { getReviewsByPatientId } from "@/app/lib/api/reviews";
import AdminOverview from "@/app/ui/dashboard/admin/AdminOverview";

import ManagePatients from "@/app/ui/dashboard/admin/ManagePatients";
import ManageDoctors from "@/app/ui/dashboard/admin/ManageDoctors";
import { getAdminAppointments, getAdminData, getAdminDoctors, getAdminPatients, getAdminReviews, getAdminUsers } from "@/app/lib/api/admin";
import ManageAppointments from "@/app/ui/dashboard/admin/ManageAppointments";

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
  const [PatientData, setPatientData] = useState(null);
  const [AdminData, setAdmintData] = useState(null);
  const [patientReviews, setPatientReviews] = useState([]);
  const [doctorPrescriptions, setDoctorPrescription] = useState([]);

  const [adminUsers, setAdminUsers] = useState([]);
  const [adminPatients, setAdminPatients] = useState([]);
  const [adminDoctors, setAdminDoctors] = useState([]);
  const [adminAppointments, setAdminAppointments] = useState([]);
  const [adminReviews, setAdminReviews] = useState([]);

   const role = isPending ? null : selectedRole || sessionRole || "patient";
   const setRole = setSelectedRole;


  // --------- patient useEffect ---------- //
  useEffect(() => {
      if (isPending || role !== "patient") {
        return;
      }
    let cancelled = false;

    async function loadPatientData() {
      await requiredRole("patient");
      try {
        const user = await getUserSession();
        const patientData = await getPatientByUserId(user.id);

        const [totalAppointments, totalPayments, totalReviews] = await Promise.all([
          getAppointmentById(patientData?._id),
          getPaymentByPatientId(patientData?._id),
          getReviewsByPatientId(patientData?._id),
        ])
        if (cancelled) {
          return;
        }
        setAppointments(totalAppointments);
        setPayments(totalPayments);
        setPatientData(patientData);
        setPatientReviews(totalReviews);
      }
      catch (err) {
        console.error(err);
      }
    }

    loadPatientData();
    return () => {
      cancelled = true;
    };
  }, [role, isPending]);


  // --------- doctor useEffect ----------- //
  useEffect(() => {
     if (isPending || role !== "doctor") {
       return;
     }
    let cancelled = false;

    async function loadDoctorData() {
      await requiredRole("doctor");
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
  }, [role, isPending])


  // ---------- admin useEffect ----------- //
  useEffect(() => {
    if (isPending || role !== "admin") {
      return;
    }
    let cancelled = false;

    async function loadAdminData() {
      await requiredRole("admin");
      try{

        const user = await getUserSession();
        const adminData = await getAdminData(user?.id);

        const[totalUsers, totalDoctors, totalPatients, totalAppointments, totalReviews] = await Promise.all([
          getAdminUsers(),
          getAdminDoctors(),
          getAdminPatients(),
          getAdminAppointments(),
          getAdminReviews(),
        ])

        if(cancelled){
          return;
        }
        setAdmintData(adminData);
        setAdminUsers(totalUsers);
        setAdminDoctors(totalDoctors);
        setAdminPatients(totalPatients);
        setAdminAppointments(totalAppointments);
        setAdminReviews(totalReviews);
      }
      catch(err){
        console.error(err);
      }
    }
    
    loadAdminData();
    return () => {
      cancelled = true;
    }
  }, [role, isPending])

  if (isPending) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950" />;
  }

  const visibleTab = ROLE_SIDEBAR_ITEMS[role].some(
    (item) => item.id === activeTab,
  )
    ? activeTab
    : "dashboard-overview";

  const renderContent = () => {
    if (role === "doctor") {
      switch (visibleTab) {
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
      switch (visibleTab) {
        case "manage-patients":
          return (
            <ManagePatients adminPatients={adminPatients}></ManagePatients>
          );
        case "manage-doctors":
          return <ManageDoctors adminDoctors={adminDoctors}></ManageDoctors>;
        case "all-appointments":
          return (
            <ManageAppointments
              adminAppointments={adminAppointments}
            ></ManageAppointments>
          );
        default:
          return (
            <AdminOverview
              AdminData={AdminData}
              adminUsers={adminUsers}
              adminPatients={adminPatients}
              adminDoctors={adminDoctors}
              adminAppointments={adminAppointments}
              adminReviews={adminReviews}
              activeTab={activeTab}
            ></AdminOverview>
          );
      }
    }

    if (role === "patient") {
      switch (visibleTab) {
        case "my-appointments":
          return <MyAppointments appointments={appointments} />;
        case "payment-history":
          return <PaymentHistory payments={payments} />;
        case "my-reviews":
          return <MyReviews patientReviews={patientReviews} />;
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
