"use client";

import { useEffect, useState } from "react";
import { Edit, Eye, Trash2 } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";

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
  const [newCharge, setNewCharge] = useState(0);
  const { data: session } = useSession();

  const updateReservationStatus = (
    reservationId: string,
    newStatus: RequestState
  ) => {
    try {
      Axios.patch(
        `/reserve-records/${reservationId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${session?.access_token}` } }
      );
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === reservationId
            ? { ...reservation, status: newStatus }
            : reservation
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateReservationAmount = (
    reservationId: string,
    newAmount: number
  ) => {
    try {
      Axios.patch(
        `/reserve-records/${reservationId}`,
        {
          charges: newAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === reservationId
            ? { ...reservation, charges: newAmount }
            : reservation
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReservation = (reservationId: string) => {
    try {
      Axios.delete(`/reserve-records/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation.id !== reservationId
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredReservations = reservations.filter(
    (reservation) => reservation.status === selectedTab
  );

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await Axios.get("/reserve-records", {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
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
            <TabsTrigger value="PAYMENT">Payment</TabsTrigger>
            <TabsTrigger value="CONFIRMED">Confirmed</TabsTrigger>
            <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
            <TabsTrigger value="DONE">Done</TabsTrigger>
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
                    <TableCell>
                      <div className="flex gap-2">
                        <div>{reservation.charges}</div>
                        <Dialog
                          onOpenChange={() => setNewCharge(reservation.charges)}
                        >
                          <DialogTrigger asChild>
                            <Edit className="h-4 w-4 cursor-pointer" />
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>
                                Edit Charges for the Reservation
                              </DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 pt-2">
                              <Label>Current Charges</Label>
                              <input
                                type="number"
                                value={newCharge}
                                onChange={(e) =>
                                  setNewCharge(parseInt(e.target.value))
                                }
                                className="w-full p-2 border border-gray-300 rounded-md"
                              />
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button
                                  onClick={() =>
                                    updateReservationAmount(
                                      reservation.id,
                                      newCharge
                                    )
                                  }
                                  type="submit"
                                  className="bg-red-600"
                                >
                                  Update
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Eye className="h-5 w-5 cursor-pointer" />
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>
                                {reservation.reservation?.name}
                              </DialogTitle>
                              <DialogDescription>
                                Requested by: {reservation.user?.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 pt-2">
                              <div className="flex gap-3 items-center">
                                <Label className=" text-gray-600 font-bold">
                                  Email:
                                </Label>
                                <p className="text-right text-small">
                                  {reservation?.user?.email}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-3 items-center">
                              <Label className="font-bold text-gray-600">
                                Contact No:
                              </Label>
                              <p className=" text-small">
                                {reservation?.phoneNumber}
                              </p>
                            </div>
                            <div className="grid gap-4 pt-2">
                              <div className="flex gap-3 items-center">
                                <Label className=" text-gray-600 font-bold">
                                  Event Name:
                                </Label>
                                <p className="text-right text-small">
                                  {reservation?.eventName}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-3 items-center">
                              <Label className="font-bold text-gray-600">
                                Details:
                              </Label>
                              <p className=" text-small">
                                {reservation?.description}
                              </p>
                            </div>

                            <div className="flex gap-3 items-center">
                              <Label className="font-bold text-gray-600">
                                Date:
                              </Label>
                              <p className=" text-small">
                                {reservation?.startingDate} to{" "}
                                {reservation?.endingDate}
                              </p>
                            </div>
                            <div className="flex gap-3 items-center">
                              <Label className="font-bold text-gray-600">
                                Time Slot:
                              </Label>
                              <p className=" text-small">
                                {reservation?.timeSlot}
                              </p>
                            </div>
                            <div className="flex gap-3 items-start">
                              <Label className="font-bold text-gray-600">
                                Charges:
                              </Label>
                              <p className="text-right text-small text-red-600">
                                LKR: {reservation.charges}
                              </p>
                            </div>
                          </DialogContent>
                        </Dialog>

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
