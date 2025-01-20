"use client";

import { useEffect, useState } from "react";
import { Loader, MapPin, Nfc, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReservationModal from "./reservation-model";
import { Reservation } from "@/utils/types";
import { toast } from "@/hooks/use-toast";
import Axios from "@/config/axios";
import { useSession } from "next-auth/react";

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);
  const { data: session, status } = useSession();

  // Add a new reservation
  const handleAddReservation = (newReservation: Reservation) => {
    setReservations([...reservations, newReservation]);
  };

  // Edit an existing reservation
  const handleEditReservation = (updatedReservation: Reservation) => {
    setReservations(
      reservations.map((r) =>
        r.id === updatedReservation.id ? updatedReservation : r
      )
    );
  };

  // Delete a reservation
  const handleDeleteReservation = async (id: string) => {
    try {
      await Axios.delete(`/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      toast({ description: "Reservation deleted successfully" });
    } catch (error) {
      toast({ description: "Failed to delete reservation" });
    }
    setReservations(reservations.filter((r) => r.id !== id));
  };

  // Fetch reservations from the server at the start
  useEffect(() => {
    console.log("Fetching reservations");
    const fetchReservations = async () => {
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservations`
        );
        if (result.ok) {
          const data = await result.json();
          setReservations(data);
        } else {
          toast({ description: "Failed to fetch reservations" });
        }
      } catch (error) {
        toast({ description: "Failed to fetch reservations" });
      }
    };

    fetchReservations();
  }, []);

  if (status === "loading") {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Manage Reservation</h1>
        {/* centered loading spinner */}
        <div className="flex justify-center items-center h-20 animate-spin">
          <Loader />
        </div>
      </div>
    );
  } //else if (
  //   session?.user?.role !== "ADMIN" &&
  //   session?.user?.role !== "S_ADMIN"
  // ) {
  //   return (
  //     <div className="p-4">
  //       <h1 className="text-2xl font-semibold mb-4">Manage Reservation</h1>
  //       <div className="grid gap-4">
  //         <p>Sorry :( You are not Authorized to view this page.</p>
  //       </div>
  //     </div>
  //   );
  // } else
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Reservations</h1>
        <Button className="bg-maroon" onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Reservation
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reservations.map((reservation) => (
          <Card key={reservation.id} className="overflow-hidden">
            <img
              alt={`Image of ${reservation.name}`}
              className="w-full h-48 object-cover"
              height="200"
              src={reservation.images[0]}
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
                <span>Location:{reservation.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 mt-2">
                <Nfc className="h-5 w-5" />
                <span>Charge /h: {reservation.feeRatePerHour}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingReservation(reservation);
                  setIsModalOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                className="bg-red-700"
                onClick={() => handleDeleteReservation(reservation.id)}
              >
                Delete
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
