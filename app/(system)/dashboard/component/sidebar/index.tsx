import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { HamButton } from "@/app/(mainWeb)/components/buttons/hamButton";
import SidebarLinkGroup from "./linkGroup";
import { Tab } from "./tab";
import { ArrowIcon } from "./arrowIcon";

import {
  MdNotifications,
  MdOutlineDashboard,
  MdOutlineSchool,
  MdOutlineSettings,
  MdPhonelinkSetup,
} from "react-icons/md";
import { FaPeopleArrows, FaPeopleGroup, FaRegPaste } from "react-icons/fa6";
import {
  BsBuildingFill,
  BsBuildingFillAdd,
  BsBuildingFillGear,
} from "react-icons/bs";
import { FaUserCog } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { GrUserManager } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const [sidebarExpanded, setSidebarExpanded] = useState(false);

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

  // useEffect(() => {
  //   localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
  //   if (sidebarExpanded) {
  //     document.querySelector("body")?.classList.add("sidebar-expanded");
  //   } else {
  //     document.querySelector("body")?.classList.remove("sidebar-expanded");
  //   }
  // }, [sidebarExpanded]);

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

      <div className="scrollbar-hide flex flex-col overflow-y-auto duration-300 ease-linear text-gray-300">
        {/* sidebar tab */}
        <nav className=" px-4 py-4 lg:mt-7 lg:px-6">
          {/*  Menu Group */}
          <div>
            {/* Dashboard */}
            <div className="mb-6 flex flex-col gap-1.5 font-medium">
              <Tab pathname="/dashboard">
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
                <Tab pathname="/dashboard/courseRegistration">
                  <div className="flex justify-center w-5">
                    <FaRegPaste size={18} />
                  </div>
                  Registration
                </Tab>
              </li>
              {/* Enrolled Courses */}
              <li>
                <Tab pathname="/dashboard/enrolledCourses">
                  <div className="flex justify-center w-5">
                    <MdOutlineSchool size={20} />
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
                <Tab pathname="/dashboard/profile">
                  <div className="flex justify-center w-5">
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
            <ul className="mb-6 flex flex-col gap-1.5 font-medium">
              {/* Notification  */}
              <li>
                <Tab pathname="/notification">
                  <div className="flex justify-center w-5">
                    <MdNotifications size={20} />
                  </div>
                  Notification
                </Tab>
              </li>
              {/* Account Settings  */}
              <li>
                <Tab pathname="/settings">
                  <div className="flex justify-center w-5">
                    <MdOutlineSettings size={20} />
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
            <ul className="mb-6 flex flex-col gap-1.5 font-medium">
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
                        <div className="flex justify-center w-5">
                          <BsBuildingFill size={18} />
                        </div>
                        Reservations
                        <ArrowIcon open={open} />
                      </div>
                      <div
                        className={` overflow-hidden dropdown-menu  ${
                          open ? "h-24 opacity-100" : "h-0 opacity-0"
                        }`}
                      >
                        <ul className="mb-5 mt-2 flex flex-col gap-2 pl-6">
                          <li>
                            <Tab pathname="/admin/reservations/requests">
                              <div className="flex justify-center w-5">
                                <BsBuildingFillAdd size={18} />
                              </div>
                              Requests
                            </Tab>
                          </li>
                          <li>
                            <Tab pathname="/admin/reservations/halls">
                              <div className="flex justify-center w-5">
                                <BsBuildingFillGear size={18} />
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
                  <div className="flex justify-center w-5">
                    <MdOutlineSchool size={20} />
                  </div>
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
                        <div className="flex justify-center w-5">
                          <FaPeopleArrows size={22} />
                        </div>
                        Services
                        <ArrowIcon open={open} />
                      </div>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={` overflow-hidden dropdown-menu  ${
                          open ? "h-36 opacity-100" : "h-0 opacity-0"
                        }`}
                      >
                        <ul className="mb-5 mt-1 flex flex-col gap-2 pl-6">
                          <li>
                            <Tab pathname="/dashboard/admin/services/log">
                              <div className="flex justify-center w-5">
                                <FaPeopleGroup size={20} />
                              </div>
                              Logs
                            </Tab>
                          </li>
                          <li>
                            <Tab pathname="/dashboard/admin/services/news">
                              <div className="flex justify-center w-5">
                                <FaPeopleGroup size={20} />
                              </div>
                              News
                            </Tab>
                          </li>
                          <li>
                            <Tab pathname="/dashboard/admin/services/project">
                              <div className="flex justify-center w-5">
                                <FaPeopleGroup size={20} />
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

              <SidebarLinkGroup
                activeCondition={pathname.includes("/admin/users")}
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
                        <div className="flex justify-center w-5">
                          <FaUserCog size={20} />
                        </div>
                        Users
                        <ArrowIcon open={open} />
                      </div>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={` overflow-hidden dropdown-menu  ${
                          open ? "h-36 opacity-100" : "h-0 opacity-0"
                        }`}
                      >
                        <ul className="mb-5 mt-1 flex flex-col gap-2 pl-6">
                          <li>
                            <Tab pathname="/dashboard/admin/users/student">
                              <div className="flex justify-center w-5">
                                <PiStudentBold size={20} />
                              </div>
                              Student
                            </Tab>
                          </li>
                          <li>
                            <Tab pathname="/dashboard/admin/users/staff">
                              <div className="flex justify-center w-5">
                                <GrUserManager size={20} />
                              </div>
                              Staff
                            </Tab>
                          </li>
                          <li>
                            <Tab pathname="/dashboard/admin/users/admin">
                              <div className="flex justify-center w-5">
                                <RiAdminFill size={20} />
                              </div>
                              Admin
                            </Tab>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              <li>
                <Tab pathname="/dashboard/admin/analysis">
                  <div className="flex justify-center w-5">
                    <BiSolidReport size={20} />
                  </div>
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
