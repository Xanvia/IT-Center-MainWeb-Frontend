import HCourseCard from "@/app/components/cards/hCourseCard";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="p-10">
      <h1 className="text-gray-600 font-sans md:text-xl sm:text-lg text-base">
        Course Overview{" "}
      </h1>
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Tab 1"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          Tab content 1
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Tab 2"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          Tab content 2
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Tab 3"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          Tab content 3
        </div>
      </div>
    </div>
  );
};

export default Home;

/*
<div className="mt-5">
        <div className="font-sans text-base">
          <div
            role="tablist"
            aria-label="tabs"
            className="tabs tabs-lifted relative w-max grid grid-cols-2 items-center overflow-hidden bg-gray-900/20 shadow-2xl shadow-900/20 rounded-t-xl transition"
          >
            <input
              type="radio"
              role="tab"
              aria-selected="true"
              aria-controls="panel-1"
              id="tab-1"
              tabIndex={0}
              className="relative block tab rounded-t-xl h-10 px-6"
            >
              <span className="text-gray-800 font-sans text-bas">
                IT Center Courses
              </span>
            </input>
            <div
              role="tabpanel"
              className="tab-content rounded-b-xl h-40 bg-gray-500"
            >
              hello
            </div>
            <input
              type="radio"
              role="tab"
              aria-selected="false"
              aria-controls="panel-2"
              id="tab-2"
              tabIndex={-1}
              className="relative block tab rounded-t-xl-full h-10 px-6"
            >
              <span className="text-gray-800 font-sans">OPENED Courses</span>
            </input>
          </div>
        </div>
      </div>
 */
