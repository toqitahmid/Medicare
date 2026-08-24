import { getDoctorById } from "@/app/lib/api/doctors";
import { getPatientInfo } from "@/app/lib/api/patients";
import { getUserSession } from "@/app/lib/core/session";
import AppointmentForm from "./AppointmentForm";
import { getAppointmentById } from "@/app/lib/api/appoinments";
import { getPlanById } from "@/app/lib/api/plans";

const page = async ({ params }) => {
  const user = await getUserSession();
  const userId = user.id;
  const patient = await getPatientInfo(userId);
  const { id: doctorId } = await params;
  const doctor = await getDoctorById(doctorId);

  const appointments = await getAppointmentById(patient?._id)
  const patientPlan = await getPlanById(patient?.plan)
  console.log('total appointment : ',appointments.length);
  console.log('patient plan: ',patientPlan);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Book an Appointment
          </h1>
          <p className="mt-2 text-sm opacity-80">
            Review your details and schedule a session with your practitioner.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Details Summary Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            {/* Doctor Card */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider opacity-60">
                Doctor Details
              </h2>
              <div className="mt-4 flex items-center space-x-4">
                <img
                  src={doctor.profileImage}
                  alt={doctor.name}
                  className="h-16 w-16 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h3 className="font-semibold">{doctor.name}</h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {doctor.specialization}
                  </p>
                  <p className="text-xs opacity-75">{doctor.qualifications}</p>
                </div>
              </div>
              <div className="mt-4 border-t border-slate-200 dark:border-slate-800 pt-3 space-y-2 text-xs opacity-90">
                <p>
                  <span className="font-semibold">Hospital:</span>{" "}
                  {doctor.hospitalName}
                </p>
                <p>
                  <span className="font-semibold">Days:</span>{" "}
                  {doctor.availableDays}
                </p>
                <p>
                  <span className="font-semibold">Hours:</span>{" "}
                  {doctor.availableSlots}
                </p>
              </div>
            </div>

            {/* Patient Card */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider opacity-60">
                Patient Info
              </h2>
              <div className="mt-4 flex items-center space-x-3">
                <img
                  src={patient.photo}
                  alt={user.name}
                  className="h-12 w-12 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h3 className="text-sm font-semibold">{user.name}</h3>
                  <p className="text-xs opacity-75">{user.email}</p>
                  <p className="text-xs opacity-75">{patient.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Booking Form Container */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-semibold mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
              Schedule Details
            </h2>
            <AppointmentForm patient={patient} doctor={doctor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
