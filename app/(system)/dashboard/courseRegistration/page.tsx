"use client";

import { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import CourseCard from "./courseCard"; // Import the reusable CourseCard component

interface Course {
  id: string;
  image: string;
  code: string;
  name: string;
  description: string;
  duration: string;
  lecturer: string;
  fee: number;
}

export const undergraduateCourses: Course[] = [
  {
    id: "1",
    image: "/common/mainWeb.jpg",
    code: "CSC1010",
    name: "Introduction to Computer Science",
    description: "A foundational course covering basic programming concepts.",
    duration: "3 months",
    lecturer: "Dr. Jane Smith",
    fee: 500,
  },
  {
    id: "2",
    image: "/common/mainWeb.jpg",
    code: "MAT2010",
    name: "Linear Algebra",
    description: "Study of linear equations, matrices, and vector spaces.",
    duration: "4 months",
    lecturer: "Prof. John Doe",
    fee: 600,
  },
  {
    id: "3",
    image: "/common/mainWeb.jpg",
    code: "CSC1010",
    name: "Introduction to Computer Science",
    description: "A foundational course covering basic programming concepts.",
    duration: "3 months",
    lecturer: "Dr. Jane Smith",
    fee: 500,
  },
  {
    id: "4",
    image: "/common/mainWeb.jpg",
    code: "MAT2010",
    name: "Linear Algebra",
    description: "Study of linear equations, matrices, and vector spaces.",
    duration: "4 months",
    lecturer: "Prof. John Doe",
    fee: 600,
  },
  // Add more undergraduate courses as needed
];

export const externalCourses: Course[] = [
  {
    id: "5",
    image: "/common/mainWeb.jpg",
    code: "BUS3010",
    name: "Business Management",
    description: "Overview of business management principles and practices.",
    duration: "2 months",
    lecturer: "Dr. Emily Brown",
    fee: 450,
  },
  {
    id: "6",
    image: "/common/mainWeb.jpg",
    code: "ART1052",
    name: "Digital Art and Design",
    description: "Introduction to digital art tools and design principles.",
    duration: "3 months",
    lecturer: "Prof. Michael Chen",
    fee: 550,
  },
  // Add more external courses as needed
];

export default function CourseRegistration() {
  const [selectedCategory, setSelectedCategory] = useState("undergraduate");

  const courses =
    selectedCategory === "undergraduate"
      ? undergraduateCourses
      : externalCourses;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold my-4 mt-2 text-center">
        Course Registration
      </h1>

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
