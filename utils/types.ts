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
  reservation: {
    name: string;
  };
}
export interface StuProfile {
  email: string;
  name: string;
  image: string;
  studentId: string;
  studentProfile: {
    displayName: string;
    title: string;
    fullName: string;
    nameWithIntials: string;
    dateOfBirth: string;
    nationalIdCardNo: string;
    address: string;
    phoneNumber: string;
    otherQualification: string;
    education: {
      englishOL: string;
      mathematicsOL: string;
      scienceOL: string;
      aLevelResults: {
        subject: string;
        grade: string;
      }[];
    };
    higherEdu: {
      FOQualification: string;
      date: string;
      institute: string;
    }[];
    employment: {
      institution: string;
      designation: string;
      officeAddress: string;
      officePhone: string;
    };
  };
}

export interface staffProfileData {
  email: string;
  image?: string;
  staffProfile: {
    id: string;
    displayName: string;
    title: string;
    designation: string;
    nominal: string;
    extNo: string;
    emails: {
      email: string;
    }[];
    telephones: {
      phoneNumber: string;
    }[];
  };
}

export interface Course {
  id: string;
  courseName: string;
  courseCode: string;
  description: string;
  duration: string;
  startingDate: string;
  endingDate: string;
  studentLimit: number;
  fees: number;
  instructor?: string;
  audience: string;
  images: string[];
  registered?: number;
  registrationDeadline: string;
}
