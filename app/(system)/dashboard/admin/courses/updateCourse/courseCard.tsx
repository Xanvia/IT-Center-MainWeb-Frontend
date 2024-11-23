import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CourseCardProps {
  id: string;
  image: string;
  code: string;
  name: string;
}

export default function CourseCard({ id, image, code, name }: CourseCardProps) {
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
        <CardFooter className="justify-end p-2">
          <Link
            href={`/dashboard/admin/courses/updateCourse/${id}/edit`}
            passHref
          >
            <Button className="mt-2 bg-maroon text-white hover:bg-gray-500 items-center">
              Edit
            </Button>
          </Link>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
