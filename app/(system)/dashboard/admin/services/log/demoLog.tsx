"use client";

import { useState } from "react";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  PlusCircle,
  X,
  Edit,
  Eye,
  Calendar,
  AlertCircle,
  Loader,
} from "lucide-react";
import Axios from "@/config/axios";
import { useSession } from "next-auth/react";

interface Log {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  image: {
    id: string;
    path: string;
  }[];
  date: string;
}

export default function InteractiveLogRow() {
  const [logs, setLogs] = useState<Log[]>([]);
  const { data: session, status } = useSession();

  const [isAdding, setIsAdding] = useState(false);
  const [viewingLog, setViewingLog] = useState<Log | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newLog, setNewLog] = useState({
    title: "",
    description: "",
    images: "",
    date: "",
  });

  //addLog function
  const addLog = async () => {
    if (newLog.title && newLog.description && newLog.date) {
      // Prepare the new log data
      const logData = {
        title: newLog.title,
        description: newLog.description,
        date: newLog.date,
      };

      try {
        // Send POST request to server
        const response = await fetch("http://localhost:3001/logs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logData),
        });

        if (response.ok) {
          const savedLog = await response.json(); // Assuming the server returns the saved log
          setLogs([...logs, savedLog]);
          setNewLog({ title: "", description: "", images: "", date: "" });
          setIsAdding(false);
        } else {
          // Handle errors if needed
          const res = await response.json();
          console.error("Failed to add log:", res);
        }
      } catch (error) {
        console.error("Error while adding log:", error);
      }
    }
  };

  const removeLog = (id: string) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  // const startEditing = () => {
  //   if (viewingLog) {
  //     setNewLog({
  //       title: viewingLog.name,
  //       description: viewingLog.description,
  //       images: viewingLog.imageUrl,
  //       date: viewingLog.date,
  //     });
  //     setIsEditing(true);
  //   }
  // };

  //saveEdit

  const saveEdit = async () => {
    if (viewingLog && newLog.title && newLog.description && newLog.date) {
      const updatedLog = {
        ...viewingLog,
        ...newLog,
        imageUrl: newLog?.images || viewingLog?.image[0]?.path,
      };

      try {
        // Send PUT request to server
        const response = await fetch(
          `http://localhost:3001/logs/${viewingLog.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedLog),
          }
        );

        if (response.ok) {
          const savedLog = await response.json();
          setLogs(logs.map((log) => (log.id === savedLog.id ? savedLog : log)));
          setViewingLog(savedLog);
          setIsEditing(false);
        } else {
          console.error("Failed to update log:", response.statusText);
        }
      } catch (error) {
        console.error("Error while updating log:", error);
      }
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return;
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  useEffect(() => {
    if (!session) return;
    const fetchLogs = async () => {
      try {
        const response = await Axios.get("/contents/logs", {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });

        const fetchedLogs = response.data;
        setLogs(fetchedLogs);
      } catch (error) {
        console.error("Error while fetching Logs:", error);
      }
    };

    fetchLogs();
  }, [session]);

  if (status === "loading") {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">
          Admin Analysis Dashboard
        </h1>
        {/* centered loading spinner */}
        <div className="flex justify-center items-center h-20 animate-spin">
          <Loader />
        </div>
      </div>
    );
  } else if (
    session?.user?.role !== "ADMIN" &&
    session?.user?.role !== "S_ADMIN"
  ) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">
          Admin Analysis Dashboard
        </h1>
        <div className="grid gap-4">
          <p>Sorry :( You are not Authorized to view this page.</p>
        </div>
      </div>
    );
  } else
    return (
      <div className="max-w-7xl mx-auto  p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">Logs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logs.map((log) => (
            <Card key={log.id} className="overflow-hidden">
              <img
                alt={`Image of ${log.title}`}
                className="w-full h-48 object-cover"
                height="100"
                src={log.image && log.image[0] ? log.image[0].path : ""}
                style={{
                  aspectRatio: "200/100",
                  objectFit: "cover",
                }}
                width="200"
              />
              <CardHeader>
                <CardTitle>{log.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-gray-600">
                  <span>Description : {log.description}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 mt-2">
                  <span>Title : {log.date}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  // onClick={() => {
                  //   setEditingCourse(course);
                  //   setIsModalOpen(true);
                  // }}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-700"
                  // onClick={() => handleDeleteCourse(course.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
          <Card
            className="flex flex-col justify-center items-center p-6 border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors h-[400px]"
            onClick={() => setIsAdding(true)}
          >
            <PlusCircle className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center">Add a new log</p>
          </Card>
        </div>

        <Dialog
          open={isAdding}
          onOpenChange={(open) => {
            if (!open) setIsAdding(false);
          }}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Log</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addLog();
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="newLogName">Log Name</Label>
                <Input
                  id="newLogName"
                  value={newLog.title}
                  onChange={(e) =>
                    setNewLog({ ...newLog, title: e.target.value })
                  }
                  placeholder="Enter log name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="newLogDescription">Description</Label>
                <Textarea
                  id="newLogDescription"
                  value={newLog.description}
                  onChange={(e) =>
                    setNewLog({ ...newLog, description: e.target.value })
                  }
                  placeholder="Enter log description"
                  required
                />
              </div>
              <div>
                <Label htmlFor="newLogDate"> Date</Label>
                <Input
                  id="newLogDate"
                  type="date"
                  value={newLog.date}
                  onChange={(e) =>
                    setNewLog({ ...newLog, date: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="newLogImage">Image</Label>
                <Input
                  id="newLogImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewLog({
                          ...newLog,
                          images: reader.result as string,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Add Log</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog
          open={viewingLog !== null}
          onOpenChange={(open) => {
            if (!open) {
              setViewingLog(null);
              setIsEditing(false);
            }
          }}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Log" : viewingLog?.title}
              </DialogTitle>
            </DialogHeader>
            {viewingLog && !isEditing && (
              <div className="space-y-4">
                <img
                  src={
                    viewingLog?.image && viewingLog.image[0]
                      ? viewingLog.image[0].path
                      : ""
                  }
                  alt={viewingLog.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <p className="text-sm text-gray-600">
                  {viewingLog.description}
                </p>
                <p className="text-sm text-gray-500 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {viewingLog.date || (
                    <span className="text-red-500">Date not set</span>
                  )}
                </p>
              </div>
            )}
            {isEditing && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveEdit();
                }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="editLogName">Log Name</Label>
                  <Input
                    id="editLogName"
                    value={newLog.title}
                    onChange={(e) =>
                      setNewLog({ ...newLog, title: e.target.value })
                    }
                    placeholder="Enter log name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editLogDescription">Description</Label>
                  <Textarea
                    id="editLogDescription"
                    value={newLog.description}
                    onChange={(e) =>
                      setNewLog({
                        ...newLog,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter log description"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editLogDate">Log Date</Label>
                  <Input
                    id="editLogDate"
                    type="date"
                    value={newLog.date}
                    onChange={(e) =>
                      setNewLog({ ...newLog, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editLogImage">Log Image</Label>
                  <Input
                    id="editLogImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setNewLog({
                            ...newLog,
                            images: reader.result as string,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </form>
            )}
            <DialogFooter>
              {/* {!isEditing && (
              // <Button onClick={startEditing}>
              //   <Edit className="w-4 h-4 mr-2" />
              //   Edit Log
              // </Button>
            )} */}
              {isEditing && (
                <div className="flex space-x-2">
                  <Button onClick={saveEdit}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
}
