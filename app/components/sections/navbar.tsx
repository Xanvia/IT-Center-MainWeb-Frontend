"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HamButton } from "../hamButton";
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
      <div className="md:flex justify-between block">
        {/* left side  */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center m-3">
            <Image
              src="/logo/pera-logo.png"
              className="md:w-20 w-16 2xl:w-auto"
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
        <div className="flex items-center">
          <ul
            className={`md:flex flex-col text-center w-full text-xl md:text-base md:w-auto md:flex-row items-center transition-height ${
              isMobileMenuOpen
                ? "transition-visible"
                : "transition-hidden md:max-h-max md:opacity-100"
            } `}
          >
            <li className=" m-6 md:m-4 md:ml-0">
              <Link href="/home" className="text-white hover:text-yellow-100 ">
                Home
              </Link>
            </li>
            <li className=" m-6 md:m-4">
              <Link
                href="/courses"
                className="text-white hover:text-yellow-100"
              >
                Courses
              </Link>
            </li>
            <li className="relative m-6 md:m-4 z-10">
              <div ref={servicesDropdownRef}>
                <div
                  className="text-white hover:text-yellow-100 cursor-pointer flex items-center justify-center"
                  onClick={toggleServicesDropdown}
                >
                  Services
                  <TiArrowSortedDown
                    className={`w-5 h-5 relative  md:block hidden ${
                      showServicesDropdown ? "rotate-180 duration-300" : ""
                    }`}
                  />
                </div>
                {
                  <div
                    className={`md:absolute top-full left-0 md:p-2 md:mt-1 bg-white rounded shadow block text-md transition-height ${
                      showServicesDropdown
                        ? "transition-visible"
                        : "transition-hidden"
                    }`}
                  >
                    <ul>
                      <li className="py-1 hover:scale-110  duration-300">
                        <Link
                          href="/projects"
                          className="text-black hover:text-gray-500 "
                        >
                          Projects
                        </Link>
                      </li>
                      <li className="py-1 hover:scale-110  duration-300">
                        <Link
                          href="/consultations"
                          className="text-black  hover:text-gray-500"
                        >
                          Consultations
                        </Link>
                      </li>
                      <li className="py-1 hover:scale-110 duration-300">
                        <Link
                          href="/logs"
                          className="text-black  hover:text-gray-500"
                        >
                          Logs
                        </Link>
                      </li>
                    </ul>
                  </div>
                }
              </div>
            </li>
            <li className="m-6 md:m-4">
              <Link href="/news" className="text-white hover:text-yellow-100">
                News
              </Link>
            </li>
            <li className="relative m-6 md:m-4 z-10">
              <div ref={aboutDropdownRef}>
                <div
                  className="text-white hover:text-yellow-100 cursor-pointer flex items-center justify-center"
                  onClick={toggleAboutDropdown}
                >
                  AboutUs
                  <TiArrowSortedDown
                    className={`w-5 h-5 relative md:block hidden
                    ${showAboutDropdown ? "rotate-180 duration-300" : ""}`}
                  />
                </div>
                {
                  <div
                    className={`md:absolute top-full left-0  md:p-2 md:mt-1 bg-white rounded shadow block text-md transition-height ${
                      showAboutDropdown
                        ? "transition-visible"
                        : "transition-hidden  "
                    }`}
                  >
                    <ul>
                      <li className="py-1 hover:scale-110 duration-300">
                        <Link
                          href="/about1"
                          className="text-black  hover:text-gray-500"
                        >
                          Staff
                        </Link>
                      </li>
                      <li className="py-1 hover:scale-110 duration-300">
                        <Link
                          href="/about2"
                          className="text-black  hover:text-gray-500"
                        >
                          Company
                        </Link>
                      </li>
                    </ul>
                  </div>
                }
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
