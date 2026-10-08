"use client";

import { ToastProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";

if (typeof window !== "undefined" && window.performance && typeof window.performance.measure === "function") {
  const originalMeasure = window.performance.measure.bind(window.performance);
  window.performance.measure = function (name, startOrMeasureOptions, endMark) {
    try {
      return originalMeasure(name, startOrMeasureOptions, endMark);
    } catch (err) {
      if (err instanceof TypeError && err.message && err.message.includes("negative time stamp")) {
        return;
      }
      throw err;
    }
  };
}

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <ToastProvider />
      {children}
    </ThemeProvider>
  );
}