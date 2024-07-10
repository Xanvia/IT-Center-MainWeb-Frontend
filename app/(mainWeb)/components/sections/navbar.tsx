"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HamButton } from "../buttons/hamButton";
import { TiArrowSortedDown } from "react-icons/ti";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const path = usePathname();
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

  // close by path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowServicesDropdown(false);
    setShowAboutDropdown(false);
  }, [path]);

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
            className={`md:flex flex-col text-center w-full text-xl md:text-base md:w-auto md:flex-row items-center dropdown-menu ${
              isMobileMenuOpen
                ? "h-72 opacity-100"
                : "h-0 opacity-0 md:max-h-max md:opacity-100"
            } ${
              isMobileMenuOpen && (showServicesDropdown || showAboutDropdown)
                ? " h-96"
                : ""
            } `}
          >
            <li className=" m-6 md:m-4 md:ml-0">
              <Link href="/" className="text-white hover:text-yellow-100 ">
                Home
              </Link>
            </li>
            <li className="m-6 md:m-4">
              <Link
                href="/courses"
                className={`${
                  path === "/courses"
                    ? "text-yellow-200"
                    : "text-white hover:text-yellow-100"
                }`}
              >
                Courses
              </Link>
            </li>
            <li className="relative m-6 md:m-4 z-10">
              <div ref={servicesDropdownRef}>
                <div
                  className={` cursor-pointer flex items-center justify-center ${
                    path.includes("/services")
                      ? "text-yellow-200"
                      : "text-white hover:text-yellow-100"
                  }`}
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
                    className={`md:absolute top-full left-0 md:p-2 md:mt-1 bg-white rounded shadow block text-md dropdown-menu ${
                      showServicesDropdown
                        ? "h-28 opacity-100"
                        : "h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <ul>
                      <li className="py-1 hover:scale-110  duration-300">
                        <Link
                          href="/services/projects"
                          className="text-black hover:text-gray-500 "
                        >
                          Projects
                        </Link>
                      </li>
                      <li className="py-1 hover:scale-110  duration-300">
                        <Link
                          href="/services/consultations"
                          className="text-black  hover:text-gray-500"
                        >
                          Consultations
                        </Link>
                      </li>
                      <li className="py-1 hover:scale-110 duration-300">
                        <Link
                          href="/services/logs"
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
              <Link
                href="/news"
                className={` ${
                  path === "/news"
                    ? "text-yellow-200"
                    : "text-white hover:text-yellow-100"
                }`}
              >
                News
              </Link>
            </li>
            <li className="relative m-6 md:m-4 z-10">
              <div ref={aboutDropdownRef}>
                <div
                  className={` cursor-pointer flex items-center justify-center ${
                    path.includes("/aboutus")
                      ? "text-yellow-200"
                      : "text-white hover:text-yellow-100"
                  }`}
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
                    className={`md:absolute left-0  md:p-2 md:mt-1 bg-white rounded shadow block text-md dropdown-menu ${
                      showAboutDropdown
                        ? " h-20 opacity-100"
                        : " h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <ul>
                      <li className="py-1 hover:scale-110 duration-300">
                        <Link
                          href="/aboutus/staff"
                          className="text-black  hover:text-gray-500"
                        >
                          Staff
                        </Link>
                      </li>
                      <li className="py-1 hover:scale-110 duration-300">
                        <Link
                          href="/aboutus/aboutUs"
                          className="text-black  hover:text-gray-500"
                        >
                          AboutUs
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
