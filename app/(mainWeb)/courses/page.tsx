/*"use client";

import { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import CourseCard from "./courseCard"; // Import the reusable CourseCard component
import { undergraduateCourses, externalCourses } from "./courseData";

export default function CourseRegistration() {
  const [selectedCategory, setSelectedCategory] = useState("undergraduate");

  const courses =
    selectedCategory === "undergraduate"
      ? undergraduateCourses
      : externalCourses;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className=" from-red-700 to-gray-800 bg-clip-text text-transparent bg-gradient-to-t font-bold md:text-3xl text-xl text-center gird">
        Course Overview
      </h1>
      <div className="flex justify-center mt-1">
        <div className="bg-yellow-600 h-1 md:w-36 rounded-md"></div>
      </div>
      <br />

      <div className="shadow-lg rounded-lg p-6 bg-white">
        <Tabs
          aria-label="Course Categories"
          selectedKey={selectedCategory}
          onSelectionChange={(key) => setSelectedCategory(key as string)}
          className="mb-8"
        >
          <Tab key="undergraduate" title="Undergraduate" />
          <Tab key="external" title="External" />
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} /> // Use the reusable CourseCard component
          ))}
        </div>
      </div>
    </div>
  );
}
*/

// page.tsx

"use client";

import { useState } from "react";
import { Tabs, Tab, Link } from "@nextui-org/react";

import CourseCard from "@/app/(system)/dashboard/courseRegistration/courseCard";
import {
  Course,
  externalCourses,
  undergraduateCourses,
} from "@/app/(system)/dashboard/courseRegistration/courseData.";

export default function CourseRegistration() {
  const [selectedCategory, setSelectedCategory] = useState("undergraduate");

  const courses: Course[] =
    selectedCategory === "undergraduate"
      ? undergraduateCourses
      : externalCourses;

  return (
    <div className="container mx-auto px-16 py-8">
      <h1 className=" from-red-700 to-gray-800 bg-clip-text text-transparent bg-gradient-to-t font-bold md:text-3xl text-xl text-center gird">
        Course Overview
      </h1>
      <div className="flex justify-center mt-1">
        <div className="bg-yellow-600 h-1 md:w-36 rounded-md"></div>
      </div>
      <br />

      <div className="shadow-lg rounded-lg p-8 bg-white">
        <Tabs
          aria-label="Course Categories"
          selectedKey={selectedCategory}
          onSelectionChange={(key) => setSelectedCategory(key as string)}
          className="mb-8"
        >
          <Tab key="undergraduate" title="Undergraduate" />
          <Tab key="external" title="External" />
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              href={`/dashboard/courseRegistration/${course.id}`}
              key={course.id}
            >
              <div className="max-w-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CourseCard
                  image={course.image}
                  code={course.code}
                  name={course.name}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
