import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/globals.css";
import { Header } from "./components";
import { AppHydrator } from "./components/AppHydrator";
import { Providers } from "./providers";
import { GlobalClientEffects } from "./GlobalClientEffects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini CRM de Ventas",
  description: "App para plan de carrera",
};

import { Suspense } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <GlobalClientEffects />
        </Suspense>

        <Suspense fallback={null}>
          <AppHydrator />
        </Suspense>

        <Suspense fallback={<div className="h-14" />}>
          <Header />
        </Suspense>

        <Suspense fallback={null}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
