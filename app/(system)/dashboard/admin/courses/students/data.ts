export const courses = [
  { id: 1, name: "Introduction to Programming" },
  { id: 2, name: "Web Development Fundamentals" },
  { id: 3, name: "Data Science Basics" },
  { id: 4, name: "Machine Learning 101" },
  { id: 5, name: "Advanced Mathematics" },
];

export const requests = [
  {
    id: 1,
    courseId: 1,
    studentName: "Alice Johnson",
    email: "alice@example.com",
    profileImg: "/placeholder.svg?height=40&width=40",
    grade: "A",
    state: "PENDING",
  },
  {
    id: 2,
    courseId: 1,
    studentName: "Bob Smith",
    email: "bob@example.com",
    profileImg: "/placeholder.svg?height=40&width=40",
    grade: "B",
    state: "NOTPAID",
  },
  {
    id: 3,
    courseId: 2,
    studentName: "Charlie Brown",
    email: "charlie@example.com",
    profileImg: "/placeholder.svg?height=40&width=40",
    grade: "C",
    state: "REJECTED",
  },
  {
    id: 4,
    courseId: 2,
    studentName: "Diana Prince",
    email: "diana@example.com",
    profileImg: "/placeholder.svg?height=40&width=40",
    grade: "A",
    state: "ENROLLED",
  },
  {
    id: 5,
    courseId: 3,
    studentName: "Eva Green",
    email: "eva@example.com",
    profileImg: "/placeholder.svg?height=40&width=40",
    grade: "B",
    state: "PENDING",
  },
];

export type Course = (typeof courses)[0];
export type Request = (typeof requests)[0];
