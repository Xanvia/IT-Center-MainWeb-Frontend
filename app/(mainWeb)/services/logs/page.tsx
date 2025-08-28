"use client";
import Axios from "@/config/axios";
import { getAbsoluteImageUrl } from "@/utils/common";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
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
            {/* Image Slider */}
            {selectedLog.images && selectedLog.images.length > 0 ? (
              <div className="relative mb-4 mx-8">
                <Carousel className="w-full">
                  <CarouselContent>
                    {selectedLog.images.map((img) => (
                      <CarouselItem key={img.id}>
                        <img
                          src={getAbsoluteImageUrl(img.path)}
                          alt={selectedLog.title}
                          className="w-full h-72 object-cover rounded-lg"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            ) : (
              <img
                src={"/placeholder.jpg"}
                alt={selectedLog.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
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
