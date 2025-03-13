"use client";

import { useEffect, useState } from "react";
import { Loader, Trash2 } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getAbsoluteImageUrl } from "@/utils/common";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

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
  batch: string;
  status: RequestState;
  studentId: string;
};
type Course = {
  courseId: string;
  courseName: string;
  students: Student[];
};

export default function AdminDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [selectedTab, setSelectedTab] = useState<RequestState>("PENDING");
  const [loading, setLoading] = useState(false);
  const [batches, setBatches] = useState<string[]>([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [isNewBatch, setIsNewBatch] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  // update student status
  const updateStudentStatus = async (
    studentId: string,
    newStatus: RequestState
  ) => {
    try {
      setLoading(true);
      await Axios.patch(
        `/registration-records/${studentId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

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
      toast({
        description: "Student status updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to update student status",
      });
    } finally {
      setLoading(false);
    }
  };

  // update student grade
  const updateStudentGrade = async (studentId: string, newGrade: string) => {
    try {
      setLoading(true);
      const student = selectedCourse.students.find((s) => s.id === studentId);
      if (student && student.status === "COMPLETED") {
        await Axios.patch(
          `/registration-records/${studentId}`,
          {
            result: newGrade,
          },
          {
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );

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
        toast({
          description: "Student grade updated successfully",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to update student grade",
      });
    } finally {
      setLoading(false);
    }
  };

  // delete student
  const deleteStudent = async (studentId: string) => {
    try {
      await Axios.delete(`/registration-records/${studentId}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

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
      toast({
        description: "Student removed successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to remove student",
      });
    }
  };

  const filteredStudents = selectedCourse?.students.filter(
    (student) => student.status === selectedTab
  );

  async function approveAll() {
    if (!selectedBatch) {
      toast({
        variant: "destructive",
        description: "Please select a batch first",
      });
      return;
    }
    try {
      setLoading(true);

      await Axios.put(
        `/registration-records/all/approve`,
        {
          courseId: selectedCourse.courseId,
          status: "PENDING",
          newStatus: "NOT-PAID",
          batch: selectedBatch,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      // Update local state
      setCourses((prevCourses) =>
        prevCourses.map((course) => ({
          ...course,
          students: course.students.map((student) =>
            student.status === "PENDING"
              ? { ...student, status: "ENROLLED", batch: selectedBatch }
              : student
          ),
        }))
      );

      setSelectedCourse((prevCourse) => ({
        ...prevCourse,
        students: prevCourse.students.map((student) =>
          student.status === "PENDING"
            ? { ...student, status: "ENROLLED", batch: selectedBatch }
            : student
        ),
      }));

      // Reset batch selection
      setSelectedBatch("");
      setIsNewBatch(false);
      toast({
        description: "All students approved successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to approve students",
      });
    } finally {
      setLoading(false);
    }
  }

  async function completeAll() {
    if (!selectedBatch) {
      toast({
        variant: "destructive",
        description: "Please select a batch first",
      });
      return;
    }
    try {
      setLoading(true);

      await Axios.put(
        `/registration-records/all/complete`,
        {
          courseId: selectedCourse.courseId,
          status: "ENROLLED",
          newStatus: "COMPLETED",
          batch: selectedBatch,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      // Update local state
      setCourses((prevCourses) =>
        prevCourses.map((course) => ({
          ...course,
          students: course.students.map((student) =>
            student.status === "ENROLLED" && student.batch === selectedBatch
              ? { ...student, status: "COMPLETED" }
              : student
          ),
        }))
      );

      setSelectedCourse((prevCourse) => ({
        ...prevCourse,
        students: prevCourse.students.map((student) =>
          student.status === "ENROLLED" && student.batch === selectedBatch
            ? { ...student, status: "COMPLETED" }
            : student
        ),
      }));

      setSelectedBatch("");
      toast({
        description: "All students marked as completed successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to complete All students",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!session) return;
    const fetchCourseStudentList = async () => {
      try {
        const response = await Axios.get("/registration-records/requests", {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        const data: Course[] = await response.data;
        console.log(data);
        setCourses(data);

        // set batches
        const batchesList = data.map((course) =>
          course.students.map((student) => student.batch)
        );
        const uniqueBatches = [...new Set(batchesList.flat())].filter(Boolean);
        setBatches(uniqueBatches);

        if (data.length > 0) {
          setSelectedCourse(data[0]); // default selected first course
        }
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Something went wrong!",
        });
      }
    };

    fetchCourseStudentList();
  }, [session]);

  if (status === "loading") {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">
          Student Management
        </h1>
        {/* centered loading spinner */}
        <div className="flex justify-center items-center h-20 animate-spin">
          <Loader />
        </div>
      </div>
    );
  } else if (
    session?.user?.role !== "ADMIN" &&
    session?.user?.role !== "S_ADMIN"
  ) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">
          Student Management
        </h1>
        <div className="grid gap-4">
          <p>Sorry :( You are not Authorized to view this page.</p>
        </div>
      </div>
    );
  } else
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">
          Student Management
        </h1>

        <div className="flex gap-4">
          <div className="w-1/5">
            <h2 className="text-lg font-semibold mb-5">Courses</h2>
            <div className="space-y-2">
              {courses.map((course) => (
                <Button
                  key={course.courseId}
                  variant={
                    course.courseId === selectedCourse?.courseId
                      ? "maroonTheme"
                      : "outline"
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
            <div className="flex justify-between  ">
              <h2 className="text-lg font-semibold mb-5">
                {selectedCourse?.courseName}
              </h2>
              {selectedTab === "PENDING" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size={"sm"} variant="outline" onClick={() => {}}>
                      Approve All
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Are you Sure?</DialogTitle>
                    </DialogHeader>
                    <div>
                      <p className="text-sm">
                        Are you sure you want to approve all the students?
                      </p>
                      {/* Input to get batch before approve with create new batch option */}
                      <div className="mt-4">
                        {isNewBatch ? (
                          <input
                            type="text"
                            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            placeholder="Enter new batch name"
                            value={selectedBatch}
                            onChange={(e) => setSelectedBatch(e.target.value)}
                          />
                        ) : (
                          <Select
                            value={selectedBatch}
                            onValueChange={(value) => {
                              if (value === "new") {
                                setIsNewBatch(true);
                                setSelectedBatch("");
                              } else {
                                setSelectedBatch(value);
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Batch" />
                            </SelectTrigger>
                            <SelectContent>
                              {batches.map((batch) => (
                                <SelectItem
                                  className="cursor-pointer  hover:bg-slate-200"
                                  key={batch}
                                  value={batch}
                                >
                                  {batch}
                                </SelectItem>
                              ))}
                              <SelectItem
                                className="cursor-pointer hover:bg-slate-200"
                                value="new"
                              >
                                + Add New Batch
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                      <div className="flex justify-end gap-4 mt-4">
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              onClick={() => {
                                approveAll();
                              }}
                              type="submit"
                              className="bg-red-600"
                            >
                              Approve All
                            </Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              onClick={() => {
                                setIsNewBatch(false);
                              }}
                              type="submit"
                            >
                              Cancel
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              {selectedTab === "ENROLLED" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size={"sm"} variant="outline" onClick={() => {}}>
                      Complete All
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Are you Sure?</DialogTitle>
                    </DialogHeader>
                    <div>
                      <p className="text-sm">
                        Are you sure you want to complete all the students for
                        the following batch?
                      </p>
                      {/* Input to get batch before approve with create new batch option */}
                      <div className="mt-4">
                        <Select
                          value={selectedBatch}
                          onValueChange={(value) => {
                            if (value === "new") {
                              setIsNewBatch(true);
                              setSelectedBatch("");
                            } else {
                              setSelectedBatch(value);
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Batch" />
                          </SelectTrigger>
                          <SelectContent>
                            {batches.map((batch) => (
                              <SelectItem
                                className="cursor-pointer  hover:bg-slate-200"
                                key={batch}
                                value={batch}
                              >
                                {batch}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-4 mt-4">
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              onClick={() => {
                                completeAll();
                              }}
                              type="submit"
                              className="bg-red-600"
                            >
                              Complete All
                            </Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button onClick={() => {}} type="submit">
                              Cancel
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

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
                      {selectedTab !== "PENDING" &&
                        selectedTab !== "REJECTED" && (
                          <TableHead>Batch</TableHead>
                        )}
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
                            showFallback
                            src={getAbsoluteImageUrl(student.profileImage)}
                            name={student.name}
                            className="cursor-pointer"
                            size="md"
                            onClick={() =>
                              router.push(
                                `/dashboard/profile/student/${student.studentId}`
                              )
                            }
                          ></Avatar>
                        </TableCell>
                        <TableCell>{student.name}</TableCell>
                        {selectedTab !== "PENDING" &&
                          selectedTab !== "REJECTED" && (
                            <TableCell>{student.batch}</TableCell>
                          )}
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
            <div className={`${loading ? "block" : "hidden"}`}>
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                <Loader className="text-gray-200 animate-spin h-10 w-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
