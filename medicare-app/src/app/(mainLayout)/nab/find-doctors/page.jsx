import Image from "next/image";
import Link from "next/link";
import { getAllDoctors } from "@/app/lib/api/doctors";

const FindDoctorsPage = async ({ searchParams }) => {
  const filters = await searchParams;
  const doctors = await getAllDoctors(filters);
  console.log(doctors);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Server-Side Filter Form */}
      <form
        method="GET"
        className="mb-8 grid grid-cols-1 gap-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-subtle)] p-4 sm:grid-cols-4"
      >
        <div>
          <label className="block text-xs font-medium text-[var(--text-subtle)]">
            Specialization
          </label>
          <input
            type="text"
            name="specialization"
            defaultValue={filters?.specialization || ""}
            placeholder="e.g. Cardiology"
            className="mt-1 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-2 text-sm text-[var(--text-main)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-subtle)]">
            Max Fee ($)
          </label>
          <input
            type="number"
            name="maxFee"
            defaultValue={filters?.maxFee || ""}
            placeholder="e.g. 150"
            className="mt-1 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-2 text-sm text-[var(--text-main)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-subtle)]">
            Min Experience (Years)
          </label>
          <input
            type="number"
            name="minExperience"
            defaultValue={filters?.minExperience || ""}
            placeholder="e.g. 5"
            className="mt-1 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-2 text-sm text-[var(--text-main)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="flex items-end gap-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
          >
            Apply
          </button>
          <Link
            href="/nab/find-doctors"
            className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2 text-sm font-medium text-[var(--text-main)] transition-colors hover:bg-[var(--bg-subtle)]"
          >
            Reset
          </Link>
        </div>
      </form>

      {/* Header Results Info */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--text-subtle)]">
          Showing {doctors?.length || 0} doctors
        </span>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {doctors?.map((doctor) => (
          <div
            key={doctor._id}
            className="flex flex-col justify-between rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div>
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0">
                  <Image
                    src={doctor.profileImage || "/placeholder-avatar.png"}
                    alt={`Dr. ${doctor.name}`}
                    width={64}
                    height={64}
                    className="h-full w-full rounded-full border border-[var(--border-color)] object-cover"
                  />
                  <span
                    className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[var(--bg-card)] ${
                      doctor.verificationStatus === "Approved"
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}
                    title={`Verification: ${doctor.verificationStatus}`}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-lg font-semibold text-[var(--text-main)]">
                    Dr. {doctor.name}
                  </h2>
                  <p className="text-xs font-medium text-[var(--text-subtle)]">
                    {doctor.qualifications}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-xs font-medium text-blue-500">
                    <i className="gl gl-heart text-sm" />
                    <span>{doctor.specialization}</span>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-[var(--bg-subtle)] p-3 text-xs">
                <div className="flex items-center gap-2 text-[var(--text-subtle)]">
                  <i className="gl gl-briefcase text-base" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">
                      Experience
                    </p>
                    <p className="font-medium text-[var(--text-main)]">
                      {doctor.experience}+ Years
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[var(--text-subtle)]">
                  <i className="gl gl-dollar-circle text-base" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">
                      Fee
                    </p>
                    <p className="font-medium text-[var(--text-main)]">
                      ${doctor.consultationFee}
                    </p>
                  </div>
                </div>
              </div>

              {/* Meta Info */}
              <div className="mt-4 space-y-2.5 text-xs text-[var(--text-subtle)]">
                <div className="flex items-start gap-2.5">
                  <i className="gl gl-building mt-0.5 text-base" />
                  <span className="font-medium text-[var(--text-main)]">
                    {doctor.hospitalName}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <i className="gl gl-calendar mt-0.5 text-base" />
                  <span>{doctor.availableDays}</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <i className="gl gl-clock mt-0.5 text-base" />
                  <span>{doctor.availableSlots}</span>
                </div>
              </div>
            </div>

            <Link
              href={`/nab/find-doctors/${doctor._id}`}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium  transition-colors border-2"
            >
              <span>View Details</span>
              <i className="gl gl-arrow-right text-base" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindDoctorsPage;
