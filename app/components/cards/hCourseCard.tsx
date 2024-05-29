import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";

export default function HCourseCard() {
  return (
    <Card
      isBlurred
      isPressable
      shadow="lg"
      isFooterBlurred
      className="w-full h-64 col-span-12 sm:col-span-7 "
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-black/60 uppercase font-bold">
          Your day your way
        </p>
        <h4 className="text-maroon/90 font-medium text-xl">
          Your checklist for better sleep
        </h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Relaxing app background"
        className="z-0 w-full h-full object-cover brightness-90"
        src="/dd.jpg"
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="text-lightgray">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis
        </div>
      </CardFooter>
    </Card>
  );
}
