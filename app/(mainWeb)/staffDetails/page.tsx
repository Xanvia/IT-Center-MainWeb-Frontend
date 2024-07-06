import React from "react";
import { StaffCard } from "./staffCard";

export default function contact() {
  return (
    <div className="p-10">
      <h1 className="text-gray-600 font-sans md:text-xl sm:text-lg text-base">
        Staff
      </h1>
      {/* Admin Section */}
      <div className="py-10">
        <h2 className=" font-sans md:text-xl sm:text-lg text-base text-center">
          ADMINISTRATION
        </h2>
        <br />
        <div className=" flex flex-row justify-center">
          <StaffCard />
        </div>
        <div className=" py-10 grid lg:grid-cols-2 gap-5 md:grid-cols-1 ">
          <div className=" justify-center flex">
            <StaffCard />
          </div>

          <div className=" justify-center flex">
            <StaffCard />
          </div>
        </div>
      </div>
      {/* Instructors Section */}
      <div className="  py-10">
        <h2 className=" font-sans md:text-xl sm:text-lg text-base text-center">
          INSTRUCTORS
        </h2>
        <br />
        <div className=" py-10 grid lg:grid-cols-3 gap-10 sm:grid-cols-1">
          <div className=" justify-center flex">
            <StaffCard />
          </div>
          <div className=" justify-center flex">
            <StaffCard />
          </div>
          <div className=" justify-center flex">
            <StaffCard />
          </div>
          <div className=" justify-center flex">
            <StaffCard />
          </div>
          <div className=" justify-center flex">
            <StaffCard />
          </div>
          <div className=" justify-center flex">
            <StaffCard />
          </div>
        </div>
      </div>
      {/* Other-staff Section */}
      <div className="  py-10">
        <h2 className=" font-sans md:text-xl sm:text-lg text-base text-center">
          OTHER STAFF
        </h2>
        <br />
        <div className=" py-10 grid lg:grid-cols-3 gap-10 sm:grid-cols-1">
          <div className=" justify-center flex">
            <StaffCard />
          </div>
          <div className=" justify-center flex">
            <StaffCard />
          </div>
        </div>
      </div>
    </div>
  );
}
