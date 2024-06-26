import React from "react";
import { Phone } from "./phone";
import { Card } from "./card";

const Home: React.FC = () => {
  return (
    <div className="p-10">
      <h1 className="text-gray-600 font-sans md:text-xl sm:text-lg text-base">
        Consultation
      </h1>
      <div className="py-4 rounded-box">
        <figure className="rounded-box">
          <img
            src="https://www.justice.gc.ca/eng/cons/img/banner.jpg"
            alt="Album"
            className="rounded-box shadow-md"
          />
        </figure>
      </div>
    </div>
  );
};

export default Home;
