"use client";
import React, { useState, useMemo } from "react";
import { Card, Button, Pagination } from "@heroui/react";
import { motion } from "framer-motion";
import { Search, Briefcase, Clock, DollarSign, Award, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function DoctorsListClient({ doctors, initialSpecialization = "" }) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(initialSpecialization);
  const rowsPerPage = 6;

  const filteredDoctors = useMemo(() => {
    if (!doctors) return [];
    return doctors.filter((doc) =>
      doc.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialization?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [doctors, searchQuery]);

  const pages = Math.ceil(filteredDoctors.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredDoctors.slice(start, end);
  }, [page, filteredDoctors]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-8 min-h-[80vh]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Our Specialists</h1>
          <p className="text-default-500 mt-2 text-lg">Find and book an appointment with our highly qualified doctors.</p>
        </div>
        <div className="w-full md:w-80 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-default-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-default-200 bg-default-100/50 backdrop-blur-md text-foreground text-sm outline-none focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((doctor, index) => (
          <motion.div
            key={doctor._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border border-default-100/50 bg-background/60 backdrop-blur-xl shadow-medium hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_14px_28px_rgba(18,59,66,0.1)] dark:hover:shadow-[0_14px_28px_rgba(0,0,0,0.4)] transition-all duration-300 rounded-[2.5rem] overflow-hidden group">
              <div className="p-8">
                <div className="flex items-start gap-5">
                  <div className="w-20 h-20 shrink-0 rounded-3xl bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-background shadow-md">
                    {doctor.photo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-default-200" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground line-clamp-1">Dr. {doctor.name}</h3>
                    <p className="text-primary font-bold flex items-center gap-1.5 mt-1 text-sm uppercase tracking-wider">
                      <Briefcase className="w-3.5 h-3.5" /> {doctor.specialization}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="px-3 py-1.5 bg-default-100 text-default-600 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-default-200">
                        <Clock className="w-3.5 h-3.5" /> {doctor.experience} Yrs Exp
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-default-100/60 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-default-500 font-semibold mb-1 uppercase tracking-wider">Consultation Fee</p>
                    <p className="font-extrabold text-foreground flex items-center gap-1 text-lg">
                      <DollarSign className="w-4 h-4 text-primary" />{doctor.consultationFee}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-default-500 font-semibold mb-1 uppercase tracking-wider">Qualifications</p>
                    <p className="font-extrabold text-foreground line-clamp-1 flex items-center gap-1 text-lg">
                      <Award className="w-4 h-4 text-primary" />{doctor.qualifications}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href={`/doctors/${doctor._id}`}>
                    <Button
                      color="primary"
                      variant="solid"
                      size="lg"
                      className="w-full font-bold rounded-xl transition-all duration-300 shadow-md shadow-primary/20"
                      endContent={<ChevronRight className="w-5 h-5" />}
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {pages > 1 && (
        <div className="flex justify-center mt-12">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      )}
      
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-default-50/50 rounded-[3rem] border border-default-100 border-dashed">
          <div className="w-24 h-24 bg-default-100 rounded-full flex items-center justify-center mb-6">
            <Search className="w-10 h-10 text-default-400" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">No doctors found</h3>
          <p className="text-default-500 mt-2 max-w-md">We couldn&apos;t find any doctors matching your search criteria. Try adjusting your search term.</p>
        </div>
      )}
    </div>
  );
}
