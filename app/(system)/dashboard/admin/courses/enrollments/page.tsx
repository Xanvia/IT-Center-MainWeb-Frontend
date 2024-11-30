"use client";

import { useState, useMemo, Key } from "react";
import { Link, Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import { courses } from "../../../courseRegistration/courseData.";
import CourseCard from "../../../courseRegistration/courseCard";

export default function CourseRegistration() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter((course: { name: string }) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold my-4 mt-2 text-center text-maroon">
        Available Courses
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
          {filteredCourses.map(
            (course: {
              id: Key | null | undefined;
              image: string;
              code: string;
              name: string;
            }) => (
              <Link
                href={`/dashboard/admin/courses/enrollments/${course.id}`}
                key={course.id}
              >
                <div className="max-w-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <CourseCard
                    courseImage={course.image}
                    courseCode={course.code}
                    courseName={course.name}
                    courseID={""}
                  />
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
