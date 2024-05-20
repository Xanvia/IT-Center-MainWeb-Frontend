"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HamButton } from "./buttons/HamButton";

export default function NavBar() {
  const [showServicesDropdown, setShowServicesDropdown] =
    useState<boolean>(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleServicesDropdown = () => {
    setShowServicesDropdown(!showServicesDropdown);
    setShowAboutDropdown(false);
  };

  const toggleAboutDropdown = () => {
    setShowAboutDropdown(!showAboutDropdown);
    setShowServicesDropdown(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-maroon">
      <div className="md:flex justify-between">
        {/* left side  */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center m-3">
            <Image
              src="/logo/pera-logo.png"
              className="md:w-24 w-16 2xl:w-auto"
              width={80}
              height={80}
              alt="Logo"
            />
            <div className="flex flex-col text-white ml-3">
              <h1 className=" md:text-xl font-semibold text-base">
                Information Technology Center
              </h1>
              <h2 className="md:text-base text-sm">University of Peradeniya</h2>
            </div>
          </Link>
          {/* hamburger menu button in mobile version */}
          <div className="md:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <HamButton isClicked={isMobileMenuOpen} />
            </button>
          </div>
        </div>

        {/* right side  */}
        <div className="md:flex items-center">
          <ul className={`md:flex ${isMobileMenuOpen ? "block" : "hidden"} `}>
            <li className="mr-6">
              <Link href="/home" className="text-white hover:text-gray">
                Home
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/courses" className="text-white hover:text-gray">
                Courses
              </Link>
            </li>
            <li className="mr-6 relative">
              <div
                className="text-white hover:text-gray cursor-pointer"
                onClick={toggleServicesDropdown}
              >
                Services
              </div>
              {showServicesDropdown && (
                <div className="absolute top-full left-0 bg-white p-2 rounded shadow mt-1 text-md">
                  <ul>
                    <li className="py-1">
                      <Link href="/projects" className="text-black">
                        Projects
                      </Link>
                    </li>
                    <li className="py-1">
                      <Link href="/consultations" className="text-black">
                        Consultations
                      </Link>
                    </li>
                    <li className="py-1">
                      <Link href="/logs" className="text-black">
                        Logs
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="mr-6">
              <Link href="/news" className="text-white hover:text-gray">
                News
              </Link>
            </li>
            <li className="mr-6 relative">
              <a
                className="text-white hover:text-gray cursor-pointer"
                onClick={toggleAboutDropdown}
              >
                About Us
              </a>
              {showAboutDropdown && (
                <div className="absolute top-full left-0 bg-white p-2 rounded shadow mt-1">
                  <ul>
                    <li className="py-1">
                      <Link href="/about1" className="text-gray">
                        Staff
                      </Link>
                    </li>
                    <li className="py-1">
                      <Link href="/about2" className="text-gray">
                        Company
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
