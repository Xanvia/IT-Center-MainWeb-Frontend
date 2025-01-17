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
  Edit,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { courses } from "@/app/(system)/dashboard/courseRegistration/courseData";

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <main className="flex-grow container mx-auto py-3">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 h-full flex flex-col justify-between">
          <h1 className="text-3xl font-bold mb-4 text-maroon">{course.name}</h1>
          <div className="relative h-max sm:h-96">
            <Image
              src={course.image}
              alt={course.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg h-full"
            />
          </div>
        </div>
        <div className="md:col-span-1">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-maroon">
                Course Info
              </h2>
              <div className="space-y-4">
                <InfoItem
                  icon={BookOpen}
                  label="Course Code"
                  value={course.code}
                />
                <InfoItem
                  icon={Clock}
                  label="Duration"
                  value={course.duration}
                />
                <InfoItem
                  icon={Calendar}
                  label="Start Date"
                  value={course.startDate}
                />
                <InfoItem
                  icon={Calendar}
                  label="End Date"
                  value={course.endDate}
                />
                <InfoItem
                  icon={Users}
                  label="Target Audience"
                  value={course.audience}
                />
                <InfoItem
                  icon={GraduationCap}
                  label="Instructor"
                  value={course.instructor}
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
              <div className="flex space-x-4 mt-6">
                <Button
                  className="flex-1 bg-maroon text-white hover:bg-gray-600"
                  aria-label="Register for Course"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Request for Enroll
                </Button>
                <Link
                  href={`/dashboard/courseRegistration/${course.id}/edit`}
                  passHref
                >
                  <Button
                    className="flex-1 bg-maroon text-white hover:bg-maroon-600"
                    aria-label="Edit Course"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Course
                  </Button>
                </Link>
              </div>
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

// ... (InfoItem component remains the same)
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
