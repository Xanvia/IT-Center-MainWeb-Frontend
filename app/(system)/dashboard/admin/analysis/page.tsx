"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Loader, Send, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import Axios from "@/config/axios";

type faqData = {
  id: string;
  email: string;
  description: string;
  isRead: false;
  createdDate: string;
};

type userData = {
  students: number;
  staff: number;
  users: number;
};

type courseData = {
  totalCourses: number;
  totalStudents: {
    code: string;
    total: number;
  }[];
  totalStudentsLast6Months: {
    month: string;
    count: number;
  }[];
};

export default function AdminAnalysis() {
  const [notificationSubject, setNotificationSubject] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationRecipient, setNotificationRecipient] = useState<
    "STUDENT" | "ALL" | "STAFF"
  >("STUDENT");
  const { data: session, status } = useSession();

  const [faqData, setFaqData] = useState<faqData[]>([]);

  const [userData, setUserData] = useState<userData>({
    students: 0,
    staff: 0,
    users: 0,
  });

  const [courseData, setCourseData] = useState<courseData>({
    totalCourses: 0,
    totalStudents: [
      {
        code: "CSC1002",
        total: 5,
      },
      {
        code: "CSC1003",
        total: 8,
      },
    ],
    totalStudentsLast6Months: [
      {
        month: "January",
        count: 2,
      },
      {
        month: "December",
        count: 5,
      },
      {
        month: "November",
        count: 3,
      },
      {
        month: "October",
        count: 7,
      },
      {
        month: "September",
        count: 8,
      },
      {
        month: "August",
        count: 2,
      },
    ],
  });

  const deleteFAQ = async (id: string) => {
    try {
      await Axios.delete(`/feedbacks/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      setFaqData((prevData) => prevData.filter((faq) => faq.id !== id));
      toast({ description: "FAQ deleted successfully" });
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast({ description: "An error occurred while deleting the FAQ" });
    }
  };

  const handleSendNotification = async () => {
    // Implement the logic to send notifications here
    console.log("Sending notification:", {
      subject: notificationSubject,
      message: notificationMessage,
      recipient: notificationRecipient,
    });
    if (notificationMessage === "" || notificationSubject === "") {
      toast({ description: "Please fill in all fields" });
      return;
    }
    let url;
    if (notificationRecipient === "STUDENT") {
      url = "/notifications/allStudents";
    } else if (notificationRecipient === "STAFF") {
      url = "/notifications/allTeachers";
    } else {
      url = "/notifications/all";
    }
    try {
      await Axios.post(
        url,
        {
          sender: "ADMIN",
          subject: notificationSubject,
          content: notificationMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      toast({ description: "Notification sent successfully" });
    } catch (error) {
      console.error("Error sending notification:", error);
      toast({
        description: "An error occurred while sending the notification",
      });
    }
    // Reset form after sending
    setNotificationSubject("");
    setNotificationMessage("");
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await Axios.get("/user/stats", {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const getCourseData = async () => {
      try {
        const response = await Axios.get("/courses/stats", {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    const getFAQData = async () => {
      try {
        const response = await Axios.get("/feedbacks", {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        setFaqData(response.data);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    if (session) {
      getUserData();
      getCourseData();
      getFAQData();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">
          Admin Analysis Dashboard
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
          Admin Analysis Dashboard
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
          Admin Analysis Dashboard
        </h1>

        {/* Main stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.students}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.staff}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.users}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Number of Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {courseData.totalCourses}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Registrations by Course</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={courseData.totalStudents}>
                  <XAxis
                    dataKey="code"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Bar dataKey="total" fill="#D8A25E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                Monthly Student Registrations{" "}
                <span className="text-gray-400 pl-1">(Last 6 months)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={courseData.totalStudentsLast6Months}>
                  <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Bar dataKey="count" fill="#A04747" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{faq.description}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex justify-between items-center">
                      <p> Sender: {faq.email}</p>
                      <Trash2
                        onClick={() => deleteFAQ(faq.id)}
                        className="h-4 w-4 text-red-600 cursor-pointer"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Notification Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send Notifications</CardTitle>
            <CardDescription>
              Send notifications to students or all users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Notification subject"
                  value={notificationSubject}
                  onChange={(e) => setNotificationSubject(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here"
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Select
                  value={notificationRecipient}
                  onValueChange={(value) =>
                    setNotificationRecipient(
                      value as "STUDENT" | "ALL" | "STAFF"
                    )
                  }
                >
                  <SelectTrigger id="recipient">
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="STUDENT">Students</SelectItem>
                    <SelectItem value="STAFF">Staffs</SelectItem>
                    <SelectItem value="ALL">All Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="button" onClick={handleSendNotification}>
                <Send className="mr-2 h-4 w-4" /> Send Notification
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
}
