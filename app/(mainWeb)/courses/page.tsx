import React from "react";
import { Options } from "./options";
import HCourseCard from "../components/cards/hCourseCard";

const Home: React.FC = () => {
  return (
    <div className="p-10">
      <h1 className="text-gray-600 font-sans md:text-xl sm:text-lg text-base">
        Course Overview
      </h1>
      <br />

      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab h-10"
          aria-label="Undergraduate"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <Options />
          <br />
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 p-5">
            <div className="">
              <HCourseCard />
            </div>
            <div className="">
              <HCourseCard />
            </div>
            <div className="">
              <HCourseCard />
            </div>
            <div className="">
              <HCourseCard />
            </div>
            <div className="">
              <HCourseCard />
            </div>
          </div>
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab h-10"
          aria-label="OPENED"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <Options />
          <br />
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 p-5">
            <div className="">
              <HCourseCard />
            </div>
            <div className="">
              <HCourseCard />
            </div>
            <div className="">
              <HCourseCard />
            </div>
            <div className="">
              <HCourseCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
