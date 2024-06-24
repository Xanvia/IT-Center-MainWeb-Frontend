import React from "react";
import CourseCard from "./courseCard";
import cardList from "./courseData";
import { divider } from "@nextui-org/react";

const Home: React.FC = () => {
  return (
    <div className="p-10">
      <h1 className="text-gray-600 font-sans md:text-xl sm:text-lg text-base">
        Course Overview
      </h1>
      <br />
      <div role="tablist" className="tabs tabs-lifted h-11">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab h-10"
          aria-label="Undergraduate Courses"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <div className="grid grid-rows-3 grid-flow-col gap-6">
            <div className="flex flex-row justify-start px-4 space-x-7">
              <CourseCard />
              <CourseCard />
              <CourseCard />
            </div>

            <div className="flex flex-row justify-start px-4 space-x-7">
              <CourseCard />
              <CourseCard />
            </div>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab h-10"
          aria-label="OPENED Courses"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <div className="grid grid-rows-3 grid-flow-col gap-6">
            <div className="flex flex-row justify-start px-4 space-x-7">
              <CourseCard />
              <CourseCard />
            </div>
          </div>
          Tab content 2
        </div>
      </div>
    </div>
  );
};

export default Home;
