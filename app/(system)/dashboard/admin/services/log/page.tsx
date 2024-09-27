"use client";

import { useState } from "react";
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
  AlertCircle,
} from "lucide-react";
import { PhotoSlide } from "../../../component/admin/photoSlide";

interface Log {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  date: string;
}

export default function InteractiveLogRow() {
  const [logs, setLogs] = useState<Log[]>([
    {
      id: "vvb",
      name: "Log Alpha",
      description:
        "A cutting-edge web application for task management. This log aims to revolutionize how teams collaborate and manage their workflows.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      date: "2023-06-15",
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [viewingLog, setViewingLog] = useState<Log | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newLog, setNewLog] = useState({
    name: "",
    description: "",
    imageUrl: "",
    date: "",
  });

  //addLog function
  const addLog = async () => {
    if (newLog.name && newLog.description && newLog.date) {
      try {
        const response = await fetch("/api/logs", {
          // Adjust the endpoint accordingly
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newLog.name,
            description: newLog.description,
            imageUrl:
              newLog.imageUrl || "/placeholder.svg?height=200&width=300",
            date: newLog.date,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add log");
        }

        const data = await response.json(); // Assuming the server responds with the created log
        setLogs([...logs, { ...data, id: Date.now() }]); // Use the id from the server if provided
        setNewLog({ name: "", description: "", imageUrl: "", date: "" });
        setIsAdding(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const removeLog = (id: number) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  const startEditing = () => {
    if (viewingLog) {
      setNewLog({
        id: "",
        name: viewingLog.name,
        description: viewingLog.description,
        imageUrl: viewingLog.imageUrl,
        date: viewingLog.date,
      });
      setIsEditing(true);
    }
  };

  //saveEdit function
  const saveEdit = async () => {
    if (viewingLog && newLog.name && newLog.description && newLog.date) {
      try {
        const response = await fetch(`/api/logs/${viewingLog.id}`, {
          // Adjust the endpoint accordingly
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newLog.name,
            description: newLog.description,
            imageUrl: newLog.imageUrl || viewingLog.imageUrl,
            date: newLog.date,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update log");
        }

        const data = await response.json(); // Assuming the server responds with the updated log
        setLogs(
          logs.map((log) => (log.id === viewingLog.id ? { ...data } : log))
        );
        setViewingLog({ ...data }); // Update the viewing log with the new data
        setIsEditing(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Logs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {logs.map((log) => (
          <Card key={log.id} className="flex flex-col h-[400px]">
            <div className="h-[200px] relative">
              <img
                src={log.imageUrl}
                alt={log.name}
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
                {truncateText(log.name, 30)}
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
                value={newLog.name}
                onChange={(e) => setNewLog({ ...newLog, name: e.target.value })}
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
              <Label htmlFor="newLogDate">Date</Label>
              <Input
                id="newLogDate"
                type="date"
                value={newLog.date}
                onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="newLogImage">Log Image</Label>
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
                        imageUrl: reader.result as string,
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
              {isEditing ? "Edit Log" : viewingLog?.name}
            </DialogTitle>
          </DialogHeader>
          {viewingLog && !isEditing && (
            <div className="space-y-4">
              <img
                src={viewingLog.imageUrl}
                alt={viewingLog.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <p className="text-sm text-gray-600">{viewingLog.description}</p>
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
                  value={newLog.name}
                  onChange={(e) =>
                    setNewLog({ ...newLog, name: e.target.value })
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
                    setNewLog({ ...newLog, description: e.target.value })
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
                          imageUrl: reader.result as string,
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
