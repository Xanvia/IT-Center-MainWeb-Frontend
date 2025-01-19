"use client";

import { useEffect, useState } from "react";
import { MapPin, Nfc, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import Axios from "@/config/axios";
import CourseModal from "./course-model";
import { z } from "zod";
import { Course } from "../../../courseRegistration/newCourseData";

const courseSchema = z.object({
  courseName: z.string().min(2, "Course name must be at least 2 characters."),
  courseCode: z.string().min(2, "Course code must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  duration: z.string().min(1, "Duration is required."),
  registrationDeadline: z.date({
    required_error: "Registration deadline is required",
  }),
  startingDate: z.date({
    required_error: "Starting date is required",
  }),
  endingDate: z.date({
    required_error: "Ending date is required",
  }),
  studentLimit: z
    .number()
    .int()
    .positive("Student limit must be a positive integer."),
  fees: z.number().positive("Fees must be a positive number."),
  instructor: z.string().min(1, "Instructor name is required."),
  audience: z.string().min(1, "Target audience is required."),
  images: z.array(z.string()).optional(),
});

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

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>(dummyCourse);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Add a new reservation
  const handleAddCourse = (newCourse: Course) => {
    setCourses([...courses, newCourse]);
  };

  // Edit an existing reservation
  const handleEditReservation = (updatedCourse: Course) => {
    setCourses(
      courses.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
  };

  // Delete a course
  const handleDeleteCourse = async (id: string) => {
    try {
      await Axios.delete(`/courses/${id}`);
      toast({ description: "Course deleted successfully" });
    } catch (error) {
      toast({ description: "Failed to delete course" });
    }
    setCourses(courses.filter((r) => r.id !== id));
  };

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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Courses</h1>
        <Button className="bg-maroon" onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Course
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <img
              alt={`Image of ${course.courseName}`}
              className="w-full h-48 object-cover"
              height="100"
              src={course.images[0]}
              style={{
                aspectRatio: "200/100",
                objectFit: "cover",
              }}
              width="200"
            />
            <CardHeader>
              <CardTitle>{course.courseName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-gray-600">
                <span>Course Code : {course.courseCode}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 mt-2">
                <span>Course Fee : {course.fees}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 mt-2">
                <span>Duration : {course.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 mt-2">
                <span>
                  Registration Deadline : {course.registrationDeadline}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 mt-2">
                <span>Staring Date : {course.startingDate}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingCourse(course);
                  setIsModalOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                className="bg-red-700"
                onClick={() => handleDeleteCourse(course.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Toaster />
      {isModalOpen && (
        <CourseModal
          course={editingCourse}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCourse(null);
          }}
          onSave={(course) => {
            if (editingCourse) {
              handleEditReservation(course);
            } else {
              handleAddCourse(course);
            }
            setIsModalOpen(false);
            setEditingCourse(null);
          }}
        />
      )}
    </div>
  );
}
