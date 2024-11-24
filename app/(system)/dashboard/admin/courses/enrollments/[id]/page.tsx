import { notFound } from "next/navigation";
import { courses } from "@/app/(system)/dashboard/courseRegistration/courseData.";
import { EnrollmentRequestsTable } from "../enrollmentDetails";

export default function CourseDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    console.error("Course not found:", params.id);
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-maroon">
        {course.name}
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Course Details</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="font-medium text-gray-500">Course Code</dt>
            <dd className="text-sm">{course.code}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Audience</dt>
            <dd className="text-sm">{course.audience}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Start Date</dt>
            <dd className="text-sm">{course.startDate}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">End Date</dt>
            <dd className="text-sm">{course.endDate}</dd>
          </div>
        </dl>
      </div>
      <EnrollmentRequestsTable courseId={course.id} />
    </div>
  );
}
