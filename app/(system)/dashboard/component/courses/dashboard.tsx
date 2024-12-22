"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types
type RequestState = "PENDING" | "NOTPAID" | "REJECTED" | "ENROLLED";
type Student = {
  id: string;
  name: string;
  email: string;
  profileImg: string;
  grade: string;
  status: RequestState;
};
type Course = {
  id: string;
  name: string;
  students: Student[];
};

// Mock data
const mockCourses: Course[] = [
  {
    id: "1",
    name: "Introduction to React",
    students: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        profileImg: "/placeholder.svg?height=40&width=40",
        grade: "A",
        status: "PENDING",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        profileImg: "/placeholder.svg?height=40&width=40",
        grade: "B",
        status: "ENROLLED",
      },
      {
        id: "3",
        name: "Bob Johnson",
        email: "bob@example.com",
        profileImg: "/placeholder.svg?height=40&width=40",
        grade: "C",
        status: "NOTPAID",
      },
    ],
  },
  {
    id: "2",
    name: "Advanced JavaScript",
    students: [
      {
        id: "4",
        name: "Alice Brown",
        email: "alice@example.com",
        profileImg: "/placeholder.svg?height=40&width=40",
        grade: "A",
        status: "REJECTED",
      },
      {
        id: "5",
        name: "Charlie Davis",
        email: "charlie@example.com",
        profileImg: "/placeholder.svg?height=40&width=40",
        grade: "B",
        status: "ENROLLED",
      },
      {
        id: "6",
        name: "Eva Wilson",
        email: "eva@example.com",
        profileImg: "/placeholder.svg?height=40&width=40",
        grade: "A",
        status: "PENDING",
      },
    ],
  },
  {
    id: "3",
    name: "Web Design Fundamentals",
    students: [
      {
        id: "7",
        name: "Frank Miller",
        email: "frank@example.com",
        profileImg: "/placeholder.svg?height=40&width=40",
        grade: "B",
        status: "ENROLLED",
      },
      {
        id: "8",
        name: "Grace Lee",
        email: "grace@example.com",
        profileImg: "/placeholder.svg?height=40&width=40",
        grade: "A",
        status: "NOTPAID",
      },
      {
        id: "9",
        name: "Henry Taylor",
        email: "henry@example.com",
        profileImg: "/placeholder.svg?height=40&width=40",
        grade: "C",
        status: "REJECTED",
      },
    ],
  },
];

export default function AdminDashboard() {
  const [courses, setCourses] = useState(mockCourses);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [selectedTab, setSelectedTab] = useState<RequestState>("PENDING");

  const updateStudentStatus = (studentId: string, newStatus: RequestState) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => ({
        ...course,
        students: course.students.map((student) =>
          student.id === studentId ? { ...student, status: newStatus } : student
        ),
      }))
    );
  };

  const updateStudentGrade = (studentId: string, newGrade: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => ({
        ...course,
        students: course.students.map((student) =>
          student.id === studentId ? { ...student, grade: newGrade } : student
        ),
      }))
    );
  };

  const deleteStudent = (studentId: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => ({
        ...course,
        students: course.students.filter((student) => student.id !== studentId),
      }))
    );
  };

  const filteredStudents = selectedCourse.students.filter(
    (student) => student.status === selectedTab
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">LMS Admin Dashboard</h1>
      <div className="flex gap-4">
        <div className="w-1/4">
          <h2 className="text-xl font-semibold mb-2">Courses</h2>
          <div className="space-y-2">
            {courses.map((course) => (
              <Button
                key={course.id}
                variant={
                  course.id === selectedCourse.id ? "default" : "outline"
                }
                className="w-full justify-start"
                onClick={() => setSelectedCourse(course)}
              >
                {course.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="w-3/4">
          <h2 className="text-xl font-semibold mb-2">{selectedCourse.name}</h2>
          <Tabs
            value={selectedTab}
            onValueChange={(value) => setSelectedTab(value as RequestState)}
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="PENDING">Pending</TabsTrigger>
              <TabsTrigger value="NOTPAID">Not Paid</TabsTrigger>
              <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
              <TabsTrigger value="ENROLLED">Enrolled</TabsTrigger>
            </TabsList>
            <TabsContent value={selectedTab}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Profile</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <img
                          src={student.profileImg}
                          alt={student.name}
                          className="w-10 h-10 rounded-full"
                        />
                      </TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>
                        <Select
                          value={student.grade}
                          onValueChange={(value) =>
                            updateStudentGrade(student.id, value)
                          }
                        >
                          <SelectTrigger className="w-[80px]">
                            <SelectValue placeholder="Grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {["A", "B", "C", "D", "F"].map((grade) => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={student.status}
                          onValueChange={(value) =>
                            updateStudentStatus(
                              student.id,
                              value as RequestState
                            )
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            {(
                              [
                                "PENDING",
                                "NOTPAID",
                                "REJECTED",
                                "ENROLLED",
                              ] as RequestState[]
                            ).map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => deleteStudent(student.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
