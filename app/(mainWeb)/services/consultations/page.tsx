import React from "react";
import ReqServicesForm from "./form";
import { introductionPara, services, serviceTypes } from "./pageDate";

const Home: React.FC = () => {
  return (
    <div className="p-10">
      <h1 className=" from-red-700 to-gray-800 bg-clip-text text-transparent bg-gradient-to-t font-bold md:text-3xl sm:text-lg text-center gird">
        Consultations
      </h1>
      <div className="flex justify-center mt-1">
        <div className="bg-yellow-600 h-1 md:w-36 rounded-md"></div>
      </div>
      <div className="py-4">
        <figure>
          <img
            src="https://www.justice.gc.ca/eng/cons/img/banner.jpg"
            alt="Album"
            className="rounded-box shadow-md"
          />
        </figure>
        <p className="text-center m-10">{introductionPara}</p>
        <h2 className="text-xl text-center pt-10">OUR SERVICES</h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 xs:grid-row gap-4 m-8 justify-center pb-10">
          {services.map((item: serviceTypes) => (
            <div className="bg-slate-100 rounded-box mx-6 shadow-md border-1 border-black hover:bg-maroon hover:text-white">
              <p className="text-center justify-center p-3 mx-4">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className=" border-1 m-14 rounded-box bg-slate-300 shadow-lg p-14">
          <h1 className=" text-xl pb-10 font-semibold">
            Requesting Service Form
          </h1>
          <ReqServicesForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
