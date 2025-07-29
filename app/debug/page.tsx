"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface DebugInfo {
  environment: string;
  backendUrl: string | undefined;
  userAgent: string;
  timestamp: string;
  sessionStatus: string;
  networkStatus: string;
}

export default function DebugPage() {
  const { data: session, status } = useSession();
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [networkTest, setNetworkTest] = useState<string>("Testing...");

  useEffect(() => {
    const info: DebugInfo = {
      environment: process.env.NODE_ENV || "unknown",
      backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
      userAgent:
        typeof window !== "undefined" ? window.navigator.userAgent : "server",
      timestamp: new Date().toISOString(),
      sessionStatus: status,
      networkStatus: "unknown",
    };

    setDebugInfo(info);

    // Test network connectivity
    const testNetwork = async () => {
      try {
        if (process.env.NEXT_PUBLIC_BACKEND_URL) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/health`,
            {
              method: "GET",
              signal: AbortSignal.timeout(5000),
            }
          );
          setNetworkTest(
            response.ok
              ? "Backend reachable"
              : `Backend error: ${response.status}`
          );
        } else {
          setNetworkTest("Backend URL not configured");
        }
      } catch (error) {
        setNetworkTest(
          `Network error: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    };

    testNetwork();
  }, [status]);

  if (!debugInfo) {
    return <div>Loading debug info...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Production Debug Information
        </h1>

        <div className="grid gap-6">
          {/* Environment Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Environment</h2>
            <div className="space-y-2">
              <div>
                <strong>Environment:</strong> {debugInfo.environment}
              </div>
              <div>
                <strong>Backend URL:</strong>{" "}
                {debugInfo.backendUrl || "Not configured"}
              </div>
              <div>
                <strong>Timestamp:</strong> {debugInfo.timestamp}
              </div>
              <div>
                <strong>User Agent:</strong>{" "}
                {debugInfo.userAgent.substring(0, 100)}...
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Session Status</h2>
            <div className="space-y-2">
              <div>
                <strong>Status:</strong> {debugInfo.sessionStatus}
              </div>
              <div>
                <strong>Session Data:</strong>
              </div>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          </div>

          {/* Network Test */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Network Connectivity</h2>
            <div className="space-y-2">
              <div>
                <strong>Backend Status:</strong> {networkTest}
              </div>
            </div>
          </div>

          {/* Error Reproduction */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Error Testing</h2>
            <div className="space-y-4">
              <button
                onClick={() => {
                  throw new Error("Test client-side error");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Trigger Client Error
              </button>

              <button
                onClick={async () => {
                  try {
                    const response = await fetch("/api/test-error");
                    console.log("API response:", response);
                  } catch (error) {
                    console.error("API error:", error);
                  }
                }}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 ml-4"
              >
                Test API Error
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
