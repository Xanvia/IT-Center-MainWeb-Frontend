import ReservationCalendar from "../../components/calender";

export default function ReservationPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reserve Your Spot</h1>
      <ReservationCalendar />
    </div>
  );
}
