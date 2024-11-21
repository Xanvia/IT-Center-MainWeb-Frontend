import ReservationCalendar from "../../components/calender";
import { ReservationForm } from "../../components/requestForm";

export default function ReservationPage() {
  return (
    <div className="grid md:grid-cols-7">
      <div className="md:col-span-4">
        <ReservationCalendar />
      </div>

      <div className="m-5 md:col-span-3">
        <ReservationForm />
      </div>
    </div>
  );
}
