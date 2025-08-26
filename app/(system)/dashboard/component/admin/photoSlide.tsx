import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAbsoluteImageUrl } from "@/utils/common";

interface props {
  images: string[];
}

export const PhotoSlide = ({ images }: props) => {
  return (
    <Carousel className="w-full h-full max-w-xs">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <img
                src={getAbsoluteImageUrl(image) || "/placeholder.jpg"}
                alt="log image"
                height={400}
                width={600}
                className="object-cover w-full h-72 items-center justify-center"
              />
              {/* <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card> */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
