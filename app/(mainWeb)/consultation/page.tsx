import React from "react";
import { Phone } from "./phone";
import { Card } from "./card";

const Home: React.FC = () => {
  return (
    <div className="p-10">
      <h1 className="text-gray-600 font-sans md:text-xl sm:text-lg text-base">
        Consultation
      </h1>
      <div className="py-4">
        <figure>
          <img
            src="https://www.justice.gc.ca/eng/cons/img/banner.jpg"
            alt="Album"
            className="rounded-box shadow-md"
          />
        </figure>
        <p className="text-center m-10">
          Information Technology Center established in 2004 to provide ICT
          related services to the university community. We have expanded our
          service beyond the university domain by providing consultation for the
          organizations, institutes or personals who needs to use information
          technology in achieving their business objectives.
        </p>
        <h2 className="text-base text-center pt-10">OUR SERVICES</h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 xs:grid-row gap-4 m-8 justify-center  pb-10">
          <div className="bg-slate-100 rounded-box mx-6 shadow-md border-1 border-blue-950 hover:bg-cyan-100">
            <p className="text-center justify-center p-3 mx-4">
              Identifying Business Needs
            </p>
          </div>
          <div className="bg-slate-100 rounded-box mx-6 shadow-md border-1 border-blue-950 hover:bg-cyan-100">
            <p className="text-center justify-center p-3 mx-4">
              Designing & Implementing IT Solutions
            </p>
          </div>
          <div className="bg-slate-100 rounded-box mx-6 shadow-md border-1 border-blue-950 hover:bg-cyan-100">
            <p className="text-center justify-center p-3 mx-4">
              Training Employees on How to use IT Systems
            </p>
          </div>
          <div className="bg-slate-100 rounded-box mx-6 shadow-md border-1 border-blue-950 hover:bg-cyan-100">
            <p className="text-center justify-center p-3 mx-4">
              Providing Support for IT Systems
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-10 bg-blue-300">
          <div className="bg-blue-600">01</div>

          <div className="bg-blue-800">09</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
