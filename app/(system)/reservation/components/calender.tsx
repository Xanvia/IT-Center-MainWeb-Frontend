"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";
import Axios from "@/config/axios";
import { Event } from "@/utils/types";

export default function ReservationCalendar({
  setDate,
  reservationId,
}: {
  setDate: (date: DateRange | undefined) => void;
  reservationId: string;
}) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await Axios.get(
          `/reserve-records/reservation/${reservationId}`
        );
        const data = await response.data;
        console.log(data);
        setEvents(
          data.map((event: any) => ({
            title: event.eventName,
            start: event.startingDate,
            end: event.endingDate,
            color: event.timeSlot === "FULLDAY" ? "#ff9f1c" : "#ff9fac",
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, [reservationId]);

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
          events={events}
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
