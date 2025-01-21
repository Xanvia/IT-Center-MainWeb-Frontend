"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/common";
import { Notification } from "@/utils/types";
import Axios from "@/config/axios";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { CheckCheck, Trash2 } from "lucide-react";

interface NotificationItemProps {
  notification: Notification;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

export function NotificationItem({
  notification,
  setNotifications,
}: NotificationItemProps) {
  const [isRead, setIsRead] = useState(notification.isRead);
  const { data: session } = useSession();

  const deleteNotification = async (id: string) => {
    try {
      await Axios.delete(`/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      setNotifications((prev: Notification[]) =>
        prev.filter((n: Notification) => n.id !== id)
      );

      toast({ description: "Notification deleted successfully" });
    } catch (error) {
      console.error(error);
      toast({ description: "Failed to delete notification" });
    }
  };

  const handleMarkAsRead = async () => {
    // API call to mark notification as read
    try {
      const res = await Axios.patch(
        `/notifications/${notification.id}`,
        {
          isRead: true,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      setIsRead(true);
    } catch (error) {
      console.error(error);
      toast({ description: "Failed to mark notification as read" });
    }
  };

  return (
    <div className={`p-4 border-b  ${isRead ? "bg-gray-50" : "bg-white"}`}>
      <div className="flex justify-between items-start mb-2">
        <Badge
          variant={
            notification.sender === "SYSTEM" ? "secondary" : "destructive"
          }
        >
          {notification.sender}
        </Badge>
        <span className="text-sm text-gray-500">
          {formatDate(notification.createdDate)}
        </span>
      </div>
      <p className="text-gray-800 mb-1 font-bold">{notification.subject}</p>
      <p className="text-gray-600 mb-2 text-medium">{notification.content}</p>
      <div className="flex justify-end gap-3 items-center">
        {!isRead && (
          <button
            onClick={handleMarkAsRead}
            className="text-sm text-gray-800 hover:text-gray-500 flex items-center gap-1"
          >
            <CheckCheck /> set read
          </button>
        )}
        <Trash2
          onClick={() => deleteNotification(notification.id)}
          className="h-4 w-4 text-red-600 cursor-pointer"
        />
      </div>
    </div>
  );
}
