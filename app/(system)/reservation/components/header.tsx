"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SignButtons } from "../../dashboard/component/header/signButtons";
import DropdownProfile from "../../dashboard/component/header/profile";

const ReservationHeader: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="text-white p-4 bg-maroon">
      <div className=" mx-auto flex justify-between font-vietnam items-center">
        <Link className="text-2xl font-bold" href="/reservation">
          IT Center <span className="text-yellow-500">Reservations</span>
        </Link>
        <nav className="flex items-center font-medium text-medium text-gray-300 justify-end space-x-5">
          <Link
            className={`hover:text-yellow-500 ${
              pathname === "/reservation" ? "text-yellow-500" : ""
            }`}
            href="/reservation"
          >
            Home
          </Link>
          <Link
            className={`hover:text-yellow-500 ${
              pathname === "/reservation/my-reservations"
                ? "text-yellow-500"
                : ""
            }`}
            href="/reservation/my-reservations"
          >
            My Reservations
          </Link>
          <Link
            className={`hover:text-yellow-500 ${
              pathname === "/reservation/about" ? "text-yellow-500" : ""
            }`}
            href="/reservation/about"
          >
            About
          </Link>
          <Link
            className={`hover:text-yellow-500 ${
              pathname === "/reservation/contact" ? "text-yellow-500" : ""
            }`}
            href="/reservation/contact"
          >
            Contact
          </Link>
          <div>
            {session && session.user ? (
              <DropdownProfile reservation={true} />
            ) : (
              <SignButtons reservation={true} />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default ReservationHeader;
