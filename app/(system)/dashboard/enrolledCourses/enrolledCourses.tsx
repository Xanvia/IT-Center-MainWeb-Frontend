export interface EnrolledCourse {
  id: string;
  results: string | null;
  studentID: string;
  courseId: string;
  registrationDate: string;
  status: "Pending" | "Approved" | "Rejected";
  paymentDate: string; // nullable
}

const enrolledCourses: EnrolledCourse[] = [
  {
    id: "EC001",
    results: null,
    studentID: "STU12345",
    courseId: "CSE101",
    registrationDate: "2023-10-10",
    status: "Pending",
    paymentDate: "2023-10-15",
  },
  {
    id: "EC002",
    results: "A",
    studentID: "STU67890",
    courseId: "MATH202",
    registrationDate: "2023-09-20",
    status: "Approved",
    paymentDate: "2023-10-15",
  },
  {
    id: "EC003",
    results: "B",
    studentID: "STU54321",
    courseId: "PHY303",
    registrationDate: "2023-08-05",
    status: "Rejected",
    paymentDate: "2023-10-15",
  },
];
