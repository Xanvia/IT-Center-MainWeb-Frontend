import React from "react";
import ReservationHeader from "./components/header";
import { Toaster } from "@/components/ui/toaster";

interface ReservationLayoutProps {
  children: React.ReactNode;
}

const ReservationLayout: React.FC<ReservationLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <ReservationHeader />
      <main>{children}</main>
      <footer className="bg-maroon text-gray-300 p-2 mt-auto">
        <div className="mx-auto text-center text-small">
          <p>
            &copy; 2025 IT Center Reservations. All rights reserved | powered by
            Xanvia
          </p>
        </div>
        <Toaster />
      </footer>
    </div>
  );
};

export default ReservationLayout;
