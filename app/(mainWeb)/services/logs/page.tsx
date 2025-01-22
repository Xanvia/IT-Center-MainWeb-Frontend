"use client";

import { useEffect, useState } from "react";

interface Log {
  id: number;
  title: string;
  description: string;
  image: {
    path: string;
    id: string;
  }[];
  date: string;
}

export default function LogsShowcase() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);

  useEffect(() => {
    const fetchedLogs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/contents/logs`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data: Log[] = await response.json();
        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };
    fetchedLogs();
  }, []);

  return (
    <div className="flex h-screen p-4 space-x-4">
      {/* Logs List on the Left */}
      <div className="w-1/3 bg-gray-100 rounded-lg p-4 shadow-lg overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Logs</h2>
        <ul className="space-y-2">
          {logs.map((log) => (
            <li
              key={log.id}
              onClick={() => setSelectedLog(log)}
              className="p-2 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-200"
            >
              {log.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Log Details on the Right */}
      <div className="w-2/3 bg-gray-50 rounded-lg p-4 shadow-lg">
        {selectedLog ? (
          <div>
            <h2 className="text-xl font-bold mb-4">{selectedLog.title}</h2>
            <img
              src={selectedLog.image[0]?.path}
              alt={selectedLog.id.toString()}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p>{selectedLog.description}</p>
          </div>
        ) : (
          <p className="text-gray-500">Select a log to see details.</p>
        )}
      </div>
    </div>
  );
}
