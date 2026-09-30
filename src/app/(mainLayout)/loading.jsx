import React from "react";
import MedicareLoader from "@/app/ui/loading/MedicareLoader";

export default function MainLayoutLoading() {
  return (
    <div className="w-full min-h-[calc(100vh-14rem)] flex items-center justify-center px-4 py-12 relative">
      <MedicareLoader
        title="MediCare"
        subtitle="Loading healthcare services & verified doctors..."
        variant="card"
        showSecurityBadge={true}
      />
    </div>
  );
}
