import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import {
  MdOutlineDashboard,
  MdOutlineInsertChartOutlined,
  MdOutlineInsertPhoto,
  MdOutlinePieChart,
  MdPhonelinkSetup,
} from "react-icons/md";
import { HamButton } from "../../buttons/hamButton";
// import { HamButton } from "../header/hamButton";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    console.log("event triggered");
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);

    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-20 flex h-screen w-72 flex-col overflow-y-hidden bg-maroon duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* side bar header  */}
      <div className="flex items-center justify-between px-6 py-5 lg:py-6">
        <Link href="/dashboard">
          <Image
            width={75}
            height={75}
            src={"/logo/pera-logo.png"}
            alt="Logo"
            priority
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <HamButton isClicked={sidebarOpen} />
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear text-gray-300">
        {/* sidebar tab */}
        <nav className=" px-4 py-4 lg:mt-7 lg:px-6">
          {/*  Menu Group */}
          <div>
            {/* Dashboard */}
            <div className="mb-6 flex flex-col gap-1.5 font-medium">
              <Link
                href="/"
                className={`flex items-center gap-2 rounded-md px-4 py-2 duration-300 ease-in-out  ${
                  pathname === "/" || pathname.includes("dashboard")
                    ? "bg-yellow-400 text-black"
                    : "hover:bg-gray-400 hover:text-black"
                }`}
              >
                <div>
                  <MdOutlineDashboard size={22} />
                </div>
                Dashboard
              </Link>
            </div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-100">
              PROFILE
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5 font-medium">
              {/* Theme */}
              <li>
                <Link
                  href="/"
                  className={`flex items-center gap-2 rounded-md px-4 py-2 duration-300 ease-in-out  ${
                    pathname.includes("proftheme")
                      ? "bg-cyan-500 text-black"
                      : "hover:bg-gray-400 hover:text-black"
                  }`}
                >
                  <div>
                    <MdOutlinePieChart size={22} />
                  </div>
                  Theme
                </Link>
              </li>
              {/* Update */}
              <li>
                <Link
                  href="/profile"
                  className={`flex items-center gap-2 rounded-md px-4 py-2 duration-300 ease-in-out  ${
                    pathname.includes("profile")
                      ? "bg-primary-sm text-black"
                      : "hover:bg-gray-400 hover:text-black"
                  }`}
                >
                  <div>
                    <MdPhonelinkSetup size={22} />
                  </div>
                  Update
                </Link>
              </li>

              {/* Gallery */}
              <li>
                <Link
                  href="/profile"
                  className={`flex items-center gap-2 rounded-md px-4 py-2 duration-300 ease-in-out  ${
                    pathname.includes("profile")
                      ? "bg-primary-sm text-black"
                      : "hover:bg-gray-400 hover:text-black"
                  }`}
                >
                  <div>
                    <MdOutlineInsertPhoto size={22} />
                  </div>
                  Gallery
                </Link>
              </li>
            </ul>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-100">
              PROFILE
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5 font-medium">
              {/* Theme */}
              <li>
                <Link
                  href="/"
                  className={`flex items-center gap-2 rounded-md px-4 py-2 duration-300 ease-in-out  ${
                    pathname.includes("proftheme")
                      ? "bg-cyan-500 text-black"
                      : "hover:bg-gray-400 hover:text-black"
                  }`}
                >
                  <div>
                    <MdOutlinePieChart size={22} />
                  </div>
                  Theme
                </Link>
              </li>
              {/* Update */}
              <li>
                <Link
                  href="/profile"
                  className={`flex items-center gap-2 rounded-md px-4 py-2 duration-300 ease-in-out  ${
                    pathname.includes("profile")
                      ? "bg-primary-sm text-black"
                      : "hover:bg-gray-400 hover:text-black"
                  }`}
                >
                  <div>
                    <MdPhonelinkSetup size={22} />
                  </div>
                  Update
                </Link>
              </li>

              {/* Gallery */}
              <li>
                <Link
                  href="/profile"
                  className={`flex items-center gap-2 rounded-md px-4 py-2 duration-300 ease-in-out  ${
                    pathname.includes("profile")
                      ? "bg-primary-sm text-black"
                      : "hover:bg-gray-400 hover:text-black"
                  }`}
                >
                  <div>
                    <MdOutlineInsertPhoto size={22} />
                  </div>
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-100">
              OTHERS
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Chart --> */}
              <li>
                <Link
                  href="/chart"
                  className={`flex items-center gap-2 rounded-md px-4 py-2 duration-300 ease-in-out  ${
                    pathname.includes("chart")
                      ? "bg-cyan-500"
                      : "hover:bg-gray-400"
                  }`}
                >
                  <MdOutlineInsertChartOutlined size={22} />
                  Chart
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};
