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
import { PlusCircle, X, Edit, Eye, Calendar, AlertCircle } from "lucide-react";
import { PhotoSlide } from "../../../component/admin/photoSlide";

interface Log {
  id: string;
  name: string;
  description: string;
  imageUrl: string[];
  date: string;
}

export default function InteractiveLogRow() {
  const [logs, setLogs] = useState<Log[]>([
    {
      id: "vvb",
      name: "Log Alpha",
      description:
        "A cutting-edge web application for task management. This log aims to revolutionize how teams collaborate and manage their workflows. With intuitive interfaces and powerful features, Log Alpha streamlines task allocation, progress tracking, and team communication.",
      imageUrl: ["/Slide/first.png", "/Slide/second.png"],
      date: "2023-06-15",
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [viewingLog, setViewingLog] = useState<Log | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [newLog, setNewLog] = useState({
    id: "default",
    name: "",
    description: "",
    imageUrl: [""],
    date: "",
  });

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files)); // Convert FileList to Array
    }
  };

  // Submit the files to the server
  const handleUpload = async () => {
    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("images", file); // Append each file with the same field name
    });

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Response:", data);
        return data;
      } else {
        alert("File upload failed");
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const addLog = async () => {
    setIsAdding(true);

    // upload files
    if (selectedFiles && selectedFiles.length > 0) {
      newLog.imageUrl = await handleUpload();
    }
    console.log(newLog.imageUrl);

    if (newLog.name && newLog.description && newLog.date) {
      // API call to send log data to the backend
      const response = await fetch("http;//localhost:3001/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newLog.name,
          description: newLog.description,
          imageUrl: newLog.imageUrl,
          date: newLog.date,
        }),
      });

      if (response.ok) {
        const savedLog = await response.json();
        // Update the state with the newly created log
        setLogs([...logs, savedLog]);
      } else {
        // Handle error response
        console.error("Failed to add log");
      }
    }
    // erase log
    setNewLog({
      id: "default",
      name: "",
      description: "",
      imageUrl: [""],
      date: "",
    });
    setIsAdding(false);
  };

  const removeLog = async (id: string) => {
    const response = await fetch(`/api/logs/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setLogs(logs.filter((log) => log.id !== id));
    } else {
      console.error("Failed to delete log");
    }
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

  const saveEdit = async () => {
    if (viewingLog && newLog.name && newLog.description && newLog.date) {
      const response = await fetch(`/api/logs/${viewingLog.id}`, {
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

      if (response.ok) {
        const updatedLog = await response.json();
        setLogs(
          logs.map((log) => (log.id === viewingLog.id ? updatedLog : log))
        );
        setViewingLog(updatedLog);
        setIsEditing(false);
      } else {
        console.error("Failed to update log");
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
      <div className="grid grid-cols-3 gap-6">
        {logs.map((log, index) => (
          <Card key={index} className="overflow-hidden flex flex-col">
            <div className="aspect-video relative justify-center">
              <PhotoSlide images={log.imageUrl} />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1"
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
        {!isAdding && (
          <Card
            className="flex flex-col justify-center items-center p-6 border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setIsAdding(true)}
          >
            <PlusCircle className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center">Add a new log</p>
          </Card>
        )}
        {isAdding && (
          <Card className="overflow-hidden flex flex-col">
            <CardContent className="p-4 flex-grow">
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
                    onChange={(e) =>
                      setNewLog({ ...newLog, name: e.target.value })
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
                  <Label htmlFor="newLogDate">Log Date</Label>
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
                  <Label htmlFor="newLogImage">Log Image</Label>
                  <Input
                    id="newLogImage"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1">
                    Add Log
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAdding(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>

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
                src={viewingLog.imageUrl[0]}
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
                  // onChange={(e) => {
                  //   const file = e.target.files?;
                  //   if (file) {
                  //     const reader = new FileReader()
                  //     reader.onloadend = () => {
                  //       setNewLog({...newLog, imageUrl: reader.result as string})
                  //     }
                  //     reader.readAsDataURL(file)
                  //   }
                  // }}
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
