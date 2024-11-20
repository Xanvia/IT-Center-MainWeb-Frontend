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
import { cn } from "@/lib/utils";

// Mock data for booked slots
const bookedSlots = [
  { date: new Date(2024, 10, 15), slot: "morning" },
  { date: new Date(2024, 10, 15), slot: "afternoon" },
  { date: new Date(2024, 10, 18), slot: "morning" },
  { date: new Date(2024, 10, 20), slot: "afternoon" },
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
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        className="rounded-md border p-3"
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4 w-full sm:w-1/2",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: cn(
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
            "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
          ),
          day: cn("h-16 w-16 p-0 font-normal aria-selected:opacity-100"),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_hidden: "invisible",
        }}
        components={{
          Day: ({ date, ...props }) => {
            const isBookedMorning = isSlotBooked(date, "morning");
            const isBookedAfternoon = isSlotBooked(date, "afternoon");
            return (
              <div className="relative h-16 w-16" {...props}>
                <div className="absolute inset-0 flex flex-col">
                  <div
                    className={cn(
                      "flex-1 border-b",
                      isBookedMorning ? "bg-red-200" : "bg-green-200"
                    )}
                  ></div>
                  <div
                    className={cn(
                      "flex-1",
                      isBookedAfternoon ? "bg-red-200" : "bg-green-200"
                    )}
                  ></div>
                </div>
                <div className="relative z-10 h-full w-full flex items-center justify-center">
                  {date.getDate()}
                </div>
              </div>
            );
          },
        }}
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
              className="h-20"
            >
              8:00 AM - 12:00 PM
              {selectedDate && isSlotBooked(selectedDate, "morning") && (
                <span className="block text-xs mt-1">Booked</span>
              )}
            </Button>
            <Button
              variant={selectedSlot === "afternoon" ? "default" : "outline"}
              onClick={() => handleSlotSelect("afternoon")}
              disabled={selectedDate && isSlotBooked(selectedDate, "afternoon")}
              className="h-20"
            >
              1:00 PM - 5:00 PM
              {selectedDate && isSlotBooked(selectedDate, "afternoon") && (
                <span className="block text-xs mt-1">Booked</span>
              )}
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
      <div className="mt-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-200 mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center mt-1">
          <div className="w-4 h-4 bg-red-200 mr-2"></div>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
}
