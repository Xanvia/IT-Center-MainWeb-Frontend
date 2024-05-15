"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);

  const toggleServicesDropdown = () => {
    setShowServicesDropdown(!showServicesDropdown);
    setShowAboutDropdown(false);
  };

  const toggleAboutDropdown = () => {
    setShowAboutDropdown(!showAboutDropdown);
    setShowServicesDropdown(false);
  };

  return (
    <nav className="bg-maroon">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center m-3">
            <Image
              src="/logo/pera-logo.png"
              width={80}
              height={80}
              alt="Logo"
            />
            <div className="flex flex-col text-white ml-3">
              <h1 className=" text-xl font-semibold ">
                Information Technology Center
              </h1>
              <h2>University of Peradeniya</h2>
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="flex">
            <li className="mr-5">
              <Link href="/home" className="text-white hover:text-gray">
                Home
              </Link>
            </li>
            <li className="mr-5">
              <Link href="/home" className="text-white hover:text-gray">
                Courses
              </Link>
            </li>
            <li className="mr-5 relative">
              <div
                className="text-white hover:text-gray cursor-pointer"
                onClick={toggleServicesDropdown}
              >
                Services
              </div>
              {showServicesDropdown && (
                <div className="absolute top-full left-0 bg-white p-2 rounded shadow mt-1 text-md">
                  <ul>
                    <li className="py-1 ">
                      <Link href="/projects" className="text-black">
                        Projects
                      </Link>
                    </li>
                    <li className="py-1 ">
                      <Link href="/consultations" className=" ">
                        Consultations
                      </Link>
                    </li>
                    <li className="py-1 ">
                      <Link href="/logs" className="">
                        Logs
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="mr-4">
              <Link href="/news" className="text-white hover:text-gray">
                News
              </Link>
            </li>
            <li className="mr-5 relative">
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
                      <Link href="/about1" className="text-gray">
                        Staff
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
