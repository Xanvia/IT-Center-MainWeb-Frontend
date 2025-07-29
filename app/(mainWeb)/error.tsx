"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Main web error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="text-center p-8">
        <h2 className="text-3xl font-bold mb-4 text-red-600">Page Error</h2>
        <p className="text-gray-700 mb-4">
          There was an error loading this page. This might be due to:
        </p>
        <ul className="text-left text-gray-600 mb-6 max-w-md">
          <li>• Network connectivity issues</li>
          <li>• Server configuration problems</li>
          <li>• Missing environment variables</li>
        </ul>
        <div className="space-x-4">
          <button
            onClick={() => reset()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
