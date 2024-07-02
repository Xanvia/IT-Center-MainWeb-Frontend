import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import {
  MdOutlineDashboard,
  MdOutlinePieChart,
  MdPhonelinkSetup,
} from "react-icons/md";
import { HamButton } from "@/app/(mainWeb)/components/buttons/hamButton";
import SidebarLinkGroup from "./linkGroup";
import { Tab } from "./tab";
import { ArrowIcon } from "./arrowIcon";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

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

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

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
              <Tab pathname="/">
                <div>
                  <MdOutlineDashboard size={22} />
                </div>
                Dashboard
              </Tab>
            </div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-100">
              COURSES
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5 font-medium">
              {/* Registration */}
              <li>
                <Tab pathname="/courses/registration">
                  <div>
                    <MdOutlinePieChart size={22} />
                  </div>
                  Registration
                </Tab>
              </li>
              {/* Enrolled Courses */}
              <li>
                <Tab pathname="/courses">
                  <div>
                    <MdPhonelinkSetup size={22} />
                  </div>
                  Enrolled Courses
                </Tab>
              </li>
            </ul>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-100">
              PROFILE
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5 font-medium">
              {/* Profile */}
              <li>
                <Tab pathname="/profile">
                  <div>
                    <MdPhonelinkSetup size={22} />
                  </div>
                  Profile
                </Tab>
              </li>
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-100">
              OTHERS
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* Notification  */}
              <li>
                <Tab pathname="/notification">
                  <div>
                    <MdPhonelinkSetup size={22} />
                  </div>
                  Notification
                </Tab>
              </li>
              {/* Account Settings  */}
              <li>
                <Tab pathname="/settings">
                  <div>
                    <MdPhonelinkSetup size={22} />
                  </div>
                  Account Settings
                </Tab>
              </li>
            </ul>
          </div>

          {/* admin options  */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-100">
              ADMIN
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <SidebarLinkGroup
                activeCondition={pathname.includes("reservations")}
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <div
                        className={`group relative flex items-center gap-2 rounded-md px-4 py-2 duration-300 ease-in-out  ${
                          pathname === "/admin/reservations"
                            ? "bg-yellow-400 text-black"
                            : "hover:bg-gray-400 hover:text-black"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        Reservations
                        <ArrowIcon open={open} />
                      </div>
                      <div
                        className={`absolute overflow-hidden dropdown-menu${
                          open ? "border h-32 opacity-100" : "h-0 opacity-0"
                        }`}
                      >
                        <ul className="mb-5 mt-4 flex flex-col gap-2 pl-6">
                          <li>
                            <Tab pathname="/admin/reservations/requests">
                              <div>
                                <MdPhonelinkSetup size={22} />
                              </div>
                              Requests
                            </Tab>
                          </li>
                          <li>
                            <Tab pathname="/admin/reservations/halls">
                              <div>
                                <MdPhonelinkSetup size={22} />
                              </div>
                              Labs & Halls
                            </Tab>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              <li>
                <Tab pathname="/admin/courses">
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812ZM1.77178 8.21245H4.1624V10.9968H1.77178V8.21245ZM5.42803 8.21245H8.38115V10.9968H5.42803V8.21245ZM8.38115 12.2625V15.0187H5.42803V12.2625H8.38115ZM9.64678 12.2625H12.5999V15.0187H9.64678V12.2625ZM9.64678 10.9968V8.21245H12.5999V10.9968H9.64678ZM13.8374 8.21245H16.228V10.9968H13.8374V8.21245ZM2.2499 4.24683H3.7124V4.83745C3.7124 5.17495 3.99365 5.48433 4.35928 5.48433C4.7249 5.48433 5.00615 5.20308 5.00615 4.83745V4.24683H13.0499V4.83745C13.0499 5.17495 13.3312 5.48433 13.6968 5.48433C14.0624 5.48433 14.3437 5.20308 14.3437 4.83745V4.24683H15.7499C16.0312 4.24683 16.2562 4.47183 16.2562 4.75308V6.94683H1.77178V4.75308C1.77178 4.47183 1.96865 4.24683 2.2499 4.24683ZM1.77178 14.5125V12.2343H4.1624V14.9906H2.2499C1.96865 15.0187 1.77178 14.7937 1.77178 14.5125ZM15.7499 15.0187H13.8374V12.2625H16.228V14.5406C16.2562 14.7937 16.0312 15.0187 15.7499 15.0187Z"
                      fill=""
                    />
                  </svg>
                  Courses
                </Tab>
              </li>

              <SidebarLinkGroup
                activeCondition={pathname.includes("/admin/services")}
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <div
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/forms" ||
                            pathname.includes("forms")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.43425 7.5093H2.278C2.44675 7.5093 2.55925 7.3968 2.58737 7.31243L2.98112 6.32805H5.90612L6.27175 7.31243C6.328 7.48118 6.46862 7.5093 6.58112 7.5093H7.453C7.76237 7.48118 7.87487 7.25618 7.76237 7.03118L5.428 1.4343C5.37175 1.26555 5.3155 1.23743 5.14675 1.23743H3.88112C3.76862 1.23743 3.59987 1.29368 3.57175 1.4343L1.153 7.08743C1.0405 7.2843 1.20925 7.5093 1.43425 7.5093ZM4.47175 2.98118L5.3155 5.17493H3.59987L4.47175 2.98118Z"
                            fill=""
                          />
                          <path
                            d="M10.1249 2.5031H16.8749C17.2124 2.5031 17.5218 2.22185 17.5218 1.85623C17.5218 1.4906 17.2405 1.20935 16.8749 1.20935H10.1249C9.7874 1.20935 9.47803 1.4906 9.47803 1.85623C9.47803 2.22185 9.75928 2.5031 10.1249 2.5031Z"
                            fill=""
                          />
                          <path
                            d="M16.8749 6.21558H10.1249C9.7874 6.21558 9.47803 6.49683 9.47803 6.86245C9.47803 7.22808 9.75928 7.50933 10.1249 7.50933H16.8749C17.2124 7.50933 17.5218 7.22808 17.5218 6.86245C17.5218 6.49683 17.2124 6.21558 16.8749 6.21558Z"
                            fill=""
                          />
                          <path
                            d="M16.875 11.1656H1.77187C1.43438 11.1656 1.125 11.4469 1.125 11.8125C1.125 12.1781 1.40625 12.4594 1.77187 12.4594H16.875C17.2125 12.4594 17.5219 12.1781 17.5219 11.8125C17.5219 11.4469 17.2125 11.1656 16.875 11.1656Z"
                            fill=""
                          />
                          <path
                            d="M16.875 16.1156H1.77187C1.43438 16.1156 1.125 16.3969 1.125 16.7625C1.125 17.1281 1.40625 17.4094 1.77187 17.4094H16.875C17.2125 17.4094 17.5219 17.1281 17.5219 16.7625C17.5219 16.3969 17.2125 16.1156 16.875 16.1156Z"
                            fill="white"
                          />
                        </svg>
                        Services
                        <ArrowIcon open={open} />
                      </div>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Tab pathname="/admin/services/log">
                              <div>
                                <MdPhonelinkSetup size={22} />
                              </div>
                              Logs
                            </Tab>
                          </li>
                          <li>
                            <Tab pathname="/admin/services/news">
                              <div>
                                <MdPhonelinkSetup size={22} />
                              </div>
                              News
                            </Tab>
                          </li>
                          <li>
                            <Tab pathname="/admin/services/project">
                              <div>
                                <MdPhonelinkSetup size={22} />
                              </div>
                              Project
                            </Tab>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              <li>
                <Tab pathname="/admin/analysis">
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                      fill=""
                    />
                    <path
                      d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                      fill=""
                    />
                  </svg>
                  Analysis
                </Tab>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};
