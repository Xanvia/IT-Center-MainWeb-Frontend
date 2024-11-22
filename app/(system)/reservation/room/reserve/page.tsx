"use client";
import { useState } from "react";
import ReservationCalendar from "../../components/calender";
import { ReservationForm } from "../../components/requestForm";
import { DateRange } from "react-day-picker";

export default function ReservationPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: new Date(2022, 0, 20),
  });

  return (
    <div className="grid md:grid-cols-7">
      <div className="md:col-span-4">
        <ReservationCalendar setDate={setDate} />
      </div>

      <div className="m-5 md:col-span-3">
        <ReservationForm date={date} setDate={setDate} />
      </div>
    </div>
  );
}
