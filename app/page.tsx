"use client";
import Image from "next/image";
import Bot from "./components/bot";
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

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ name, email, question });
  };
  return (
    <main className="flex min-h-screen flex-col ">
      {/* header body */}
      <div className="bg-maroon h-80 flex flex-row justify-between">
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
      <div className="m-10 text-center">
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
        <p className="md:m-10 m-4 md:text-lg text-sm md:mx-20 md:mt-10 mx-20 text-slate-400">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris."
        </p>
        <div className="flex space-x-5 my-14">
          <HCourseCard />
          <HCourseCard />
          <HCourseCard />
        </div>
        see more
      </div>

      {/* Project section  */}
      <section className="p-10 bg-gray-300">
        <h1 className="text-5xl">Recent Project ...</h1>
        <div className="grid grid-cols-2">
          <div className="mt-5">
            <h1 className="text-2xl">
              Digitized Action Plan Tracking system for the University of
              Peradeniya
            </h1>
            <p>
              IT Center developed a Digitized Action Plan Tracking system for
              the University of Peradeniya.IT Center developed a Digitized
              Action Plan Tracking system for the University of Peradeniya.IT
              Center developed a Digitized Action Plan Tracking system for the
              University of Peradeniya.IT Center developed a Digitized Action
              Plan Tracking system for the University of Peradeniya.
            </p>
            <button>See More</button>
          </div>
          <div>
            <Image
              src={"/image.png"}
              height={800}
              width={800}
              alt="Project Image"
            />
          </div>
        </div>
      </section>

      {/* News Section */}
      <div className="m-10 text-center">
        <h1 className="text-3xl">News & Events</h1>
        <div className="grid grid-cols-4 my-10 gap-5">
          <HNewsCard />
          <HNewsCard />
          <HNewsCard />
          <HNewsCard />
        </div>
        see more
      </div>

      {/* FAQ Section */}
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Common Questions</h2>
            <p className="mb-4">
              Here are some of the most common questions that we get.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">
                  What services do you offer at the IT center?
                </h3>
                <p>
                  We offer a wide range of services including network setup,
                  software development, cyber-security solutions, and IT
                  consulting.
                </p>
              </div>
              <div>
                <h3 className="font-medium">
                  How can I stay updated on the latest news and events?
                </h3>
                <p>
                  You can visit our news and events section on our website or
                  subscribe to our newsletter for regular updates.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Ask a Question</h2>
            <p className="mb-4">Ask anything about the IT Center</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block mb-1">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block mb-1">Question</label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg p-2"
              >
                Submit
              </button>
            </form>
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
