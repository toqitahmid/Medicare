import React from "react";
import MedicareLoader from "@/app/ui/loading/MedicareLoader";

export default function RootLoading() {
  return (
    <MedicareLoader
      title="MediCare"
      variant="fullscreen"
      showSecurityBadge={true}
    />
  );
}
