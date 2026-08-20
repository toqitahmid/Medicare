"use client";

import { ToastProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import Script from "next/script";

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Script id="theme-script" strategy="beforeInteractive">
        {`
          // Any inline theme detection script goes here
        `}
      </Script>
      <ToastProvider/>

      {children}
    </ThemeProvider>
  );
}