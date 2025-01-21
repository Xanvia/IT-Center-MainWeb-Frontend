// card.tsx

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Banknote, Calendar } from "lucide-react";

interface CourseCardProps {
  id: string;
  image: string;
  courseCode: string;
  courseName: string;
  registrationDeadline: string;
  fees: number;
}

export default function CourseCard({
  image,
  courseCode: code,
  courseName: name,
  registrationDeadline: regDL,
  fees,
}: CourseCardProps) {
  return (
    <Card className="w-80 h-[22rem] rounded-lg overflow-hidden">
      <CardHeader className="p-2">
        <div className="w-full h-40 overflow-hidden rounded-sm">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      <CardBody className="p-4 flex flex-col">
        <h2 className="text-sm font-semibold truncate">{code}</h2>
        <p className="text-md font-medium mt-1 mb-2 line-clamp-2">{name}</p>
        <div className="mt-auto">
          <div className="flex items-center space-x-2 text-gray-600 mb-1">
            <Banknote className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm truncate">Course Fee : Rs. {fees}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm truncate">
              Registraton Deadline : {regDL}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
