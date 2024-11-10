import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Beaker, Calendar, Clock, MapPin, Users, Wifi } from "lucide-react";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="text-white p-4 bg-maroon">
        <div className="container mx-auto flex justify-between items-center">
          <Link className="text-2xl font-bold" href="/">
            IT Center Reservations
          </Link>
          <nav className="space-x-4">
            <Link className="hover:underline" href="/">
              Hom
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
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4 text-maroon-800">
              Computer Lab A
            </h1>
            <img
              alt="Image of Computer Lab A"
              className="w-full h-64 object-cover rounded-lg mb-6"
              height="300"
              src="/placeholder.svg?height=300&width=600"
              style={{
                aspectRatio: "600/300",
                objectFit: "cover",
              }}
              width="600"
            />
            <div className="space-y-4">
              <p className="text-gray-600">
                Computer Lab A is a state-of-the-art facility equipped with the
                latest hardware and software to support a wide range of IT
                activities. From programming to graphic design, this lab
                provides the tools needed for students and professionals alike.
              </p>
              <h2 className="text-2xl font-semibold text-maroon-700">
                Amenities
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>30 high-performance workstations</li>
                <li>Dual-monitor setup for each station</li>
                <li>High-speed internet connection</li>
                <li>Advanced audio-visual equipment</li>
                <li>Whiteboard and projector</li>
                <li>Ergonomic chairs for comfort during long sessions</li>
              </ul>
              <h2 className="text-2xl font-semibold text-maroon-700">
                Location
              </h2>
              <p className="text-gray-600">
                Located on the 2nd floor of the IT Center, Room 2.15
              </p>
              <div className="bg-white p-4 rounded-lg shadow">
                <img
                  alt="Floor plan of Computer Lab A"
                  className="w-full h-auto"
                  height="300"
                  src="/placeholder.svg?height=300&width=600"
                  style={{
                    aspectRatio: "600/300",
                    objectFit: "cover",
                  }}
                  width="600"
                />
              </div>
            </div>
          </div>
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-maroon-700">
                  Quick Info
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="h-5 w-5" />
                    <span>Capacity: 30 people</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Wifi className="h-5 w-5" />
                    <span>High-speed WiFi</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Beaker className="h-5 w-5" />
                    <span>Modern Equipment</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-5 w-5" />
                    <span>Available 24/7</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span>2nd Floor, Room 2.15</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-yellow-500 text-maroon-900 hover:bg-yellow-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  Request to Reserve
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="bg-maroon-800 text-white p-4 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 IT Center Reservations. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
