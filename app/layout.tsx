import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import { Be_Vietnam_Pro, Rubik } from "next/font/google";

// font-families
const vietnam = Be_Vietnam_Pro({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
});

const rubik = Rubik({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "IT Center | UOP",
  description: "Generated by Xanvia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
