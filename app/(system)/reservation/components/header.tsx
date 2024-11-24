import Link from "next/link";
import React from "react";

const ReservationHeader: React.FC = () => {
  return (
    <header className="text-white p-4 bg-maroon">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-2xl font-bold" href="/">
          IT Center <span className="text-yellow-500">Reservations</span>
        </Link>
        <nav className="space-x-4">
          <Link className="hover:text-yellow-500" href="/">
            Home
          </Link>
          <Link className="hover:text-yellow-500" href="/about">
            About
          </Link>
          <Link className="hover:text-yellow-500" href="/contact">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default ReservationHeader;
