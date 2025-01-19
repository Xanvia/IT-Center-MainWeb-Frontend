// card.tsx

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Banknote, Calendar, DollarSign, Users } from "lucide-react";

// only show the course code, name and image

interface CourseCardProps {
  id: string;
  image: string;
  courseCode: string;
  courseName: string;
}

export default function CourseCard({
  image,
  courseCode: code,
  courseName: name,
}: CourseCardProps) {
  return (
    <Card className="rounded-lg">
      <CardHeader className="p-2">
        <img
          src={image}
          alt={name}
          className="w-full object-cover rounded-sm"
        />
      </CardHeader>
      <CardBody>
        <h2 className="text-sm font-semibold">{code}</h2>
        <p className="text-md">{name}</p>
      </CardBody>
    </Card>
  );
}
