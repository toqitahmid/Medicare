import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://medicare.example"),
  title: {
    default: "Medicare | Trusted Doctors & Better Care",
    template: "%s | Medicare",
  },
  description:
    "Medicare connects patients with trusted doctors, seamless appointments, and compassionate digital healthcare support.",
  keywords: [
    "Medicare",
    "doctor appointment",
    "healthcare platform",
    "find doctors",
    "online consultation",
    "medical care",
  ],
  openGraph: {
    title: "Medicare | Trusted Doctors & Better Care",
    description:
      "Book appointments, discover specialists, and manage your care journey with confidence.",
    url: "https://medicare.example",
    siteName: "Medicare",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medicare | Trusted Doctors & Better Care",
    description:
      "A modern healthcare platform for connecting patients with the right doctors and care support.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
