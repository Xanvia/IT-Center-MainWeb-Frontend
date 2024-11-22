"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// Mock data for booked slots
const bookedSlots = [
  { date: new Date(2024, 10, 15), slot: "morning" },
  { date: new Date(2024, 10, 15), slot: "afternoon" },
  { date: new Date(2024, 10, 18), slot: "morning" },
  { date: new Date(2024, 10, 20), slot: "afternoon" },
];

export default function ReservationCalendar() {
  return (
    <div className="m-8 p-2 grid ">
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          // dateClick={handleDateClick}
          selectable={true}
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
          select={function (info) {
            console.log(info.startStr);
          }}
          // selectAllow={function (selectInfo) {
          //   return selectInfo.startStr !== "2024-11-26";
          // }}
          selectOverlap={function (event) {
            return event.display !== "background";
          }}
        />
      </div>
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
