import { Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import React from "react";

export default function HCourseCard() {
  return (
    <Card shadow="md" isPressable disableRipple isFooterBlurred>
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-black/60 uppercase font-bold">
          course code
        </p>
        <h4 className="text-maroon/90 font-medium text-xl">
          Diploma in Information Technology
        </h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Relaxing app background"
        className="z-0 w-full h-72 object-cover brightness-95 contrast-75 blur-sm"
        src="/common/reservation.jpg"
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10">
        <div className="text-lightgray">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis
        </div>
      </CardFooter>
    </Card>
  );
}
