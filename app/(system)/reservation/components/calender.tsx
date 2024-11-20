"use client";

import { useState } from "react";
import { addDays, format, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data for booked slots
const bookedSlots = [
  { date: new Date(2023, 10, 15), slot: "morning" },
  { date: new Date(2023, 10, 15), slot: "afternoon" },
  { date: new Date(2023, 10, 18), slot: "morning" },
  { date: new Date(2023, 10, 20), slot: "afternoon" },
];

type Slot = "morning" | "afternoon";

export default function ReservationCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const isSlotBooked = (date: Date, slot: Slot) => {
    return bookedSlots.some(
      (booking) => isSameDay(booking.date, date) && booking.slot === slot
    );
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlot(slot);
  };

  const handleContinue = () => {
    if (selectedDate && selectedSlot) {
      console.log(
        `Continuing with reservation for ${format(
          selectedDate,
          "PP"
        )} - ${selectedSlot}`
      );
      // Here you would typically navigate to the next step or submit the reservation
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        className="rounded-md border"
      />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full mt-4">Select Time Slot</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Select a Time Slot for{" "}
              {selectedDate ? format(selectedDate, "PP") : "your reservation"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button
              variant={selectedSlot === "morning" ? "default" : "outline"}
              onClick={() => handleSlotSelect("morning")}
              disabled={selectedDate && isSlotBooked(selectedDate, "morning")}
            >
              8:00 AM - 12:00 PM
            </Button>
            <Button
              variant={selectedSlot === "afternoon" ? "default" : "outline"}
              onClick={() => handleSlotSelect("afternoon")}
              disabled={selectedDate && isSlotBooked(selectedDate, "afternoon")}
            >
              1:00 PM - 5:00 PM
            </Button>
          </div>
          <Button
            onClick={handleContinue}
            disabled={!selectedDate || !selectedSlot}
            className="w-full mt-4"
          >
            Continue Reservation
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
