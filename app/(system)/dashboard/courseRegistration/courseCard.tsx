// card.tsx

import { Card, CardHeader, CardBody } from "@nextui-org/react";

interface CourseCardProps {
  image: string;
  code: string;
  name: string;
}

export default function CourseCard({ image, code, name }: CourseCardProps) {
  return (
    <Card>
      <CardHeader className="p-2">
        <img src={image} alt={name} className="w-full object-cover" />
      </CardHeader>
      <CardBody>
        <h2 className="text-sm font-semibold">{code}</h2>
        <p className="text-md">{name}</p>
      </CardBody>
    </Card>
  );
}
