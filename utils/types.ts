export type User = {
  id: string;
  name: string;
  email: string;
};

export interface Reservation {
  id: string;
  name: string;
  description: string;
  images: string[];
  seatLimit: number;
  noOfComputers: number;
  availableSoftwares: string;
  equipment: string;
  isAC: boolean;
  bestCase: string;
  location: string;
  feeRatePerHour: number;
}

export type Event = {
  title: string;
  start: string;
  end: string;
  display: string;
  color?: string;
  timeSlot?: string;
};

export type ReservationStatus =
  | "PENDING"
  | "PAYMENT"
  | "CONFIRMED"
  | "REJECTED"
  | "DONE";

export interface ReservationRequest {
  id: string;
  eventName: string;
  startingDate: string;
  endingDate: string;
  timeSlot: "MORNING" | "AFTERNOON" | "FULLDAY";
  status: ReservationStatus;
}
