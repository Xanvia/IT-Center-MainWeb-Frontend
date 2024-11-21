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
import { Beaker, Users, Wifi } from "lucide-react";

export default function Reservation() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-maroon-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link className="text-2xl font-bold" href="/">
            IT Center Reservations
          </Link>
          <nav className="space-x-4">
            <Link className="hover:underline" href="/">
              Home
            </Link>
            <Link className="hover:underline" href="/about">
              About
            </Link>
            <Link className="hover:underline" href="/contact">
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-maroon-800">
            Reserve Your Space
          </h1>
          <p className="text-xl mb-6 text-gray-600">
            Find and book the perfect lab or hall for your needs
          </p>
          <div className="flex justify-center">
            <Input
              className="max-w-sm mr-2"
              placeholder="Search for labs or halls"
              type="search"
            />
            <Button className="bg-yellow-500 text-maroon-900 hover:bg-yellow-600">
              Search
            </Button>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Computer Lab A",
              capacity: 30,
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              name: "Conference Hall B",
              capacity: 100,
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              name: "Robotics Lab",
              capacity: 20,
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              name: "Lecture Hall C",
              capacity: 200,
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              name: "3D Printing Lab",
              capacity: 15,
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              name: "Multimedia Studio",
              capacity: 10,
              image: "/placeholder.svg?height=200&width=300",
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
                  <Wifi className="h-5 w-5" />
                  <span>High-speed WiFi</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 mt-2">
                  <Beaker className="h-5 w-5" />
                  <span>Modern Equipment</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full bg-maroon-700 hover:bg-maroon-800 text-white"
                >
                  <Link
                    href={`/room/${room.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    View Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      </main>
      <footer className="bg-maroon-800 text-white p-4 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 IT Center Reservations. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
