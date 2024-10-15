"use client";

import { useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import Link from "next/link";

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
    image: "/placeholder.svg?height=200&width=300",
    code: "CS101",
    name: "Introduction to Computer Science",
    description: "A foundational course covering basic programming concepts.",
    duration: "3 months",
    lecturer: "Dr. Jane Smith",
    fee: 500,
  },
  {
    id: "2",
    image: "/placeholder.svg?height=200&width=300",
    code: "MATH201",
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
    id: "3",
    image: "/placeholder.svg?height=200&width=300",
    code: "BUS301",
    name: "Business Management",
    description: "Overview of business management principles and practices.",
    duration: "2 months",
    lecturer: "Dr. Emily Brown",
    fee: 450,
  },
  {
    id: "4",
    image: "/placeholder.svg?height=200&width=300",
    code: "ART105",
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
      <h1 className="text-3xl font-bold my-4 mt-2 text-center">
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
            <Link
              href={`/dashboard/courseRegistration/${course.id}`}
              key={course.id}
            >
              <Card className="max-w-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CardHeader className="p-0">
                  <Image
                    src={course.image}
                    alt={course.name}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardBody>
                  <h2 className="text-xl font-semibold">{course.code}</h2>
                  <p className="text-lg">{course.name}</p>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
