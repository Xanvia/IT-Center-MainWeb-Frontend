"use client";

import { useState } from "react";
import { MapPin, Nfc, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReservationModal from "./reservation-model";
import Link from "next/link";
import { Reservation } from "@/utils/types";

const dummyReservations: Reservation[] = [
  {
    id: "1",
    name: "Conference Room A",
    description: "Large conference room with modern amenities",
    images: ["/placeholder.svg?height=100&width=100"],
    seatLimit: 20,
    computers: 5,
    availableSoftware: "Microsoft Office, Adobe Creative Suite",
    equipment: "Projector, Whiteboard",
    hasAC: true,
    bestCase: "Meetings, Presentations",
    location: "Building 1, Floor 2",
    feePerHour: 50,
  },
  {
    id: "2",
    name: "Study Room B",
    description: "Quiet study room for small groups",
    images: ["/placeholder.svg?height=100&width=100"],
    seatLimit: 6,
    computers: 2,
    availableSoftware: "Microsoft Office",
    equipment: "Whiteboard",
    hasAC: true,
    bestCase: "Group Study, Tutoring",
    location: "Library, Floor 1",
    feePerHour: 20,
  },
];

export default function AdminReservations() {
  const [reservations, setReservations] =
    useState<Reservation[]>(dummyReservations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);

  const handleAddReservation = (newReservation: Reservation) => {
    setReservations([
      ...reservations,
      { ...newReservation, id: Date.now().toString() },
    ]);
  };

  const handleEditReservation = (updatedReservation: Reservation) => {
    setReservations(
      reservations.map((r) =>
        r.id === updatedReservation.id ? updatedReservation : r
      )
    );
  };

  const handleDeleteReservation = (id: string) => {
    setReservations(reservations.filter((r) => r.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Reservations</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Reservation
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reservations.map((reservation) => (
          // <Card key={reservation.id}>
          //   <CardHeader>
          //     <CardTitle>{reservation.name}</CardTitle>
          //   </CardHeader>
          //   <CardContent>
          //     <Image
          //       src={reservation.images[0]}
          //       alt={`Image of ${reservation.name}`}
          //       width={300}
          //       height={300}
          //     />
          //     <p className="text-sm text-gray-600 mb-2">
          //       {reservation.description}
          //     </p>
          //     <p className="text-sm">
          //       <strong>Location:</strong> {reservation.location}
          //     </p>
          //     <p className="text-sm">
          //       <strong>Seats:</strong> {reservation.seatLimit}
          //     </p>
          //     <p className="text-sm">
          //       <strong>Fee:</strong> ${reservation.feePerHour}/hour
          //     </p>
          //   </CardContent>
          //   <CardFooter className="flex justify-end space-x-2">
          //     <Button
          //       variant="outline"
          //       onClick={() => {
          //         setEditingReservation(reservation);
          //         setIsModalOpen(true);
          //       }}
          //     >
          //       Edit
          //     </Button>
          //     <Button
          //       variant="destructive"
          //       onClick={() => handleDeleteReservation(reservation.id)}
          //     >
          //       Delete
          //     </Button>
          //   </CardFooter>
          // </Card>
          <Card key={reservation.id} className="overflow-hidden">
            <img
              alt={`Image of ${reservation.name}`}
              className="w-full h-48 object-cover"
              height="200"
              src={
                reservation.images[0] || "/placeholder.svg?height=200&width=300"
              }
              style={{
                aspectRatio: "300/200",
                objectFit: "cover",
              }}
              width="300"
            />
            <CardHeader>
              <CardTitle>{reservation.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="h-5 w-5" />
                <span>Capacity: {reservation.seatLimit}</span>
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
                  href={`/room/${reservation.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {isModalOpen && (
        <ReservationModal
          reservation={editingReservation}
          onClose={() => {
            setIsModalOpen(false);
            setEditingReservation(null);
          }}
          onSave={(reservation) => {
            if (editingReservation) {
              handleEditReservation(reservation);
            } else {
              handleAddReservation(reservation);
            }
            setIsModalOpen(false);
            setEditingReservation(null);
          }}
        />
      )}
    </div>
  );
}
