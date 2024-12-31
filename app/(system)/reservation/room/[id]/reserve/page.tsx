"use client";
import { useState } from "react";
import ReservationCalendar from "../../../components/calender";
import { ReservationForm } from "../../../components/requestForm";
import { DateRange } from "react-day-picker";

export default function ReservationPage({
  params,
}: {
  params: { id: string };
}) {
  const slug = params.id;
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <div className="grid md:grid-cols-7">
      <div className="md:col-span-4">
        <ReservationCalendar setDate={setDate} reservationId={slug} />
      </div>

      <div className="m-5 md:col-span-3">
        <ReservationForm date={date} reservationId={slug} />
      </div>
    </div>
  );
}
