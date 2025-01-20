"use client";

import { useEffect, useState } from "react";
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
import { Avatar } from "@nextui-org/react";
import Axios from "@/config/axios";
import { co } from "@fullcalendar/core/internal-common";
import { getAbsoluteImageUrl } from "@/utils/common";
import { useRouter } from "next/navigation";

// Types
type RequestState =
  | "PENDING"
  | "NOT-PAID"
  | "REJECTED"
  | "ENROLLED"
  | "COMPLETED";
type Student = {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  grade: string;
  status: RequestState;
  studentId: string;
};
type Course = {
  id: string;
  courseName: string;
  students: Student[];
};

export default function AdminDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [selectedTab, setSelectedTab] = useState<RequestState>("PENDING");
  const router = useRouter();

  // update student status
  const updateStudentStatus = async (
    studentId: string,
    newStatus: RequestState
  ) => {
    try {
      await Axios.patch(`/registration-records/${studentId}`, {
        status: newStatus,
      });

      setCourses((prevCourses) =>
        prevCourses.map((course) => ({
          ...course,
          students: course.students.map((student) =>
            student.id === studentId
              ? { ...student, status: newStatus }
              : student
          ),
        }))
      );
      setSelectedCourse((prevCourse) => ({
        ...prevCourse,

        students: prevCourse.students.map((student) =>
          student.id === studentId ? { ...student, status: newStatus } : student
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // update student grade
  const updateStudentGrade = async (studentId: string, newGrade: string) => {
    try {
      const student = selectedCourse.students.find((s) => s.id === studentId);
      if (student && student.status === "COMPLETED") {
        await Axios.patch(`/registration-records/${studentId}`, {
          result: newGrade,
        });

        setCourses((prevCourses) =>
          prevCourses.map((course) => ({
            ...course,
            students: course.students.map((student) =>
              student.id === studentId
                ? { ...student, grade: newGrade }
                : student
            ),
          }))
        );
        setSelectedCourse((prevCourse) => ({
          ...prevCourse,
          students: prevCourse.students.map((student) =>
            student.id === studentId ? { ...student, grade: newGrade } : student
          ),
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete student
  const deleteStudent = async (studentId: string) => {
    try {
      await Axios.delete(`/registration-records/${studentId}`);

      setCourses((prevCourses) =>
        prevCourses.map((course) => ({
          ...course,
          students: course.students.filter(
            (student) => student.id !== studentId
          ),
        }))
      );
      setSelectedCourse((prevCourse) => ({
        ...prevCourse,
        students: prevCourse.students.filter(
          (student) => student.id !== studentId
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const filteredStudents = selectedCourse?.students.filter(
    (student) => student.status === selectedTab
  );

  useEffect(() => {
    const fetchCourseStudentList = async () => {
      try {
        const response = await Axios.get("/registration-records/requests");
        const data = await response.data;
        console.log(data);
        setCourses(data);

        if (data.length > 0) {
          setSelectedCourse(data[0]); // default selected first course
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourseStudentList();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-maroon font-bold mb-10 text-center">
        Student Management
      </h1>
      <div className="flex gap-4">
        <div className="w-1/5">
          <h2 className="text-lg font-semibold mb-5">Courses</h2>
          <div className="space-y-2">
            {courses.map((course) => (
              <Button
                key={course.id}
                variant={
                  course.id === selectedCourse?.id ? "maroonTheme" : "outline"
                }
                className="w-full justify-start"
                onClick={() => setSelectedCourse(course)}
              >
                <p className="truncate">{course.courseName}</p>
              </Button>
            ))}
          </div>
        </div>
        <div className="w-4/5">
          <h2 className="text-lg font-semibold mb-5">
            {selectedCourse?.courseName}
          </h2>
          <Tabs
            value={selectedTab}
            onValueChange={(value) => setSelectedTab(value as RequestState)}
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="ENROLLED">Enrolled</TabsTrigger>
              <TabsTrigger value="PENDING">Pending</TabsTrigger>
              <TabsTrigger value="NOT-PAID">Not-Paid</TabsTrigger>
              <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
              <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value={selectedTab}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Index</TableHead>
                    <TableHead>Profile</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents?.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Avatar
                          onClick={() =>
                            router.push(
                              `/dashboard/profile/student/${student.studentId}`
                            )
                          }
                          showFallback
                          src={getAbsoluteImageUrl(student.profileImage)}
                          name={student.name}
                          size="md"
                          alt={student.name}
                          className="mr-3 cursor-pointer"
                        ></Avatar>
                      </TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <Select
                          value={student.grade}
                          onValueChange={(value) =>
                            updateStudentGrade(student.id, value)
                          }
                          disabled={student.status !== "COMPLETED"}
                        >
                          <SelectTrigger className="w-[80px]">
                            <SelectValue placeholder="Grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {["A", "B", "C", "D", "F", "NA"].map((grade) => (
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
                                "NOT-PAID",
                                "REJECTED",
                                "ENROLLED",
                                "COMPLETED",
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
                          className="bg-red-700"
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
