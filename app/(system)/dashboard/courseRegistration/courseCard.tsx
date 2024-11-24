// card.tsx

import { Card, CardHeader, CardBody } from "@nextui-org/react";

interface CourseCardProps {
  image: string;
  code: string;
  name: string;
  id: string;
}

export default function CourseCard({ image, code, name }: CourseCardProps) {
  return (
    <Card className="rounded-lg">
      <CardHeader className="p-2">
        <img
          src={image}
          alt={name}
          className="w-full object-cover rounded-xl"
        />
      </CardHeader>
      <CardBody>
        <h2 className="text-sm font-semibold">{code}</h2>
        <p className="text-md">{name}</p>
      </CardBody>
    </Card>
  );
}
