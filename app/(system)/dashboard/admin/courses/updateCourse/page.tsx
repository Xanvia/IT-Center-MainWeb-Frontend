"use client";

import { useState, useMemo } from "react";
import { Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import { courses } from "../../../courseRegistration/courseData.";
import CourseCard from "./courseCard";

export default function CourseRegistration() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold my-4 mt-2 text-center text-maroon">
        Update Courses
      </h1>

      <div className="shadow-lg rounded-lg p-6 bg-white">
        <div className="mb-6">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search courses..."
            startContent={<Search className="text-default-400" />}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              image={course.image}
              code={course.code}
              name={course.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
