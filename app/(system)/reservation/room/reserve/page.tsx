import ReservationCalendar from "../../components/calender";
import { ReservationForm } from "../../components/requestForm";

export default function ReservationPage() {
  return (
    <div>
      <ReservationCalendar />
      <ReservationForm />
    </div>
  );
}
