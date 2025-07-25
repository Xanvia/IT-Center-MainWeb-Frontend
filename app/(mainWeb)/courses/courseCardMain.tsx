// card.tsx

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Course } from "@/utils/types";

// Course card interface : Main web pages
export type { Course };

interface CourseCardProps {
  id: string;
  image: string;
  courseCode: string;
  courseName: string;
  duration?: string;
  startingDate?: string;
}

export default function CourseCard({
  image,
  courseCode: code,
  courseName: name,
  duration,
  startingDate,
}: CourseCardProps) {
  return (
    <Card className="w-96 h-[370px] rounded-lg overflow-hidden md:w-80 lg:w-80 xl:w-96">
      <CardHeader className="p-2">
        <div className="w-full h-48 overflow-hidden rounded-sm">
          <img
            src={image || "/placeholder.jpg"}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>

      <CardBody className="p-4 flex flex-col">
        <h2 className="text-md font-semibold truncate">{code}</h2>

        <p className="text-lg font-medium mt-1 mb-2 line-clamp-2">{name}</p>
        {duration && (
          <p className="text-sm text-gray-600 mb-1">Duration: {duration}</p>
        )}
        {startingDate && startingDate !== "Throughout the year" && (
          <p className="text-sm text-gray-600 mb-1">
            Starts: {new Date(startingDate).toLocaleDateString()}
          </p>
        )}
        <div className="mt-auto"></div>
      </CardBody>
    </Card>
  );
}
