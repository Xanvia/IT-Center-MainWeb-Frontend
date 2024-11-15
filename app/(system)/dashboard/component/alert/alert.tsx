import { useState, useEffect } from "react";
import { XCircle } from "lucide-react";

interface AlertProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
  autoClose?: number;
}

export default function Alert({
  message,
  type,
  onClose,
  autoClose = 5000,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out animation before calling onClose
      }, autoClose);

      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  if (!isVisible) return null;

  const alertClasses = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
    info: "bg-blue-100 border-blue-500 text-blue-700",
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 mb-4 text-sm rounded-lg border ${alertClasses[type]} transition-opacity duration-300 ease-in-out`}
      role="alert"
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{message}</span>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 inline-flex h-8 w-8 hover:bg-gray-200 hover:text-gray-900"
        >
          <XCircle className="w-5 h-5" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
}
