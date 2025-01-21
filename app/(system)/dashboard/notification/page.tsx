"use client";

import React, { useEffect, useState } from "react";
import { NotificationItem } from "./notificationItem";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";
import Axios from "@/config/axios";
import { Notification } from "@/utils/types";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) return;

    const fetchNotifications = async () => {
      try {
        const res = await Axios.get("/notifications", {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        setNotifications(res.data);
      } catch (error) {}
    };
    fetchNotifications();
  }, [status]);

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
  } else if (notifications.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">Notifications</h1>
        <p className="text-gray-500 text-center">No notifications found.</p>
      </div>
    );
  } else
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">Notifications</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              setNotifications={setNotifications}
            />
          ))}
        </div>
      </div>
    );
};

export default NotificationPage;
