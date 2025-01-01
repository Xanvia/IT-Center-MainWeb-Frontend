"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ReservationHeader: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="text-white p-4 bg-maroon">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-2xl font-bold" href="/reservation">
          IT Center <span className="text-yellow-500">Reservations</span>
        </Link>
        <nav className="space-x-4">
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
        </nav>
      </div>
    </header>
  );
};

export default ReservationHeader;
