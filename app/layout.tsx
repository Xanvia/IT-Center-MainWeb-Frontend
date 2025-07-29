import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Inter, Be_Vietnam_Pro, Rubik } from "next/font/google";
import { validateEnvironmentVariables } from "@/utils/env-validation";

// font-families
const vietnam = Be_Vietnam_Pro({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

const rubik = Rubik({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-rubik",
});

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "IT Center | UOP",
  description: "University of Peradeniya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Validate environment variables early (but not during build time)
  if (
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PHASE !== "phase-production-build"
  ) {
    try {
      validateEnvironmentVariables();
    } catch (error) {
      console.error("Environment validation failed:", error);
      // Only throw in development to prevent build failures
      if (process.env.NODE_ENV === "development") {
        throw error;
      }
    }
  }

  return (
    <html lang="en">
      <body
        className={`${inter.className} ${vietnam.variable} ${rubik.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
