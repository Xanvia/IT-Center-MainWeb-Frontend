import { Be_Vietnam_Pro, Rubik } from "next/font/google";
import NavBar from "./components/sections/navbar";
import Footer from "./components/sections/footer";

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

export default function MainWebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <NavBar />
      {children}
      <Footer />
    </main>
  );
}
