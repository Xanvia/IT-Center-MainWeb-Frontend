"use client";

import { useState, useEffect } from "react";
import { Link, Input } from "@nextui-org/react";
import CourseCard from "./courseCard";
import { toast } from "@/hooks/use-toast";
import { Loader, Search } from "lucide-react";
import { useSession } from "next-auth/react";

interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  description: string;
  images: string;
  duration: string;
  fees: number;
  startingDate: string;
  endingDate: string;
  audience: string;
  instructor: string;
  studentLimit: number;
  registrationDeadline: string;
}

export default function CourseRegistration() {
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [courses, setCourses] = useState<Course[]>([]); // Original courses from backend
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]); // Courses to display
  const { data: session, status } = useSession();

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

  if (status === "loading") {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">
          Course Registration
        </h1>
        {/* centered loading spinner */}
        <div className="flex justify-center items-center h-20 animate-spin">
          <Loader />
        </div>
      </div>
    );
  } else if (
    session?.user?.role !== "ADMIN" &&
    session?.user?.role !== "S_ADMIN"
  ) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">
          Course Registration
        </h1>
        <div className="grid gap-4">
          <p>Sorry :( You are not Authorized to view this page.</p>
        </div>
      </div>
    );
  } else
    return (
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">
          Course Registration
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    registrationDeadline={course.registrationDeadline}
                    fees={course.fees}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
}
