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

export default function ReservationsPage() {
  const { data: session } = useSession();
  const [reservations, setReservations] = useState<ReservationRequest[]>([]);

  const handlePayment = (id: string) => {
    console.log(`Processing payment for reservation ${id}`);
    // Here you would typically integrate with a payment gateway
  };

  const handleDelete = (id: string) => {
    setReservations(reservations.filter((res) => res.id !== id));
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
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Your Reservations</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name and Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time Slot</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.eventName}</TableCell>
                <TableCell>{reservation.timeSlot}</TableCell>
                <TableCell>{reservation.startingDate}</TableCell>
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
