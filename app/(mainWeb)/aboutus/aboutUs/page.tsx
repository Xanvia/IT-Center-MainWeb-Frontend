import React from "react";
import Directers from "./components/directers/directers";
import Para from "./components/para/para";
import Content from "./components/dropdown/content";
import Pictures from "./components/pic/pictures";

const Home: React.FC = () => {
  return (
    <div className="bg-white ">
      <div className="flex justify-between items-start p-4">
        <Pictures
          imageUrl="/aboutus/aboutus.jpg"
          heading="About Us"
          description="Some essay samples below are by students who chose to write about a challenge, 
          while other examples may be helpful if you’re looking to write about yourself more generally. 
          And yes, a few of these essays did help these students get accepted into the Ivy League, 
          (I’m not telling you which!) though these are all great essays regardless of where (or if) 
          students were admitted to their top choice school."
        />
      </div>
      <div className="py-12">
        <Content />
      </div>
      <div className="bg-yellow-100 py-10 my-10">
        <Para />
      </div>
      <div className="py-10">
        <Directers />
      </div>
    </div>
  );
};

export default Home;
