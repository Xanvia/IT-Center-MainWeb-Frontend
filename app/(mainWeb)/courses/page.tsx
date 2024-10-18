"use client";

import { useState, useMemo } from "react";
import { Tabs, Tab, Link, Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import CourseCard from "@/app/(system)/dashboard/courseRegistration/courseCard";
import {
  Course,
  externalCourses,
  undergraduateCourses,
} from "@/app/(system)/dashboard/courseRegistration/courseData.";

export default function CourseRegistration() {
  const [selectedCategory, setSelectedCategory] = useState("undergraduate");
  const [searchQuery, setSearchQuery] = useState("");

  const courses: Course[] =
    selectedCategory === "undergraduate"
      ? undergraduateCourses
      : externalCourses;

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [courses, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="from-red-700 to-gray-800 bg-clip-text text-transparent bg-gradient-to-t font-bold md:text-3xl text-xl text-center">
        Course Overview
      </h1>
      <div className="flex justify-center mt-1">
        <div className="bg-yellow-600 h-1 md:w-36 rounded-md"></div>
      </div>
      <br />

      <div className="shadow-lg rounded-lg p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <Tabs
            aria-label="Course Categories"
            selectedKey={selectedCategory}
            onSelectionChange={(key) => setSelectedCategory(key as string)}
          >
            <Tab key="undergraduate" title="Undergraduate" />
            <Tab key="external" title="External" />
          </Tabs>

          <Input
            label="Search Courses"
            placeholder="Enter course name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={
              <Search className="text-default-400 pointer-events-none flex-shrink-0" />
            }
            className="max-w-xs"
            classNames={{
              base: "max-w-full sm:max-w-[44%]",
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
          />
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
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
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No courses found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}
