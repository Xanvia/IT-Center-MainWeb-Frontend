"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateRange } from "react-day-picker";

// Mock data for booked slots
const bookedSlots = [
  { date: new Date(2024, 10, 15), slot: "morning" },
  { date: new Date(2024, 10, 15), slot: "afternoon" },
  { date: new Date(2024, 10, 18), slot: "morning" },
  { date: new Date(2024, 10, 20), slot: "afternoon" },
];

export default function ReservationCalendar({
  setDate,
}: {
  setDate: (date: DateRange | undefined) => void;
}) {
  return (
    <div className="m-8 p-2 grid ">
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          firstDay={1}
          selectable={true}
          validRange={{
            start: new Date().toISOString().split("T")[0], // Today's date
          }}
          eventContent={renderEventContent}
          events={
            [
              // {
              //   title: "SIRED",
              //   start: "2024-11-26",
              //   end: "2024-11-28",
              //   display: "background",
              //   color: "#ff9fac",
              // },
              // {
              //   title: "SIREDD",
              //   start: "2024-11-31",
              //   end: "2024-11-26",
              //   display: "background",
              //   color: "#ff9f1c",
              // },
            ]
          }
          select={function (info) {
            console.log(info);
            const endDate = new Date(info.end);
            endDate.setDate(endDate.getDate() - 1);
            setDate({ from: info.start, to: endDate });
          }}
          selectOverlap={function (event) {
            return event.backgroundColor !== "#ff9f1c";
          }}
        />
      </div>
    </div>
  );
}
function renderEventContent(eventInfo: any) {
  return (
    <>
      <i className="text-sm ">{eventInfo.event.title}</i>
    </>
  );
}
