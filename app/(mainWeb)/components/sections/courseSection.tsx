"use client";

import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Course } from "@/utils/types";
import { aboutCoursePara } from "@/CONSTANT_DATA/homePageData";
import Link from "next/link";
import CourseCard from "../../courses/courseCardMain";
import { PiArrowRightBold } from "react-icons/pi";

export default function CourseSection() {
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
            More courses
          </span>
          <Link href={"/courses"}>
            <PiArrowRightBold
              color="maroon"
              className="group-hover:translate-x-2 duration-300 text-xl"
            />
          </Link>
        </div>
      </button>
    </div>
  );
}
