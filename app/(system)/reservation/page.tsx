import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Nfc, Users } from "lucide-react";

export default function Reservation() {
  return (
    <main className="flex-grow container mx-auto py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-maroon-800">
          Reserve Your Space
        </h1>
        <p className="text-xl mb-6 text-gray-600">
          Find and book the perfect lab or hall for your needs
        </p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: "Computer Lab A",
            capacity: 30,
            image: "/common/labReservation.jpg",
          },
          {
            name: "Conference Hall B",
            capacity: 100,
            image: "/common/labReservation.jpg",
          },
          {
            name: "Robotics Lab",
            capacity: 20,
            image: "/common/labReservation.jpg",
          },
          {
            name: "Lecture Hall C",
            capacity: 200,
            image: "/common/labReservation.jpg",
          },
          {
            name: "3D Printing Lab",
            capacity: 15,
            image: "/common/labReservation.jpg",
          },
          {
            name: "Multimedia Studio",
            capacity: 10,
            image: "/common/labReservation.jpg",
          },
        ].map((room) => (
          <Card key={room.name} className="overflow-hidden">
            <img
              alt={`Image of ${room.name}`}
              className="w-full h-48 object-cover"
              height="200"
              src={room.image}
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
                <span>Capacity: {room.capacity}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 mt-2">
                <MapPin className="h-5 w-5" />
                <span>Location:</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 mt-2">
                <Nfc className="h-5 w-5" />
                <span>Charge /h: {}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className="w-full bg-maroon hover:text-yellow-500 text-white"
              >
                <Link
                  href={`/room/${room.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
}
