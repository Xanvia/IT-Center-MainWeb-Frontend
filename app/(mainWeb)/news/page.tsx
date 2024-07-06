import React from "react";
import { NCard } from "./newsCard";

const Home: React.FC = () => {
  return (
    <div className="p-10">
      <h1 className=" from-red-700 to-gray-800 bg-clip-text text-transparent bg-gradient-to-t font-bold md:text-3xl sm:text-lg text-center gird">
        News
      </h1>
      <div className="flex justify-center mt-1">
        <div className="bg-yellow-600 h-1 md:w-36 rounded-md"></div>
      </div>
      <br />
      <div className="pb-10">
        <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1">
          <NCard />
          <NCard />
          <NCard />
          <NCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
