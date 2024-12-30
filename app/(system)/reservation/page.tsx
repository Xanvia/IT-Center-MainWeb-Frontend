"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Nfc, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Reservation } from "@/utils/types";
import Axios from "@/config/axios";
import { useRouter } from "next/navigation";

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch reservations from the server
    const fetchReservations = async () => {
      const response = await Axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservations`
      );
      const data = await response.data;
      setReservations(data);
    };
    fetchReservations();
  }, []);

  return (
    <main className="flex-grow container mx-auto py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-maroon-800">
          Reserve Your Space
        </h1>
        <p className="text-md mb-6 text-gray-600">
          Find and book the perfect lab or hall for your needs
        </p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((room) => (
          <Card key={room.name} className="overflow-hidden">
            <img
              alt={`Image of ${room.name}`}
              className="w-full h-48 object-cover"
              height="200"
              src={room.images[0]}
              style={{
                aspectRatio: "300/200",
                objectFit: "cover",
              }}
              width="300"
            />
            <CardHeader>
              <CardTitle>{room.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="h-5 w-5" />
                <span>Capacity: {room.seatLimit}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 mt-2">
                <MapPin className="h-5 w-5" />
                <span>Location: {room.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 mt-2">
                <Nfc className="h-5 w-5" />
                <span>Charge /h: {room.feeRatePerHour} LKR</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-maroon hover:text-yellow-500 text-white"
                onClick={() => {
                  router.push(`/reservation/room/${room.id}`);
                }}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
}
