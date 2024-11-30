"use client";

import { useState, useMemo, useEffect } from "react";
import { Link, Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import CourseCard from "../../courseRegistration/courseCard";

export default function CourseRegistration() {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3001/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch courses"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, courses]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold my-4 mt-2 text-center text-maroon">
        Course Registration
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

        {isLoading ? (
          <div className="text-center py-8">Loading courses...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Link
                href={`/dashboard/courseRegistration/${course.courseCode}`}
                key={course.courseCode}
              >
                <div className="max-w-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <CourseCard
                    courseImage={course.images[0]}
                    courseCode={course.courseCode}
                    courseName={course.courseName}
                    courseID={""}
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
