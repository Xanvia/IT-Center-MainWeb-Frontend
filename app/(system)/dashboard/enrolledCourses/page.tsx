"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";

interface EnrolledCourse {
  id: string;
  courseCode: string;
  courseName: string;
  requestState: "Pending" | "Approved" | "Rejected";
}

const enrolledCourses: EnrolledCourse[] = [
  {
    id: "1",
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    requestState: "Approved",
  },
  {
    id: "2",
    courseCode: "MATH201",
    courseName: "Linear Algebra",
    requestState: "Pending",
  },
  {
    id: "3",
    courseCode: "BUS301",
    courseName: "Business Management",
    requestState: "Rejected",
  },
  {
    id: "4",
    courseCode: "ART105",
    courseName: "Digital Art and Design",
    requestState: "Approved",
  },
];

export default function EnrolledCoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full">
        <h1 className="text-3xl font-bold my-6 text-center">
          Enorolled Courses
        </h1>

        <CardBody>
          <Table aria-label="Enrolled courses table">
            <TableHeader>
              <TableColumn>NUMBER</TableColumn>
              <TableColumn>COURSE CODE</TableColumn>
              <TableColumn>COURSE NAME</TableColumn>
              <TableColumn>REQUEST STATE</TableColumn>
            </TableHeader>
            <TableBody>
              {enrolledCourses.map((course, index) => (
                <TableRow key={course.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{course.courseCode}</TableCell>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        course.requestState === "Approved"
                          ? "bg-green-100 text-green-800"
                          : course.requestState === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {course.requestState}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
