import HCourseCard from "@/app/components/cards/hCourseCard";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="bg-white">
      <div role="tablist" className="tabs tabs-lifted py-10 px-20">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="tab1"
        />
        <div
          role="tabpanel"
          className="tab-content bg-gray-300 border-base-300 rounded-box p-6"
        >
          <div className="flex sm:flex-row flex-col space-y-4 sm:space-y-0 sm:space-x-5 my-5 justify-center">
            <HCourseCard />
            <HCourseCard />
            <HCourseCard />
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="tab2"
        />
        <div
          role="tabpanel"
          className="tab-content bg-gray-300 border-base-300 rounded-box p-6"
        >
          <div className="flex sm:flex-row flex-col space-y-4 sm:space-y-0 sm:space-x-5 my-14 justify-center">
            <HCourseCard />
            <HCourseCard />
            <HCourseCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
