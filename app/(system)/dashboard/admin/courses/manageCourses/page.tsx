"use client";

import { useEffect, useState } from "react";
import { Loader, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "@/hooks/use-toast";
import Axios from "@/config/axios";
import CourseModal from "./course-model";
import { useSession } from "next-auth/react";
import { Course } from "@/utils/types";

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const { data: session, status } = useSession();

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
      await Axios.delete(`/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
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
        const result = await Axios.get(`/courses`, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });

        const data = await result.data;
        console.log(data);
        setCourses(data);
      } catch (error) {
        toast({ description: "Failed to fetch courses" });
      }
    };

    fetchCourses();
  }, []);

  if (status === "loading") {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Manage Courses</h1>
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
        <h1 className="text-2xl font-semibold mb-4">Manage Courses</h1>
        <div className="grid gap-4">
          <p>Sorry :( You are not Authorized to view this page.</p>
        </div>
      </div>
    );
  } else
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
