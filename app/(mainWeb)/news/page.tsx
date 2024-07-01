import React from "react";
import { NCard } from "./newsCard";

const Home: React.FC = () => {
  return (
    <div className="p-10">
      <h1 className=" font-sans md:text-xl sm:text-lg text-base">News</h1>
      <br />
      <div className="">
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
