import { useState, useEffect } from "react";

interface CustomAlertProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type: "success" | "error";
}

export function CustomAlert({ message, isVisible, onClose }: CustomAlertProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-yellow-600 text-white px-6 py-4 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out">
      <div className="flex items-center">
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <p>{message}</p>
      </div>
    </div>
  );
}
