"use client";

import { useState, useMemo } from "react";
import { Tabs, Tab, Link, Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import CourseCard from "./courseCard";
import { Course, courses } from "./courseData";

export default function CourseRegistration() {
  const [selectedCategory, setSelectedCategory] = useState("undergraduate");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [courses, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold my-4 mt-2 text-center">
        Course Registration
      </h1>

      <div className="shadow-lg rounded-lg p-6 bg-white">
        {/*
        <Tabs
          aria-label="Course Categories"
          selectedKey={selectedCategory}
          onSelectionChange={(key) => setSelectedCategory(key as string)}
          className="mb-8"
        >
          <Tab key="undergraduate" title="Undergraduate" />
          <Tab key="external" title="External" />
        </Tabs>
         */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              href={`/dashboard/courseRegistration/${course.id}`}
              key={course.id}
            >
              <div className="max-w-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CourseCard
                  key={course.id}
                  id={course.id}
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
