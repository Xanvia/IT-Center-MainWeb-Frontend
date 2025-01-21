"use client";

import { useState, useEffect } from "react";
import { Link, Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CourseCard, { Course } from "./CourseCardMain";

export default function CourseRegistration() {
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [courses, setCourses] = useState<Course[]>([]); // Original courses from backend
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]); // Courses to display

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
          setCourses(data); // Save original courses
          setFilteredCourses(data); // Initially display all courses
        } else {
          toast({ description: "Failed to fetch courses" });
        }
      } catch (error) {
        toast({ description: "Failed to fetch courses" });
      }
    };

    fetchCourses();
  }, []);

  // Update displayed courses whenever searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      // Show all courses when searchQuery is empty
      setFilteredCourses(courses);
    } else {
      // Filter courses by searchQuery
      setFilteredCourses(
        courses.filter((course) =>
          course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, courses]);

  return (
    <div className="container mx-auto lg:px-28 py-8 md:px-4 md:py-4">
      <h1 className="text-2xl font-bold my-4 mt-4 text-center text-maroon">
        Course Overview
      </h1>

      {/* Search Bar */}
      <div className="shadow-lg rounded-lg p-6 bg-white">
        <div className="mb-6">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search courses by name..."
            startContent={<Search className="text-default-400" />}
            value={searchQuery}
            onValueChange={(value) => setSearchQuery(value)}
          />
        </div>

        {/* Display Courses */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-2">
          {filteredCourses.map((course) => (
            <Link
              href={`/dashboard/courseRegistration/${course.id}`}
              key={course.id}
            >
              <div className="max-w-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CourseCard
                  image={course.images[0]}
                  courseCode={course.courseCode}
                  courseName={course.courseName}
                  id={course.id}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
