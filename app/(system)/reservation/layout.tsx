import React from "react";
import ReservationHeader from "./header";

interface ReservationLayoutProps {
  children: React.ReactNode;
}

const ReservationLayout: React.FC<ReservationLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <ReservationHeader />
      <main>{children}</main>
      <footer className="bg-maroon text-white p-4 mt-5">
        <div className="mx-auto text-center">
          <p>&copy; 2024 IT Center Reservations. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ReservationLayout;
