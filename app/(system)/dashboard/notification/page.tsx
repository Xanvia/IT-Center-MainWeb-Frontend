"use client";

import React from "react";
import { NotificationItem } from "./notificationItem";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";

const NotificationPage = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">Notifications</h1>
        {/* centered loading spinner */}
        <div className="flex justify-center items-center h-20 animate-spin">
          <Loader />
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-600">Notifications</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {mockNotifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;

export interface Notification {
  id: string;
  sender: "SYSTEM" | "ADMIN";
  content: string;
  isRead: boolean;
  date: Date;
}

export const mockNotifications: Notification[] = [
  {
    id: "1",
    sender: "SYSTEM",
    content: "Your account has been successfully created.",
    isRead: false,
    date: new Date("2023-05-01T10:00:00"),
  },
  {
    id: "2",
    sender: "ADMIN",
    content: "Important: System maintenance scheduled for tomorrow.",
    isRead: true,
    date: new Date("2023-05-02T14:30:00"),
  },
  {
    id: "3",
    sender: "SYSTEM",
    content: "New feature available: Dark mode. Try it now!",
    isRead: false,
    date: new Date("2023-05-03T09:15:00"),
  },
];
