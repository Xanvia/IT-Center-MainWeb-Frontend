"use client";

import Bot from "./components/bots/bot";
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
  aboutCoursePara,
  aboutServicePara,
  introductionPara,
  projectDetails,
} from "@/constants/homePageData";
import { Key, useEffect, useState } from "react";
import CourseCard, { Course } from "./courses/courseCardMain";
import { toast } from "@/hooks/use-toast";

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);

  // Fetch Courses from the server at the start
  useEffect(() => {
    console.log("Fetching Courses...");
    const fetchCourses = async () => {
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses`
        );
        if (result.ok) {
          const data = await result.json();
          setCourses(data);
        } else {
          toast({ description: "Failed to fetch courses" });
        }
      } catch (error) {
        toast({ description: "Failed to fetch courses" });
      }
    };

    fetchCourses();
  }, []);

  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      {/* header body */}
      <div className="bg-maroon h-80 flex flex-row justify-between">
        <div className="md:ml-20 md:mt-20 ml-5 mt-10">
          <div>
            <h1 className="md:text-5xl sm:text-3xl text-3xl text-white font-rubik">
              Welcome to IT Center
            </h1>
            <h3 className="mt-3 ml-1 text-gray-300 font-sans md:text-xl  sm:text-lg text-base">
              Empowering your digital journey
            </h3>
          </div>
          <div className="mt-10 md:space-x-5">
            <Link href={"/dashboard"}>
              <button className="bg-yellow-200 hover:bg-maroon text-gray-900 hover:text-yellow-200 font-bold py-2 px-4 border border-yellow-200 rounded-lg sm:inline-block block w-52 md:w-auto">
                Dashboard
              </button>
            </Link>

            <Link href={"/dashboard/courseRegistration"}>
              <button className="bg-transparent hover:bg-yellow-200 text-yellow-200 font-semibold hover:text-maroon py-2 px-4 border border-yellow-200 hover:border-transparent rounded-lg my-5 md:my-0 w-52 md:w-auto">
                Course Registration
              </button>
            </Link>
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
      <div className="md:p-10 p-5 text-center bg-gray-100">
        <div className="text-6xl font-rubik mt-5 sm:mt-10 lg:grid gird-cols-6 text-left text-darkmaroon">
          <div className="inline-block col-start-3 col-span-3 ">
            We Provide You The
          </div>
          <div className="inline-block col-start-4 md:mt-3">
            <div className="">
              Best of{" "}
              <div className="inline-block from-yellow-500 to-red-700 bg-clip-text text-transparent bg-gradient-to-b">
                The Best
              </div>{" "}
              Courses...
            </div>
          </div>
        </div>
        <p className="md:m-10 m-5 md:text-lg text-medium md:mx-20 md:mt-10 mx-7 text-maroon">
          {aboutCoursePara}
        </p>
        {/*
        <div className="flex sm:flex-row flex-col space-y-4 sm:space-y-0 sm:space-x-5 my-14 justify-center">
          <HCourseCard />
          <HCourseCard />
          <HCourseCard />
        </div>
         */}

        <div className="flex sm:flex-row flex-col space-y-4 sm:space-y-0 sm:space-x-5 my-14 justify-center md:gap-10 sm:gap-6">
          {courses.slice(0, 3).map((course) => (
            <Link
              href={`/dashboard/courseRegistration/${course.id}`}
              key={course.id}
            >
              <div className="max-w-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CourseCard
                  image={course.images[0]}
                  courseCode={course.courseCode}
                  courseName={course.courseName}
                  id={""}
                />
              </div>
            </Link>
          ))}
        </div>
        <button>
          <div className="flex items-center justify-center group">
            <span className="mr-0 text-2xl text-red-800 hover:text-red-700">
              more courses
            </span>
            <Link href={"/dashboard/courseRegistration"}>
              <PiArrowRightBold
                color="maroon"
                className="group-hover:translate-x-2 duration-300 text-xl"
              />
            </Link>
          </div>
        </button>
      </div>

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
        <div className="sm:grid grid-cols-11 md:my-10 my-6 flex flex-col-reverse justify-center">
          <div className="md:mt-5 mt-2 md:mr-4 lg:mr-5 col-span-6">
            <h1 className="md:text-5xl text-3xl font-rubik">
              <span className="from-red-950 to-red-700 bg-clip-text text-transparent bg-gradient-to-t">
                Digitized
              </span>
              <span className="md:inline-block from-blue-900 to-blue-600 bg-clip-text text-transparent bg-gradient-to-t py-2">
                {" "}
                Action Plan Tracking system{" "}
              </span>
              <span className="from-red-950 to-red-700 bg-clip-text text-transparent bg-gradient-to-t">
                for the University of Peradeniya
              </span>
            </h1>
            <p className="md:mt-10 mt-7 text-justify text-slate-500 font-medium sm:font-normal">
              {projectDetails}
            </p>
            <button className="mt-10 flex w-full sm:justify-normal justify-center">
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
          <div className="sm:m-4 items-center justify-center flex col-span-5 ">
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
