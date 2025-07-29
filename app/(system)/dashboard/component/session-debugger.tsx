"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SessionDebugger({
  serverSession,
}: {
  serverSession?: any;
}) {
  const { data: clientSession, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="p-4 bg-gray-100 rounded">
        Loading session debug info...
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 rounded mb-4">
      <h3 className="font-bold mb-2">Session Debug Info:</h3>
      <div className="space-y-2 text-sm">
        <div>
          Client Session Status: <span className="font-mono">{status}</span>
        </div>
        <div>
          Has Client Session:{" "}
          <span className="font-mono">{clientSession ? "Yes" : "No"}</span>
        </div>
        <div>
          Has Server Session:{" "}
          <span className="font-mono">{serverSession ? "Yes" : "No"}</span>
        </div>
        <div>
          Client User:{" "}
          <span className="font-mono">
            {clientSession?.user?.email || "None"}
          </span>
        </div>
        <div>
          Server User:{" "}
          <span className="font-mono">
            {serverSession?.user?.email || "None"}
          </span>
        </div>
        <div>
          Effective Session:{" "}
          <span className="font-mono">
            {(clientSession || serverSession)?.user?.email || "None"}
          </span>
        </div>
      </div>
    </div>
  );
}
