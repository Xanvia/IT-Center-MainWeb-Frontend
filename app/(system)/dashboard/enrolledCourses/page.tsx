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
  results: string | null;
}

const enrolledCourses: EnrolledCourse[] = [
  {
    id: "1",
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    requestState: "Approved",
    results: "A",
  },
  {
    id: "2",
    courseCode: "MATH201",
    courseName: "Linear Algebra",
    requestState: "Pending",
    results: null,
  },
  {
    id: "3",
    courseCode: "BUS301",
    courseName: "Business Management",
    requestState: "Rejected",
    results: null,
  },
  {
    id: "4",
    courseCode: "ART105",
    courseName: "Digital Art and Design",
    requestState: "Approved",
    results: "B+",
  },
];

export default function EnrolledCoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold pb-8 text-center">Enrolled Courses</h1>
      <Card className="w-full">
        <CardBody>
          <Table aria-label="Enrolled courses table">
            <TableHeader>
              <TableColumn>NUMBER</TableColumn>
              <TableColumn>COURSE CODE</TableColumn>
              <TableColumn>COURSE NAME</TableColumn>
              <TableColumn>REQUEST STATE</TableColumn>
              <TableColumn>RESULTS</TableColumn>
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
                  <TableCell>
                    {course.results ? (
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                        {course.results}
                      </span>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
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
