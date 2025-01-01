"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@nextui-org/react";
import Axios from "@/config/axios";

// Types
type RequestState = "PENDING" | "PAYMENT" | "CONFIRMED" | "REJECTED" | "DONE";

type Reservation = {
  id: string;
  eventName: string;
  startingDate: string;
  endingDate: string;
  timeSlot: string;
  description: string;
  charges: number;
  status: RequestState;
  phoneNumber: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
  reservation: {
    name: string;
  };
};

const ReservationsPage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedTab, setSelectedTab] = useState<RequestState>("PENDING");

  const updateReservationStatus = (
    reservationId: string,
    newStatus: RequestState
  ) => {
    setReservations((prevReservations) =>
      prevReservations.map((reservation) =>
        reservation.id === reservationId
          ? { ...reservation, status: newStatus }
          : reservation
      )
    );
  };

  const updateReservationAmount = (
    reservationId: string,
    newAmount: string
  ) => {
    setReservations((prevReservations) =>
      prevReservations.map((reservation) =>
        reservation.id === reservationId
          ? { ...reservation, amount: newAmount }
          : reservation
      )
    );
  };

  const deleteReservation = (reservationId: string) => {
    setReservations((prevReservations) =>
      prevReservations.filter((reservation) => reservation.id !== reservationId)
    );
  };

  const filteredReservations = reservations.filter(
    (reservation) => reservation.status === selectedTab
  );

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await Axios.get("/reserve-records");
        const data = await response.data;
        setReservations(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReservations();
  }, []);

  return (
    <main className="w-full min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">
          Reservation Management
        </h1>
        <Tabs
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value as RequestState)}
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="PENDING">Pending</TabsTrigger>
            <TabsTrigger value="ENROLLED">Payment</TabsTrigger>
            <TabsTrigger value="NOTPAID">Confirmed</TabsTrigger>
            <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
            <TabsTrigger value="COMPLETED">Done</TabsTrigger>
          </TabsList>
          <TabsContent value={selectedTab}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Profile</TableHead>
                  <TableHead>Hall/Lab Name</TableHead>
                  <TableHead>Time-slot</TableHead>
                  <TableHead>Start/End Date</TableHead>
                  <TableHead>Amount(LKR)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.map((reservation, index) => (
                  <TableRow key={reservation.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Avatar
                          src={reservation.user?.image}
                          name={reservation.user?.name}
                        />
                        <div>
                          <p className="font-semibold">
                            {reservation.user?.name}
                          </p>
                          <p className="text-gray-600">
                            {reservation.user?.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{reservation.reservation?.name}</TableCell>
                    <TableCell>
                      {reservation.timeSlot === "FULLDAY" ? (
                        <div className="text-red-600">Full Day</div>
                      ) : reservation.timeSlot === "MORNING" ? (
                        <div className="text-yellow-600">Morning</div>
                      ) : (
                        <div className="text-orange-600">Afternoon</div>
                      )}
                    </TableCell>
                    <TableCell>
                      {reservation.startingDate == reservation.endingDate ? (
                        reservation.startingDate.replaceAll("-", "/")
                      ) : (
                        <div>
                          <p>{reservation.startingDate.replaceAll("-", "/")}</p>
                          <p className="italic text-gray-400 text-xs">
                            to:{" "}
                            {reservation.endingDate.slice(5).replace("-", "/")}
                          </p>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{reservation.charges}</TableCell>
                    <TableCell>
                      <Select
                        value={reservation.status}
                        onValueChange={(value) =>
                          updateReservationStatus(
                            reservation.id,
                            value as RequestState
                          )
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {(
                            [
                              "PENDING",
                              "PAYMENT",
                              "CONFIRMED",
                              "REJECTED",
                              "DONE",
                            ] as RequestState[]
                          ).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Edit
                          onClick={() => deleteReservation(reservation.id)}
                          className="h-5 w-5 cursor-pointer"
                        />
                        <Trash2
                          onClick={() => deleteReservation(reservation.id)}
                          className="h-5 w-5 text-red-600 cursor-pointer"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ReservationsPage;
