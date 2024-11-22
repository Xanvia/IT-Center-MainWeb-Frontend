"use client";

import React, { useState } from "react";
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
  Button,
} from "@nextui-org/react";

interface CoursePayment {
  id: string;
  courseCode: string;
  courseName: string;
  requestState: "Pending" | "Approved" | "Rejected";
}

const initialCoursePayments: CoursePayment[] = [
  {
    id: "1",
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    requestState: "Pending",
  },
  {
    id: "2",
    courseCode: "MATH201",
    courseName: "Linear Algebra",
    requestState: "Approved",
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
    requestState: "Pending",
  },
];

export default function CoursePaymentsPage() {
  const [coursePayments, setCoursePayments] = useState<CoursePayment[]>(
    initialCoursePayments
  );

  const handlePay = (id: string) => {
    // Here you would typically make an API call to process the payment
    console.log(`Processing payment for course ${id}`);
  };

  const handleCancel = (id: string) => {
    // Here you would typically make an API call to cancel the enrollment request
    setCoursePayments(coursePayments.filter((course) => course.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold pb-8 text-center">Course Payments</h1>
      <Card className="w-full">
        <CardBody>
          <Table aria-label="Course payments table">
            <TableHeader>
              <TableColumn>NUMBER</TableColumn>
              <TableColumn>COURSE CODE</TableColumn>
              <TableColumn>COURSE NAME</TableColumn>
              <TableColumn>REQUEST STATE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {coursePayments.map((course, index) => (
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
                    {course.requestState === "Approved" && (
                      <>
                        <Button
                          size="sm"
                          color="default"
                          onClick={() => handlePay(course.id)}
                          className="mr-2"
                        >
                          Pay
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleCancel(course.id)}
                        >
                          ✕
                        </Button>
                      </>
                    )}
                    {course.requestState === "Rejected" && (
                      <Button
                        size="sm"
                        color="danger"
                        onClick={() => handleCancel(course.id)}
                      >
                        ✕
                      </Button>
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
