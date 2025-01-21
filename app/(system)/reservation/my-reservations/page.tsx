"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ReservationRequest, ReservationStatus } from "@/utils/types";
import Axios from "@/config/axios";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

export default function ReservationsPage() {
  const { data: session } = useSession();
  const [reservations, setReservations] = useState<ReservationRequest[]>([]);

  const handlePayment = (id: string) => {
    console.log(`Processing payment for reservation ${id}`);
    // Here you would typically integrate with a payment gateway
  };

  const handleDelete = (id: string) => {
    try {
      // Delete reservation from the server
      Axios.delete(`/reserve-records/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      setReservations(reservations.filter((res) => res.id !== id));
      toast({ description: "Reservation deleted successfully." });
    } catch (error) {
      console.error("Failed to delete reservation", error);
      toast({
        description: "Failed to delete reservation.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: ReservationStatus): string => {
    switch (status) {
      case "PENDING":
        return "text-yellow-600";
      case "PAYMENT":
        return "text-blue-600";
      case "CONFIRMED":
        return "text-green-600";
      case "REJECTED":
        return "text-red-600";
      case "DONE":
        return "text-gray-600";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (!session) {
      return;
    }
    // Fetch reservations from the server
    const fetchReservations = async () => {
      const response = await Axios.get("/reserve-records/me", {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      const data = response.data;
      setReservations(data);
    };
    fetchReservations();
  }, [session]);

  return (
    <div className="min-h-[80vh] bg-background">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-rubik font-bold text-center mb-12 mt-6 text-maroon">
          My Reservations
        </h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name and Location</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Time Slot</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>
                  <div>
                    <div className="text-medium font-medium">
                      {reservation.eventName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {reservation.reservation.name}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{reservation.startingDate}</TableCell>
                <TableCell>{reservation.endingDate}</TableCell>
                <TableCell>{reservation.timeSlot}</TableCell>

                <TableCell className={getStatusColor(reservation.status)}>
                  {reservation.status}
                </TableCell>
                <TableCell>
                  {reservation.status === "PAYMENT" && (
                    <Button onClick={() => handlePayment(reservation.id)}>
                      Pay Now
                    </Button>
                  )}
                  {reservation.status === "PENDING" && (
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(reservation.id)}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
