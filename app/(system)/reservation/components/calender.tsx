"use client";

import { useState } from "react";
import { format, isSameDay } from "date-fns";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";

// Mock data for booked slots
const bookedSlots = [
  { date: new Date(2024, 10, 15), slot: "morning" },
  { date: new Date(2024, 10, 15), slot: "afternoon" },
  { date: new Date(2024, 10, 18), slot: "morning" },
  { date: new Date(2024, 10, 20), slot: "afternoon" },
];

type Slot = "morning" | "afternoon";

export default function ReservationCalendar() {
  let [value, setValue] = useState(parseDate("2024-11-27"));
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

  const handleDateClick = (arg: any) => {
    alert(arg.dateStr);
  };

  return (
    <div className="max-w-4xl m-5 p-4 ">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        // dateClick={handleDateClick}
        eventContent={renderEventContent}
        events={[
          {
            title: "SIRED",
            start: "2024-11-26",
            end: "2024-11-29",
            display: "background",
            color: "#ff9f1c",
          },
        ]}
      />
    </div>
  );
}
function renderEventContent(eventInfo: any) {
  return (
    <>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
