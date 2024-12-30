"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Monitor,
  Package,
  Users,
  Wind,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface RoomDetails {
  id: string;
  name: string;
  description: string;
  images: string[];
  seatLimit: number;
  noOfComputers?: number;
  availableSoftwares?: string;
  equipment: string;
  isAC: boolean;
  location: string;
  feeRatePerHour: number;
  bestCase: string;
}

const sampleRoom: RoomDetails = {
  id: "1",
  name: "Tech Hub Conference Room",
  description:
    "A modern, fully-equipped conference room perfect for tech meetings and presentations.",
  images: [
    "/common/labReservation.jpg",
    "/common/reservation.jpg",
    "/common/labReservation.jpg",
  ],
  seatLimit: 20,
  noOfComputers: 5,
  availableSoftwares: "Microsoft Office Suite, Adobe Creative Cloud, Zoom",
  equipment: "4K Projector, Surround Sound System, Interactive Whiteboard",
  isAC: true,
  location: "Building A, 2nd Floor",
  feeRatePerHour: 75.0,
  bestCase:
    "Tech Hub Conference Room is a modern, fully-equipped conference room perfect for tech meetings and presentations.",
};

export default function Component({ params }: { params: { id: string } }) {
  const slug = params.id;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [room, setRoom] = useState<RoomDetails>(sampleRoom);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === room.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? room.images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await Axios.get(`/reservations/${slug}`);
        const data = await response.data;
        setRoom(data);
      } catch (error) {
        return sampleRoom;
      }
    };
    fetchRoom();
  }, [slug]);

  return (
    <main className="flex-grow container mx-auto py-8">
      <div className="grid md:grid-cols-3 gap-8 py-5">
        <div className="md:col-span-2 h-full flex flex-col justify-between">
          <h1 className="text-3xl font-bold mb-4 text-maroon-800">
            {room.name}
          </h1>
          <div className="relative h-max sm:h-96">
            <Image
              src={room.images[currentImageIndex]}
              alt={`${room.name} - Image ${currentImageIndex + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg h-full"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="md:col-span-1">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-maroon-700">
                Quick Info
              </h2>
              <div className="space-y-4">
                <InfoItem
                  icon={Users}
                  label="Capacity"
                  value={`${room.seatLimit} people`}
                />
                {room.noOfComputers && (
                  <InfoItem
                    icon={Monitor}
                    label="Computers"
                    value={room.noOfComputers}
                  />
                )}
                {room.availableSoftwares && (
                  <InfoItem
                    icon={Package}
                    label="Software"
                    value={room.availableSoftwares}
                  />
                )}
                <InfoItem
                  icon={Package}
                  label="Equipment"
                  value={room.equipment}
                />
                <InfoItem
                  icon={Wind}
                  label="AC"
                  value={room.isAC ? "Yes" : "No"}
                />
                <InfoItem
                  icon={MapPin}
                  label="Location"
                  value={room.location}
                />
                <InfoItem
                  icon={Clock}
                  label="Fee Rate"
                  value={`$${room.feeRatePerHour}/hour`}
                />
              </div>
              <Button
                className="w-full mt-6 bg-yellow-500 text-maroon-900 hover:bg-yellow-600"
                aria-label="Request to Reserve"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Request to Reserve
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-gray-600 md:col-span-2 h-full">
          <h2 className="text-xl font-semibold mb-4 text-maroon">
            Description
          </h2>
          <p>{room.description}</p>
        </div>
        <div className="text-gray-600 h-full">
          <h2 className="text-xl font-semibold mb-4 text-maroon">Best Case</h2>
          <p>{room.bestCase}</p>
        </div>
      </div>
    </main>
  );
}

import { LucideIcon } from "lucide-react";
import Axios from "@/config/axios";

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start space-x-3 text-gray-600">
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-grow">
        <span className="text-sm font-medium text-gray-500">{label}:</span>{" "}
        <span className="text-gray-900">{value}</span>
      </div>
    </div>
  );
}
