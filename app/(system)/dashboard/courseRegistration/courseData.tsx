// courseData.tsx

/*
export interface Course {
  id: string;
  image: string;
  code: string;
  name: string;
  description: string;
  duration: string;
  lecturer: string;
  fee: number;
}

{
   export const undergraduateCourses: Course[] = [
  {
    id: "1",
    image: "/common/mainWeb.jpg",
    code: "CSC1010",
    name: "Introduction to Computer Science",
    description: "A foundational course covering basic programming concepts.",
    duration: "3 months",
    lecturer: "Dr. Jane Smith",
    fee: 500,
  },
  {
    id: "2",
    image: "/common/mainWeb.jpg",
    code: "MAT2010",
    name: "Linear Algebra",
    description: "Study of linear equations, matrices, and vector spaces.",
    duration: "4 months",
    lecturer: "Prof. John Doe",
    fee: 600,
  },
  {
    id: "3",
    image: "/common/mainWeb.jpg",
    code: "CSC1010",
    name: "Introduction to Computer Science",
    description: "A foundational course covering basic programming concepts.",
    duration: "3 months",
    lecturer: "Dr. Jane Smith",
    fee: 500,
  },
  {
    id: "4",
    image: "/common/mainWeb.jpg",
    code: "MAT2010",
    name: "Linear Algebra",
    description: "Study of linear equations, matrices, and vector spaces.",
    duration: "4 months",
    lecturer: "Prof. John Doe",
    fee: 600,
  },
  // Add more undergraduate courses as needed
];

export const externalCourses: Course[] = [
  {
    id: "5",
    image: "/common/mainWeb.jpg",
    code: "BUS3010",
    name: "Business Management",
    description: "Overview of business management principles and practices.",
    duration: "2 months",
    lecturer: "Dr. Emily Brown",
    fee: 450,
  },
  {
    id: "6",
    image: "/common/mainWeb.jpg",
    code: "ART1052",
    name: "Digital Art and Design",
    description: "Introduction to digital art tools and design principles.",
    duration: "3 months",
    lecturer: "Prof. Michael Chen",
    fee: 550,
  },
  // Add more external courses as needed
];
}

export const courses: Course[] = [
  {
    id: "1",
    image: "/common/mainWeb.jpg",
    code: "CSC1010",
    name: "Introduction to Computer Science",
    description: "A foundational course covering basic programming concepts.",
    duration: "3 months",
    lecturer: "Dr. Jane Smith",
    fee: 500,
  },
  {
    id: "2",
    image: "/common/mainWeb.jpg",
    code: "MAT2010",
    name: "Linear Algebra",
    description: "Study of linear equations, matrices, and vector spaces.",
    duration: "4 months",
    lecturer: "Prof. John Doe",
    fee: 600,
  },
  {
    id: "3",
    image: "/common/mainWeb.jpg",
    code: "CSC1010",
    name: "Introduction to Computer Science",
    description: "A foundational course covering basic programming concepts.",
    duration: "3 months",
    lecturer: "Dr. Jane Smith",
    fee: 500,
  },
  {
    id: "4",
    image: "/common/mainWeb.jpg",
    code: "MAT2010",
    name: "Linear Algebra",
    description: "Study of linear equations, matrices, and vector spaces.",
    duration: "4 months",
    lecturer: "Prof. John Doe",
    fee: 600,
  },
  {
    id: "5",
    image: "/common/mainWeb.jpg",
    code: "BUS3010",
    name: "Business Management",
    description: "Overview of business management principles and practices.",
    duration: "2 months",
    lecturer: "Dr. Emily Brown",
    fee: 450,
  },
  // Add more courses as needed
];
*/

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  duration: string;
  fees: number;
  startDate: string;
  endDate: string;
  audience: string;
  instructor: string;
  studentLimit: number;
}

export const courses: Course[] = [
  {
    id: "csc1010",
    code: "CSC1010",
    name: "Introduction to Computer Science",
    description:
      "A comprehensive introduction to the fundamental concepts of computer science, covering programming basics, algorithms, and data structures.",
    image: "/common/mainWeb.jpg",
    duration: "12 weeks",
    fees: 1200,
    startDate: "2023-09-01",
    endDate: "2023-11-24",
    audience: "Beginners with no prior programming experience",
    instructor: "Dr. Jane Smith",
    studentLimit: 30,
  },
  {
    id: "mat2012",
    code: "MAT2012",
    name: "Advanced Calculus",
    description:
      "An in-depth exploration of advanced calculus concepts, including multivariable calculus, vector calculus, and differential equations.",
    image: "/common/mainWeb.jpg",
    duration: "16 weeks",
    fees: 1500,
    startDate: "2023-08-15",
    endDate: "2023-12-05",
    audience: "Students with a strong foundation in basic calculus",
    instructor: "Prof. Michael Johnson",
    studentLimit: 25,
  },
  {
    id: "bio3013",
    code: "BIO3013",
    name: "Introduction to Biology",
    description:
      "A detailed study of molecular biology, covering DNA replication, transcription, translation, and gene regulation mechanisms.",
    image: "/common/mainWeb.jpg",
    duration: "14 weeks",
    fees: 1350,
    startDate: "2023-09-10",
    endDate: "2023-12-17",
    audience: "Biology majors with prerequisite knowledge in cell biology",
    instructor: "Dr. Emily Chen",
    studentLimit: 20,
  },
  {
    id: "zoo3011",
    code: "ZOO3011",
    name: "Introduction to Anatomy",
    description:
      "A detailed study of molecular biology, covering DNA replication, transcription, translation, and gene regulation mechanisms.",
    image: "/common/mainWeb.jpg",
    duration: "14 weeks",
    fees: 1350,
    startDate: "2023-09-10",
    endDate: "2023-12-17",
    audience: "Biology majors with prerequisite knowledge in cell biology",
    instructor: "Dr. Emily Chen",
    studentLimit: 20,
  },
];
