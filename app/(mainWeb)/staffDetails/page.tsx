import React from "react";
import { StaffCard } from "./staffCard";

export default function contact() {
  return (
    <div className="p-10">
      <div className="bg-slate-400">
        <h2 className="text-gray-600 font-sans md:text-xl sm:text-lg text-base text-center">
          ADMINISTRATION
        </h2>
        <br />
        <div className="items-center">
          <StaffCard />
        </div>
      </div>
    </div>
  );
}
