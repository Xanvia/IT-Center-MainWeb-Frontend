import React from "react";
import Directers from "./components/directors";
import Pictures from "./components/pictures";
import { aboutus, aboutUs } from "./data";

const Home: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="flex text-justify items-start px-40">
        <Pictures
          imageUrl="/aboutus/aboutus.jpg"
          heading="About Us"
          description="Information Technology Center is dedicated to empowering individuals and organizations with cutting-edge technology solutions. We provide expert-led courses, state-of-the-art lab facilities, personalized consultations, and innovative online learning platforms. Committed to excellence, we aim to foster growth, innovation, and digital transformation, ensuring our clients and students are equipped to thrive in the ever-evolving tech landscape."
        />
      </div>
      {/* Cards */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 xs:grid-row gap-4 m-8 justify-center pb-10 px-8 py-8">
        {aboutus.map((item: aboutUs) => (
          <div
            key={item.id}
            className="bg-slate-100 rounded-box mx-6 shadow-md border-1 border-black hover:bg-maroon hover:text-white"
          >
            <p className="text-center justify-center p-3 mx-4">
              {item.description}
            </p>
          </div>
        ))}
      </div>
      {/* Implementation para */}
      <div className="bg-yellow-100 py-10 my-10">
        <div className="text-center inline ">
          <div className="headline text-2xl py-4 pb-8 font-semibold">
            Implementation Details and Career
          </div>
          <div className="px-10 pb-2">
            <p className="px-8">
              A new two storied building of floor space of 20,000 square feet
              constructed using the funds available for year 2001 from U.G.C.
              under its special IT project. The completion of the building was
              expected in 2002. As promised by the U.G.C. equipment, furniture,
              services made available from year 2002. The syllabi and other
              details of the main diploma programme were submitted to the Senet
              for its approval. Then Since 2003 to present, the Information
              Technology Center has offered Short Courses, Diploma in basic ITC
              skills and provided IT facilities for Students of the University
              of peradeniya.
            </p>
          </div>
          <div className=" text-sm underline-offset-4 py-4 px-6 ">
            Projects and some important work done by Information Technology
            Center from the beginning is mentioned under Projects.
          </div>
        </div>
      </div>
      {/* Directors */}
      <div className="py-10">
        <Directers />
      </div>
    </div>
  );
};

export default Home;
