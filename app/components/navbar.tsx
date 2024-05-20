"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HamButton } from "./buttons/HamButton";
import { TiArrowSortedDown } from "react-icons/ti";

export default function NavBar() {
  // dropdown use states
  const [showServicesDropdown, setShowServicesDropdown] =
    useState<boolean>(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // references
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

  // toggle functions
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

  // unroll dropdowns by clicking outside
  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (
        !servicesDropdownRef.current?.contains(e.target as Node) &&
        !aboutDropdownRef.current?.contains(e.target as Node)
      ) {
        setShowServicesDropdown(false);
        setShowAboutDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

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
          <ul
            className={`md:flex items-center ${
              isMobileMenuOpen ? "block" : "hidden"
            } `}
          >
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
              <div ref={servicesDropdownRef}>
                <div
                  className="text-white hover:text-gray cursor-pointer flex items-center"
                  onClick={toggleServicesDropdown}
                >
                  Services
                  <TiArrowSortedDown
                    className={`w-5 h-5 relative  ${
                      showServicesDropdown ? "rotate-180 duration-300" : ""
                    }`}
                  />
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
              </div>
            </li>
            <li className="mr-6">
              <Link href="/news" className="text-white hover:text-gray">
                News
              </Link>
            </li>
            <li className="mr-6 relative">
              <div ref={aboutDropdownRef}>
                <a
                  className="text-white hover:text-gray cursor-pointer flex items-center"
                  onClick={toggleAboutDropdown}
                >
                  About Us
                  <TiArrowSortedDown
                    className={`w-5 h-5 relative  ${
                      showAboutDropdown ? "rotate-180 duration-300" : ""
                    }`}
                  />
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
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
