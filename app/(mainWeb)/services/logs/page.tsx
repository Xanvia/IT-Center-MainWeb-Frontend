"use client";
import Axios from "@/config/axios";
import { useEffect, useState } from "react";

type Log = {
  id: string;
  title: string;
  description: string;
  date: string;
  images: {
    id: string;
    path: string;
  }[];
};

const LogPage: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [selectedLog, setSelectedLog] = useState<Log>(logs[0]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await Axios.get("contents/logs");
      const data = await response.data;
      setLogs(data);
    };
    fetchProjects();
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
              src={selectedLog.images && selectedLog.images[0]?.path}
              alt={selectedLog.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p>
              {selectedLog.description}
              <p className="mt-5">{selectedLog.date}</p>
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Select a log to see details.</p>
        )}
      </div>
    </div>
  );
};

export default LogPage;
