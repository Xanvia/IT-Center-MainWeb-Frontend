"use client";

import Bot from "./components/bots/bot";
import HCourseCard from "./components/cards/hCourseCard";
import { Carousel } from "./components/carousal";
import { MainLink } from "./components/mainLink";
import HNewsCard from "./components/cards/hNewsCard";
import { useState } from "react";
import {
  FaGraduationCap,
  FaLaptop,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";
import { PiArrowRightBold } from "react-icons/pi";
import { Image as ImageNU } from "@nextui-org/react";
import Image from "next/image";
import FAQ from "./components/sections/faq";
import FAQForm from "./components/forms/faqForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col ">
      {/* header body */}
      <div className="bg-maroon h-80 flex flex-row justify-between">
        <div className="md:ml-20 md:mt-20 ml-5 mt-10">
          <div>
            <h1 className="md:text-5xl sm:text-3xl text-3xl text-white font-rubik">
              Welcome to Our IT Center
            </h1>
            <h3 className="mt-3 ml-1 text-gray-300 font-sans md:text-xl  sm:text-lg text-base">
              Empowering your digital journey
            </h3>
          </div>
          <div className="mt-10 md:space-x-5">
            <button className="bg-yellow-200 hover:bg-maroon text-gray-900 hover:text-yellow-200 font-bold py-2 px-4 border border-yellow-200 rounded-lg sm:inline-block block w-52 md:w-auto">
              Dashboard
            </button>
            <button className="bg-transparent hover:bg-yellow-200 text-yellow-200 font-semibold hover:text-maroon py-2 px-4 border border-yellow-200 hover:border-transparent rounded-lg my-5 md:my-0 w-52 md:w-auto">
              Course Registration
            </button>
          </div>
        </div>

        {/* bot animation  */}
        <div className="hidden sm:block">
          <Bot />
        </div>
      </div>

      {/* curve line  */}
      <div className="shapedividers_com-5853 h-24 bg-gray-200"></div>

      {/* Main Quick Links */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-y-5 justify-center pt-1  pb-20 px-4 bg-gray-200 ">
        <MainLink imgSrc="/animation/courses.json" heading="Courses" />
        <MainLink
          imgSrc="/animation/reservation.json"
          heading="Reservations"
          options="scale-110 -translate-y-3"
        />
        <MainLink
          imgSrc="/animation/consultation.json"
          heading="Consultations"
          options="translate-y-4 scale-110"
        />
        <MainLink
          imgSrc="/animation/opened.json"
          heading="O P E N E D"
          options="scale-150"
        />
      </div>

      {/* Vision and Photo Slide */}
      <div className="bg-maroon py-20 scroll-smooth">
        <div className="text-white text-center mt-10">
          <h1 className="md:text-5xl  text-xl font-rubik">
            Innovative IT Solutions for{" "}
            <div className="inline-block from-yellow-500 to-yellow-200 bg-clip-text text-transparent bg-gradient-to-b">
              Your Business
            </div>
          </h1>
          <p className="md:m-10 m-4 md:text-xl text-sm md:mx-20 md:mt-10 text-slate-400">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris."
          </p>
        </div>
        <div className="md:m-28 mx-2">
          <Carousel />
        </div>
      </div>

      {/* Course Section */}
      <div className="p-10 text-center bg-gray-100">
        <div className="text-6xl font-rubik mt-10 grid gird-cols-6 text-left text-darkmaroon">
          <div className="inline-block col-start-3 col-span-3 ">
            We Provide You The
          </div>
          <div className="inline-block col-start-4 mt-3">
            <div className="">
              Best of{" "}
              <div className="inline-block from-yellow-500 to-red-700 bg-clip-text text-transparent bg-gradient-to-b">
                The Best
              </div>{" "}
              Courses...
            </div>
          </div>
        </div>
        <p className="md:m-10 m-4 md:text-lg text-sm md:mx-20 md:mt-10 mx-20 text-maroon">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris."
        </p>
        <div className="flex space-x-5 my-14 justify-center">
          <HCourseCard />
          <HCourseCard />
          <HCourseCard />
        </div>
        <button>
          <div className="flex items-center justify-center group">
            <span className="mr-0 text-2xl text-red-800 hover:text-red-700">
              more courses
            </span>
            <PiArrowRightBold
              color="maroon"
              className="group-hover:translate-x-2 duration-300 text-xl"
            />
          </div>
        </button>
      </div>

      {/* Project section  */}
      <section className="p-14 bg-gray-300 ">
        <h1 className="text-6xl font-rubik mt-5 text-center">
          <div>
            Delivering{" "}
            <span className="from-red-950 to-red-700 bg-clip-text text-transparent bg-gradient-to-t">
              The Optimized
            </span>{" "}
          </div>
          <div className="mt-3">Services and Projects</div>
        </h1>
        <p className="md:m-10 m-4 md:text-xl text-sm md:mx-20 md:mt-5 text-slate-500 text-center">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.Lorem ipsum
        </p>
        <div className="grid grid-cols-11 my-10">
          <div className="mt-5 mr-5 col-span-6">
            <h1 className="text-5xl font-rubik">
              <span className="from-red-950 to-red-700 bg-clip-text text-transparent bg-gradient-to-t">
                Digitized
              </span>
              <div className="from-blue-900 to-blue-600 bg-clip-text text-transparent bg-gradient-to-t py-2">
                Action Plan Tracking system
              </div>
              <span className="from-red-950 to-red-700 bg-clip-text text-transparent bg-gradient-to-t">
                for the University of Peradeniya
              </span>
            </h1>
            <p className="mt-10 text-justify text-slate-500 font-medium">
              IT Center developed a Digitized Action Plan Tracking system for
              the University of Peradeniya.IT Center developed a Digitized
              Action Plan Tracking system for the University of Peradeniya.IT
              Center developed a Digitized Action Plan Tracking system for the
              University of Peradeniya.IT Center developed a Digitized Action
              Plan Tracking system for the University of Peradeniya.
            </p>
            <button className="mt-10">
              <div className="flex items-center justify-center text-xl group">
                <span className="mr-0 text-xl text-red-800 hover:text-red-700">
                  more projects
                </span>
                <PiArrowRightBold
                  color="maroon"
                  className="group-hover:translate-x-1 duration-300"
                />
              </div>
            </button>
          </div>
          <div className="m-4 items-center justify-center flex col-span-5 ">
            <ImageNU
              radius="sm"
              isBlurred
              src={"/image.png"}
              height={1024}
              width={1024}
              alt="Project Image"
              className="my-12 h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* News Section */}
      <div className="p-10 text-center bg-gray-100">
        <h1 className="text-6xl font-rubik my-10">
          <span className="from-red-600 to-yellow-500 bg-clip-text text-transparent bg-gradient-to-b">
            News{" "}
          </span>
          & Events
        </h1>
        <div className="grid grid-cols-4 my-16 gap-5">
          <HNewsCard />
          <HNewsCard />
          <HNewsCard />
          <HNewsCard />
        </div>
        <button>
          <div className="flex items-center justify-center group mb-10">
            <span className="mr-0 text-2xl text-red-800 hover:text-red-700">
              more news
            </span>
            <PiArrowRightBold
              color="maroon"
              className="group-hover:translate-x-2 duration-300 text-xl"
            />
          </div>
        </button>
      </div>

      {/* FAQ Section */}
      <div className="h-full bg-maroon grid grid-cols-3 p-6 relative">
        <div className="absolute -left-80 -top-10">
          <Image
            src="/animation/robot.svg"
            height={900}
            width={900}
            alt="robot"
          />
        </div>
        <div className="w-max"></div>

        <div className="col-span-2 mt-10">
          <h1 className="text-5xl font-rubik my-7 text-white">
            <div>
              Your Questions{" "}
              <div className="from-yellow-200 to-yellow-400 bg-clip-text text-transparent bg-gradient-to-t text-center">
                Our Solutions...
              </div>{" "}
            </div>
          </h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <FAQ />
            <div className="bg-gray-300 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Ask a Question</h2>
              <p className="mb-4">Ask anything about the IT Center</p>
              <FAQForm />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-12">
        <h2 className="text-3xl font-semibold text-center mb-8">Statistics</h2>
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <FaGraduationCap className="mx-auto mb-2 text-4xl" />
            <p className="text-xl font-medium">50+</p>
            <p className="text-gray-600">Courses</p>
          </div>
          <div>
            <FaLaptop className="mx-auto mb-2 text-4xl" />
            <p className="text-xl font-medium">20+</p>
            <p className="text-gray-600">Laboratories</p>
          </div>
          <div>
            <FaUsers className="mx-auto mb-2 text-4xl" />
            <p className="text-xl font-medium">35+</p>
            <p className="text-gray-600">Academic Staff</p>
          </div>
          <div>
            <FaUserGraduate className="mx-auto mb-2 text-4xl" />
            <p className="text-xl font-medium">200+</p>
            <p className="text-gray-600">Students</p>
          </div>
        </div>
      </div>
    </main>
  );
}
