"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Users,
  BookOpen,
  DollarSign,
  GraduationCap,
  Loader,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { type LucideIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "@/config/axios";
import Axios from "@/config/axios";

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

interface Student {
  id: string;
  email: string;
  name: string;
  role: string;
  studentId: string;
  image: string;
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start space-x-3 text-gray-600">
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-grow">
        <span className="text-sm font-medium text-gray-500">{label}:</span>{" "}
        <span className="text-gray-900">{value}</span>
      </div>
    </div>
  );
}

export default function CourseDetailPage() {
  const { id } = useParams();
  //const course = courses.find((c: { id: string | string[] }) => c.id === id);
  const [course, setCourse] = useState<Course | null>(null);
  const { data: session, status } = useSession();
  const [student, setStudent] = useState<Student | null>(null);
  const router = useRouter();

  // Fetch course details when the component mounts
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
        } else {
          toast({ description: "Failed to fetch course details." });
        }
      } catch (error) {
        toast({
          description: "An error occurred while fetching course details.",
        });
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  // Fetch student data
  useEffect(() => {
    const fetchStudent = async () => {
      if (session?.access_token) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
            {
              headers: {
                Authorization: `Bearer ${session.access_token}`,
              },
            }
          );
          setStudent(response.data);
        } catch (error) {
          toast({
            description: "Failed to fetch student data.",
          });
        }
      }
    };

    fetchStudent();
  }, [session]);

  // Handle "Request to Enroll" button click
  const handleRequestEnroll = async () => {
    if (!student || !course) {
      toast({
        description: "Student or course information is missing.",
      });
      return;
    }

    const registrationData = {
      studentId: student.id,
      courseId: course.id,
      registrationDate: new Date().toISOString().split("T")[0], // Format as YYYY-MM-DD
    };

    try {
      const response = await Axios.post(
        `/registration-records`,
        registrationData,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      console.log("response data", response);
      if (response.status === 201) {
        toast({ description: "Successfully enrolled in the course!" });
      }
      router.push("/dashboard/enrolledCourses");
    } catch (error: any) {
      if (error.response.data.code === "ER_DUP_ENTRY") {
        toast({
          variant: "destructive",
          description: "You Have already Enrolled for this course!",
        });
      } else {
        console.log(error);
        toast({
          variant: "destructive",
          title: error.message,
          description: "An error occurred during enrollment.",
        });
      }
    }
  };

  if (status === "loading") {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-maroon">Loading...</h1>
        {/* centered loading spinner */}
        <div className="flex justify-center items-center h-20 animate-spin">
          <Loader />
        </div>
      </div>
    );
  } else if (!course) {
    return <div>Course not found</div>;
  } else
    return (
      <main className="flex-grow container mx-auto py-3">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 h-full flex flex-col justify-between">
            <h1 className="text-2xl font-bold mb-4 text-maroon">
              {course.courseName}
            </h1>
            <div className="relative h-max sm:h-96">
              <img
                src={course.images[0]}
                alt={course.courseName}
                className="rounded-lg h-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-1">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-maroon">
                  Course Info
                </h2>
                <div className="space-y-4">
                  <InfoItem
                    icon={BookOpen}
                    label="Course Code"
                    value={course.courseCode}
                  />
                  <InfoItem
                    icon={Clock}
                    label="Duration"
                    value={course.duration}
                  />
                  <InfoItem
                    icon={Calendar}
                    label="Registration Deadline"
                    value={course.registrationDeadline}
                  />
                  <InfoItem
                    icon={Calendar}
                    label="Start Date"
                    value={course.startingDate}
                  />
                  <InfoItem
                    icon={Calendar}
                    label="End Date"
                    value={course.endingDate}
                  />
                  <InfoItem
                    icon={Users}
                    label="Target Audience"
                    value={course.audience}
                  />
                  <InfoItem
                    icon={GraduationCap}
                    label="Instructor"
                    value={course.instructor || "TBA"}
                  />
                  <InfoItem
                    icon={Users}
                    label="Student Limit"
                    value={course.studentLimit}
                  />
                  <InfoItem
                    icon={DollarSign}
                    label="Course Fee"
                    value={`Rs. ${course.fees}.00`}
                  />
                </div>
                <Button
                  className="w-full mt-6 bg-maroon text-white hover:bg-gray-600"
                  aria-label="Register for Course"
                  onClick={handleRequestEnroll}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Request for Enroll
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-maroon">
            Course Description
          </h2>
          <p className="text-gray-600">{course.description}</p>
        </div>
      </main>
    );
}
