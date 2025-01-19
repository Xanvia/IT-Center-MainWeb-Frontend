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

export const courses: Course[] = [
  {
    id: "course-001",
    courseName: "Full-Stack Web Development",
    courseCode: "FSWD101",
    description:
      "Learn to build web applications from scratch using modern technologies like React, Node.js, and MongoDB.",
    duration: "3 months",
    startingDate: "2025-02-01",
    endingDate: "2025-04-30",
    studentLimit: 30,
    fees: 1500,
    instructor: "John Doe",
    audience: "Beginners to intermediate developers",
    images: [
      "https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp",
      "image2.jpg",
    ],
    registered: 12,
    registrationDeadline: "2025-01-25",
  },
  {
    id: "course-002",
    courseName: "Data Science with Python",
    courseCode: "DSPY202",
    description:
      "Master data analysis, visualization, and machine learning using Python libraries like Pandas, NumPy, and Scikit-learn.",
    duration: "4 months",
    startingDate: "2025-03-01",
    endingDate: "2025-06-30",
    studentLimit: 25,
    fees: 1800,
    instructor: "Jane Smith",
    audience: "Data enthusiasts and aspiring data scientists",
    images: [
      "https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp",
      "image4.jpg",
    ],
    registered: 20,
    registrationDeadline: "2025-02-20",
  },
  {
    id: "course-003",
    courseName: "Introduction to Cybersecurity",
    courseCode: "CYBR101",
    description:
      "Gain foundational knowledge in cybersecurity concepts, ethical hacking, and securing networks.",
    duration: "2 months",
    startingDate: "2025-02-15",
    endingDate: "2025-04-15",
    studentLimit: 20,
    fees: 1000,
    instructor: "Michael Brown",
    audience: "IT professionals and students",
    images: [
      "https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp",
      "image6.jpg",
    ],
    registered: 18,
    registrationDeadline: "2025-02-10",
  },
  {
    id: "course-004",
    courseName: "Artificial Intelligence Basics",
    courseCode: "AIB101",
    description:
      "Learn the principles of artificial intelligence, including machine learning, neural networks, and natural language processing.",
    duration: "3 months",
    startingDate: "2025-03-10",
    endingDate: "2025-06-09",
    studentLimit: 15,
    fees: 2000,
    instructor: "Sarah Johnson",
    audience: "Students and professionals interested in AI",
    images: [
      "https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp",
      "image8.jpg",
    ],
    registered: 10,
    registrationDeadline: "2025-02-28",
  },
  {
    id: "course-005",
    courseName: "Mobile App Development with Flutter",
    courseCode: "MADF303",
    description:
      "Build beautiful cross-platform mobile applications using Flutter and Dart.",
    duration: "2.5 months",
    startingDate: "2025-03-20",
    endingDate: "2025-06-05",
    studentLimit: 20,
    fees: 1600,
    instructor: "Emily Davis",
    audience: "Beginners to mobile app development",
    images: [
      "https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp",
      "image10.jpg",
    ],
    registered: 8,
    registrationDeadline: "2025-03-10",
  },
];
