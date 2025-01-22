"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { useSession } from "next-auth/react";
import Axios from "@/config/axios";
import { delay } from "@/utils/common";
import { toast } from "@/hooks/use-toast";

interface Log {
  id: string;
  title: string;
  description: string;
  images: {
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
  const [newLog, setNewLog] = useState<Log>({
    id: "",
    title: "",
    description: "",
    images: [],
    date: "",
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("content", files[i]);
      }
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/contents/upload`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );
        if (result.ok) {
          const data = await result.json();
          console.log(data);
          await delay(3000);
          setNewLog((prev) => ({
            ...prev,
            images: [
              ...(prev.images || []),
              ...data.paths.map((path: string) => ({
                id: crypto.randomUUID(),
                path: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`,
              })),
            ],
          }));
          toast({ description: "Images uploaded successfully" });
        }
      } catch (error) {
        console.error(error);
        toast({ description: "Failed to upload images" });
      }
    }
  };

  //addLog function
  const addLog = async () => {
    if (newLog.title && newLog.description && newLog.date) {
      // Prepare the new log data
      const logData = {
        title: newLog.title,
        description: newLog.description,
        date: newLog.date,
        images: newLog.images.map((image) => image.path),
      };

      try {
        setIsAdding(true);
        // Send POST request to server
        const response = await Axios.post("contents/logs", logData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const savedLog = await response.data; // Assuming the server returns the saved log
        setLogs([...logs, savedLog]);
        setNewLog({
          id: "",
          title: "",
          description: "",
          images: [],
          date: "",
        });
        setIsAdding(false);
      } catch (error) {
        console.error("Error while adding log:", error);
        setIsAdding(false);
      }
    }
  };

  const removeLog = async (id: string) => {
    try {
      // Send DELETE request to server
      await Axios.delete(`contents/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLogs(logs.filter((log) => log.id !== id));
    } catch (error) {
      console.error("Error while removing log:", error);
    }
  };

  const startEditing = () => {
    if (viewingLog) {
      setNewLog({
        id: viewingLog.id,
        title: viewingLog.title,
        description: viewingLog.description,
        images: viewingLog.images,
        date: viewingLog.date,
      });
      setIsEditing(true);
    }
  };

  //saveEdit
  const saveEdit = async () => {
    if (viewingLog && newLog.title && newLog.description && newLog.date) {
      const updatedLog = {
        title: newLog.title,
        description: newLog.description,
        date: newLog.date,
        images: newLog.images.map((image) => image.path),
      };

      try {
        const response = await Axios.put(
          `/contents/${viewingLog.id}`,
          updatedLog,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );

        const savedLog = await response.data;
        setLogs(logs.map((log) => (log.id === savedLog.id ? savedLog : log)));
        setViewingLog(savedLog);
        setIsEditing(false);
        setNewLog({
          id: "",
          title: "",
          description: "",
          images: [],
          date: "",
        });
        toast({ description: "Log updated successfully" });
      } catch (error) {
        console.error("Error while updating log:", error);
        toast({
          description: "Failed to update log",
          variant: "destructive",
        });
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

        const fetcheddata = response.data;
        console.log(fetcheddata);
        setLogs(fetcheddata);
      } catch (error) {
        console.error("Error while fetching Logs:", error);
      }
    };

    fetchLogs();
  }, [session]);

  if (status === "loading") {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">Logs</h1>
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
        <h1 className="text-2xl font-bold mb-6 text-gray-600">Logs</h1>
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
            <Card key={log.id} className="flex flex-col h-[400px]">
              <div className="h-[200px] relative">
                <img
                  src={log.images && log.images[0] ? log.images[0].path : ""}
                  alt={log.title}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => removeLog(log.id)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove log</span>
                </Button>
              </div>
              <CardContent className="p-4 flex-grow overflow-hidden">
                <h3 className="font-bold text-lg mb-2">
                  {truncateText(log.title, 30)}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {truncateText(log.description, 100)}
                </p>
                <div className="space-y-2">
                  <p className="text-gray-500 text-sm flex items-center">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    {log.date || (
                      <span className="text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" /> Date not set
                      </span>
                    )}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 p-4 mt-auto">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setViewingLog(log)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Log
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
                <div className="flex m-1 space-x-2 overflow-auto">
                  {newLog.images.map((image, index) => (
                    <div key={index} className="relative ">
                      <img
                        src={image.path}
                        alt={`image:${index}`}
                        className="h-20"
                      />
                      <div className="absolute top-0 right-1">
                        <p
                          className=" text-red-500 cursor-pointer text-sm font-bold"
                          onClick={() =>
                            setNewLog((prev) => ({
                              ...prev,
                              images: prev.images.filter(
                                (img) => img.id !== image.id
                              ),
                            }))
                          }
                        >
                          x
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleImageChange}
                  multiple
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
                    viewingLog.images && viewingLog.images[0]
                      ? viewingLog.images[0].path
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
                  <div className="flex m-1 space-x-2 overflow-auto">
                    {newLog.images.map((image, index) => (
                      <div key={index} className="relative ">
                        <img
                          src={image.path}
                          alt={`image:${index}`}
                          className="h-20"
                        />
                        <div className="absolute top-0 right-1">
                          <p
                            className=" text-red-500 cursor-pointer text-sm font-bold"
                            onClick={() =>
                              setNewLog((prev) => ({
                                ...prev,
                                images: prev.images.filter(
                                  (img) => img.id !== image.id
                                ),
                              }))
                            }
                          >
                            x
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleImageChange}
                    multiple
                  />
                </div>
              </form>
            )}
            <DialogFooter>
              {!isEditing && (
                <Button onClick={startEditing}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Log
                </Button>
              )}
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
