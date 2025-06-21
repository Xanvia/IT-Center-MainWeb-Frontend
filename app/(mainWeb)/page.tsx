import dynamic from "next/dynamic";
import { Carousel } from "./components/sections/carousal";
import { MainLink } from "./components/sections/mainLink";
import { PiArrowRightBold } from "react-icons/pi";
import { Image as ImageNU } from "@nextui-org/react";
import Image from "next/image";
import FAQ from "./components/sections/faq";
import FAQForm from "./components/forms/faqForm";
import Statistics from "./components/sections/statistics";
import NewsCards from "./components/sections/newsCardSection";
import Link from "next/link";
import {
  aboutServicePara,
  introductionPara,
} from "@/CONSTANT_DATA/A.homePageData";
import CourseSection from "./components/sections/courseSection";
import ProjectSlider from "./components/sections/ProjectSlider";

const BotClient = dynamic(
  () => import("./components/clientComponents/BotClient"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      {/* header   body */}
      <div className=" w-full">
        <div
          className="h-[21rem] flex flex-row justify-between relative bg-cover bg-center"
          style={{
            backgroundImage: "url('/Slide/first.png')",
          }}
        >
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>

          <div className="md:ml-20 md:mt-20 ml-5 mt-10 z-10 relative">
            <div>
              <h1 className="md:text-5xl sm:text-3xl text-3xl text-white font-rubik">
                Welcome to IT Center
              </h1>
              <h3 className="mt-3 ml-1 text-yellow-100 font-sans md:text-xl font-semibold sm:text-lg text-base">
                Empowering your
                <span className="text-white"> Digital</span> Journey...
              </h3>
            </div>
            <div className="mt-10 md:space-x-5">
              <Link href={"/dashboard"}>
                <button className="bg-yellow-100 hover:bg-transparent text-maroon border-maroon hover:text-yellow-200 font-bold py-2 px-4 border hover:border-yellow-200 rounded-lg sm:inline-block block w-52 md:w-auto">
                  Dashboard
                </button>
              </Link>

              <Link href={"/dashboard/courseRegistration"}>
                <button className="backdrop-blur-md hover:bg-yellow-200 text-yellow-200 font-bold hover:border-transparent hover:text-maroon py-2 px-4 border border-yellow-200 rounded-lg my-5 md:my-0 w-52 md:w-auto">
                  Course Registration
                </button>
              </Link>
            </div>
          </div>

          {/* bot animation  */}
          <div className="hidden sm:block z-10 relative">
            <BotClient />
          </div>
        </div>

        {/* curve line  */}
        <div className="shapedividers_com-5853 h-24 bg-gray-200"></div>
      </div>

      {/* Main Quick Links */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-y-5 justify-center pt-1  pb-20 px-4 bg-gray-200 ">
        <MainLink />
      </div>

      {/* Vision and Photo Slide */}
      <div className="bg-maroon md:py-20 pt-20 pb-14">
        <div className="text-white text-center md:mt-10">
          <h1 className="text-5xl font-rubik">
            Innovative IT Solutions for{" "}
            <div className="inline-block from-yellow-500 to-yellow-200 bg-clip-text text-transparent bg-gradient-to-b">
              You & Your Business
            </div>
          </h1>
          <p className="md:m-10 m-5 md:text-xl text-sm md:mx-20 md:mt-10 text-slate-400">
            {introductionPara}
          </p>
        </div>
        <div className="md:mx-10 lg:mx-28 md:my-28 mt-12 mx-2">
          <Carousel />
        </div>
      </div>

      {/* Course Section */}
      <CourseSection />

      {/* Project section  */}
      <section className="md:p-14 py-10 px-5 bg-gray-300 ">
        <h1 className="text-6xl font-rubik mt-5 text-center">
          <div>
            Delivering{" "}
            <span className="from-red-950 to-red-700 bg-clip-text text-transparent bg-gradient-to-t">
              The Optimized
            </span>{" "}
          </div>
          <div className="mt-3">Services and Projects</div>
        </h1>
        <p className="md:m-10 m-3 md:text-xl text-lg md:mx-20 md:mt-5 text-slate-500 text-center">
          {aboutServicePara}
        </p>

        <ProjectSlider />
      </section>

      {/* Rest of the content remains the same */}
      {/* News Section */}
      <div className="py-10 md:p-7 px-2 text-center bg-gray-100">
        <h1 className="text-6xl font-rubik sm:my-10 my-5">
          <span className="from-red-600 to-yellow-500 bg-clip-text text-transparent bg-gradient-to-b">
            News{" "}
          </span>
          & Events
        </h1>

        <NewsCards />

        <button>
          <div className="flex items-center justify-center group mb-10">
            <span className="mr-0 sm:text-2xl text-xl text-red-800 hover:text-red-700">
              More news
            </span>
            <Link href={"/news"}>
              <PiArrowRightBold
                color="maroon"
                className="group-hover:translate-x-2 duration-300 text-xl"
              />
            </Link>
          </div>
        </button>
      </div>

      {/* FAQ Section */}
      <div className="h-full bg-maroon lg:grid grid-cols-3 p-6 relative">
        <div className="absolute -left-80 -top-10 z-10 lg:block hidden ">
          <Image src="/common/robot.svg" height={900} width={900} alt="robot" />
        </div>
        <div className="w-max"></div>

        <div className="col-span-2 mt-10 flex md:block flex-col items-center">
          <h1 className="text-5xl font-rubik my-7 text-white sm:text-left text-center">
            <div>
              Your Questions{" "}
              <div className="from-yellow-200 to-yellow-400 bg-clip-text text-transparent bg-gradient-to-t text-center">
                Our Solutions...
              </div>{" "}
            </div>
          </h1>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 my-12 sm:max-w-max max-w-md">
            <FAQ />
            <div className="bg-gray-300 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Ask a Question</h2>
              <p className="mb-4">Ask anything about the IT Center</p>
              <FAQForm />
            </div>
          </div>
        </div>
      </div>

      {/* statistics  */}
      <div className="bg-white py-10">
        <Statistics />
      </div>
    </main>
  );
}
