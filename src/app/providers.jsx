"use client";

import { ToastProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      
      <ToastProvider/>

      {children}
    </ThemeProvider>
  );
}