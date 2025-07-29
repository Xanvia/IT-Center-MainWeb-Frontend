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
    // Log the error to an error reporting service
    console.error("Production error:", error);

    // Log additional debugging info
    console.error("Error digest:", error.digest);
    console.error("Error stack:", error.stack);
    console.error("Environment check:", {
      NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
      NODE_ENV: process.env.NODE_ENV,
    });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 max-w-2xl">
          <p className="text-red-700 mb-2">
            <strong>Error:</strong> {error.message}
          </p>
          {error.digest && (
            <p className="text-red-600 text-sm">
              <strong>Digest:</strong> {error.digest}
            </p>
          )}
          <details className="mt-2">
            <summary className="cursor-pointer text-red-600 hover:text-red-800">
              Show technical details
            </summary>
            <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto">
              {error.stack}
            </pre>
          </details>
        </div>
        <button
          onClick={() => reset()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
