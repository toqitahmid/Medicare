import { getDoctorById } from "@/app/lib/api/doctors";
import Image from "next/image";
import Link from "next/link";

const DoctorsDetailsPage = async ({ params }) => {
  const { id } = await params;
  const doctor = await getDoctorById(id);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--text-subtle)] text-lg">Doctor not found.</p>
      </div>
    );
  }

  const {
    name,
    specialization,
    qualifications,
    experience,
    consultationFee,
    hospitalName,
    profileImage,
    availableDays,
    availableSlots,
    verificationStatus,
  } = doctor;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Profile Header Card */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-[var(--border-color)] shrink-0">
          <Image
            src={profileImage}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
            <span
              className={`inline-block self-center md:self-auto text-xs px-3 py-1 rounded-full font-medium ${
                verificationStatus === "Approved"
                  ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
              }`}
            >
              {verificationStatus}
            </span>
          </div>

          <p className="text-emerald-600 dark:text-emerald-400 font-medium text-lg mt-1">
            {specialization}
          </p>
          <p className="text-sm text-[var(--text-subtle)] mt-0.5">
            {qualifications}
          </p>

          <div className="mt-4 pt-4 border-t border-[var(--border-color)] grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[var(--text-subtle)] text-xs">Experience</p>
              <p className="font-semibold text-base">{experience} Years</p>
            </div>
            <div>
              <p className="text-[var(--text-subtle)] text-xs">
                Consultation Fee
              </p>
              <p className="font-semibold text-base text-emerald-600 dark:text-emerald-400">
                ${consultationFee}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Practice Info */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 border-b border-[var(--border-color)] pb-2">
            Hospital & Location
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[var(--text-subtle)]">
                Current Hospital
              </p>
              <p className="font-medium text-base mt-0.5">{hospitalName}</p>
            </div>
          </div>
        </div>

        {/* Schedule Info */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 border-b border-[var(--border-color)] pb-2">
            Availability
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-[var(--text-subtle)]">
                Available Days
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {availableDays.split(",").map((day, index) => (
                  <span
                    key={index}
                    className="bg-[var(--bg-subtle)] border border-[var(--border-color)] text-xs px-2.5 py-1 rounded-md font-medium"
                  >
                    {day.trim()}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[var(--text-subtle)]">
                Visiting Hours
              </p>
              <p className="font-medium text-sm mt-1">{availableSlots}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-8 text-center">
        <Link
          href={`${id}/bookAppointment`}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-3 rounded-xl transition duration-200 shadow-md"
        >
          Book Appointment
        </Link>
      </div>
    </main>
  );
};

export default DoctorsDetailsPage;
