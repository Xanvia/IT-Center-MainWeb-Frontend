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
  computers: number;
  availableSoftware: string;
  equipment: string;
  isAC: boolean;
  bestCase: string;
  location: string;
  feeRatePerHour: number;
}
