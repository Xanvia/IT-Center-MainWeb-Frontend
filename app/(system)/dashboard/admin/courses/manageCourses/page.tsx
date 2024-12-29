"use client";

import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { BookOpen, Edit, Users, Award } from "lucide-react";
import Link from "next/link";

export default function manageCourses() {
  const courseActions = [
    {
      name: "Create Course",
      href: "manageCourses/createCourse",
      icon: BookOpen,
      color: "text-green-500",
    },
    {
      name: "Update Course",
      href: "manageCourses/updateCourse",
      icon: Edit,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-2xl text-maroon font-bold mb-10">
        Course Management
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courseActions.map((action) => (
          <Link key={action.name} href={action.href}>
            <Card
              isPressable
              className="w-full h-full hover:scale-105 transition-transform duration-200"
            >
              <CardBody className="items-center justify-center py-6">
                <action.icon className={`w-16 h-16 ${action.color}`} />
              </CardBody>
              <CardFooter className="flex-col items-center justify-center pb-6 pt-2">
                <p className="text-lg font-semibold text-center">
                  {action.name}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
