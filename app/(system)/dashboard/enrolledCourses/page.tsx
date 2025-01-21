"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import axios from "@/config/axios";
import { Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface EnrollmentRequest {
  id: string;
  registrationDate: string;
  status: "PENDING" | "COMPLETED" | "NOT-PAID" | "REJECTED" | "ENROLLED";
  result: string;
  paymentDate: string | null;
  course: {
    id: string;
    courseName: string;
    courseCode: string;
    fees: number;
  };
}

export default function EnrollmentRequestsTable() {
  const [enrollmentRequests, setEnrollmentRequests] = useState<
    EnrollmentRequest[]
  >([]);

  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    const fetchEnrollmentRequests = async () => {
      try {
        const response = await axios.get("/registration-records/user", {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        const data = await response.data;
        console.log(data);
        setEnrollmentRequests(data);
      } catch (error) {
        console.error("Error fetching enrollment requests:", error);
      }
    };

    fetchEnrollmentRequests();
  }, [session]);

  const handleDeleteER = async (id: string) => {
    // Implement delete logic here

    try {
      await axios.delete(`/registration-records/${id}`);
      toast({ description: "Request deleted successfully" });
    } catch (error) {
      toast({ description: "Failed to delete the request" });
    }
    setEnrollmentRequests(enrollmentRequests.filter((r) => r.id !== id));
  };

  const handlePayment = async (id: string) => {
    // Implement payment logic here
    console.log("Process payment for:", id);
  };

  if (!session) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Enrollment Requests</h1>
        {/* centered loading spinner */}
        <div className="flex justify-center items-center h-20 animate-spin">
          <Loader />
        </div>
      </div>
    );
  } else
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Enrollment Requests</h1>

        <div className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Index</TableHead>
                <TableHead>Course Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Request State</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollmentRequests.map((request, index) => (
                <TableRow key={request.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{request.course.courseCode}</TableCell>
                  <TableCell>{request.course.courseName}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    {request.result === "NA" ? "NA" : request.result}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handlePayment(request.id)}
                      disabled={request.status !== "NOT-PAID"}
                      variant="yellow"
                      className="transition-colors duration-200"
                    >
                      Pay
                    </Button>
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          disabled={
                            request.status === "COMPLETED" ||
                            request.status === "REJECTED" ||
                            request.status === "ENROLLED"
                          }
                          variant="destructive"
                          className="bg-red-700"
                          size="icon"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your enrollment request.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteER(request.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
}
