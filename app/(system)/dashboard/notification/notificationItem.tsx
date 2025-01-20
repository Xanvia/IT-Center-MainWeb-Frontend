"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/common";
import { Notification } from "@/utils/types";

interface NotificationItemProps {
  notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const [isRead, setIsRead] = useState(notification.isRead);

  const handleMarkAsRead = () => {
    setIsRead(true);
    // Here you would typically call an API to update the notification status
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
      <p className="text-gray-800 mb-2">{notification.content}</p>
      {!isRead && (
        <button
          onClick={handleMarkAsRead}
          className="text-sm text-blue-800 hover:text-blue-500"
        >
          Mark as read
        </button>
      )}
    </div>
  );
}
