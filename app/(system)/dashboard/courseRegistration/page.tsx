"use client";

import { useState, useMemo, Key, useEffect } from "react";
import { Link, Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import CourseCard from "./courseCard";
import { Course, courses } from "./newCourseData";
import { toast } from "@/hooks/use-toast";

const dummyCourse: Course[] = [
  {
    id: "1",
    courseName: "Introduction to Biology",
    courseCode: "CSC1004",
    description: "Learn the basics of Theorms.",
    duration: "8 weeks",
    registrationDeadline: "2024-12-15",
    fees: 200,
    audience: "Beginners, students, professionals",
    instructor: "John Doe",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
    ],
    studentLimit: 30,
    registered: 12,
    startingDate: "2024-12-18",
    endingDate: "2025-02-10",
  },
];

export default function CourseRegistration() {
  //const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>(dummyCourse);

  {
    /* 
    const filteredCourses = useMemo(() => {
    return courses.filter((course: { courseName: string }) =>
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);
    */
  }

  // Fetch Courses from the server at the start
  useEffect(() => {
    console.log("Fetching Courses");
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold my-4 mt-2 text-center text-maroon">
        Course Registration
      </h1>

      {/*// Add a search bar to filter courses*/}
      <div className="shadow-lg rounded-lg p-6 bg-white">
        {/* <div className="mb-6">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search courses..."
            startContent={<Search className="text-default-400" />}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
        </div>*/}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
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
