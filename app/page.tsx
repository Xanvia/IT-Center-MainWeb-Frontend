"use client";

import HCourseCard from "./components/cards/hCourseCard";
import { Carousel } from "./components/carousal";
import { MainLink } from "./components/mainLink";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col ">
      {/* header body */}
      <div className="bg-maroon h-96 flex flex-row justify-between">
        <div className="md:ml-20 md:mt-20 ml-5 mt-10">
          <div>
            <h1 className="md:text-5xl sm:text-3xl text-2xl text-white font-vietnam">
              Welcome to Our IT Center
            </h1>
            <h3 className="mt-3 ml-1 text-gray-300 font-sans md:text-xl  sm:text-lg text-base">
              Empowering your digital journey
            </h3>
          </div>
          <div className="mt-10 md:space-x-5">
            <button className="bg-yellow-200 hover:bg-yellow-700 text-gray-900 font-bold py-2 px-4 border border-yellow-300 rounded-lg sm:inline-block block w-52 md:w-auto">
              Dashboard
            </button>
            <button className="bg-transparent hover:bg-yellow-600 text-yellow-200 font-semibold hover:text-maroon py-2 px-4 border border-yellow-200 hover:border-transparent rounded-lg my-5 md:my-0 w-52 md:w-auto">
              Course Registration
            </button>
          </div>
        </div>

        {/* bot animation  */}
        <div className="hidden sm:block">
          <Player
            autoplay
            loop
            src="/animation/bot.json"
            style={{ height: "350px", width: "350px" }}
          ></Player>
        </div>
      </div>

      {/* Main Quick Links */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-y-5 justify-center my-7 mx-4 bg-gray-200 ">
        <MainLink imgSrc="/animation/courses.json" heading="Courses" />
        <MainLink imgSrc="/animation/reservation.json" heading="Reservations" />
        <MainLink
          imgSrc="/animation/consultation.json"
          heading="Consultations"
        />
        <MainLink imgSrc="/animation/opened.json" heading="O P E N E D" />
      </div>

      {/* Vision and Photo Slide */}

      <div className="bg-maroon py-10">
        <div className="text-white text-center">
          <h1 className="md:text-3xl text-xl">
            Innovative IT Solutions for Your Business
          </h1>
          <p className="md:m-10 m-4 md:text-lg text-sm md:mx-20 text-slate-400">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris."
          </p>
        </div>
        <div className="md:m-40 mx-2">
          <Carousel />
        </div>
      </div>

      {/* Course Section */}
      <div className="m-10 text-center">
        <h1 className="text-3xl">
          We provide you the best of the best courses...
        </h1>
        <p className="m-10 text-lg mx-20 text-slate-400">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris."
        </p>

        <div className="flex space-x-5">
          <HCourseCard />
          <HCourseCard />
          <HCourseCard />
        </div>
      </div>
    </main>
  );
}
