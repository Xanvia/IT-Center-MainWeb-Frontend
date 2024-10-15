"use client";

import { useState } from "react";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { undergraduateCourses, externalCourses } from "../page"; // Adjust this import path as necessary
import { useRouter } from "next/navigation";

interface CourseDetailsProps {
  params: {
    id: string;
  };
}

const CourseDetails = ({ params }: CourseDetailsProps) => {
  const { id } = params;
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Combine both undergraduate and external courses for search
  const allCourses = [...undergraduateCourses, ...externalCourses];

  // Find the course by ID
  const course = allCourses.find((course) => course.id === id);

  if (!course) {
    return <p>Course not found</p>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleEnrollRequest = () => {
    if (!file) {
      setError("Please upload the necessary documents before enrolling.");
      return;
    }

    // Here you would typically send the file to your server
    console.log("File uploaded:", file);

    // Simulate successful enrollment
    alert("Enrollment request successful!");

    // Redirect to the course registration dashboard
    router.push("/dashboard/courseRegistration");
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <Card className="w-full rounded-lg shadow-md">
        <CardBody className="p-0 flex flex-col md:flex-row">
          <Image
            src={course.image}
            alt={course.name}
            className="w-full md:w-1/3 h-64 md:h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
          <div className="p-6 flex-grow">
            <h2 className="text-2xl font-semibold mb-2">{course.name}</h2>
            <p className="text-lg mb-2">Course Code: {course.code}</p>
            <p className="text-md mb-4">{course.description}</p>
            <p className="text-lg mb-2">Instructor: {course.lecturer}</p>
            <p className="text-lg mb-2">Duration: {course.duration}</p>
            <p className="text-lg mb-2">Course Fee: ${course.fee}</p>
          </div>
        </CardBody>
      </Card>

      <div className="mt-8">
        <h6 className="text-md mb-4">Upload Necessary Documents</h6>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full"
        />
        <br />
        <br />
        {error && <p className="text-red-500">{error}</p>}

        <Button
          color="primary"
          className="btn btn-primary w-full bg-maroon hover:bg-gray-600 border-maroon hover:border-gray-700 text-white"
          onClick={handleEnrollRequest}
        >
          Request to Enroll
        </Button>
      </div>
    </div>
  );
};

export default CourseDetails;
