
"use client"
import { useState } from "react";

interface Log {
  id: number;
  name: string;
  description: string;
  image: string;
}

const logs: Log[] = [
  {
    id: 1,
    name: "System Update",
    description: "Details about the recent system update.",
    image: "/logjpg/im1.jpg"

  },
  {
    id: 2,
    name: "Server Maintenance",
    description: "Information about scheduled server maintenance.",
    image: "/logjpg/im1.jpg"

  },
  {
    id: 3,
    name: "Bug Fix",
    description: "Summary of fixed bugs in the latest patch.",
    image:  "/logjpg/im1.jpg"

  },
  {
    id: 4,
    name: "Bug Fix",
    description: "Summary of fixed bugs in the latest patch.",
    image:  "/logjpg/im1.jpg"

  },
  {
    id: 5,
    name: "Bug Fix",
    description: "Summary of fixed bugs in the latest patch.",
    image:  "/logjpg/im1.jpg"

  },
  {
    id: 6,
    name: "Bug Fix",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis feugiat quam sit amet magna condimentum, et egestas felis tempor. Praesent maximus euismod erat, sit amet gravida tortor viverra a. Fusce at molestie orci, sed lacinia velit. Donec vel ullamcorper ex. Maecenas at dapibus mauris. Aliquam commodo, magna quis pellentesque aliquet, dolor dui consectetur mauris, at vestibulum dui justo non est. Pellentesque pellentesque urna id erat tempor facilisis. Proin ut ligula non diam varius aliquet. Donec consequat erat magna, interdum molestie ipsum euismod vel",
    image:  "/logjpg/im1.jpg"

  },
];

const LogPage: React.FC = () => {
  const [selectedLog, setSelectedLog] = useState<Log>(logs[0]);

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
              {log.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Log Details on the Right */}
      <div className="w-2/3 bg-gray-50 rounded-lg p-4 shadow-lg">
        {selectedLog ? (
          <div>
            <h2 className="text-xl font-bold mb-4">{selectedLog.name}</h2>
            <img
              src={selectedLog.image}
              alt={selectedLog.name}
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
};

export default LogPage;

