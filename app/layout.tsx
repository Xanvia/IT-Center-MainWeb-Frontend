import type { Metadata } from "next";
import { Be_Vietnam_Pro, Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navbar";
import { Providers } from "./Providers";

// font-families
const inter = Inter({ subsets: ["latin"] });
const vietnam = Be_Vietnam_Pro({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  title: "CEIT",
  description: "Generated by Xanvia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${vietnam.variable}`}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
