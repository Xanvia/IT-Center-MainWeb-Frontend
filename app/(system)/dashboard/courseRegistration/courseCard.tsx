// card.tsx

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Banknote, Calendar, DollarSign, Users } from "lucide-react";

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

        <div className="flex items-center pt-2 space-x-2 text-gray-600">
          <Banknote className="h-5 w-5" />
          <span>Rs. {fees}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="h-5 w-5" />
          <span>RegDL : {regDL}</span>
        </div>
      </CardBody>
    </Card>
  );
}
