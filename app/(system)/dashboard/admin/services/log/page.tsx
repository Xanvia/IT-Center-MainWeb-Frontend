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
import { PlusCircle, X, Edit, Eye, Calendar } from "lucide-react";

interface Log {
  name: string;
  description: string;
  imageUrl: string[];
  date: string;
}

export default function InteractiveLogRow() {
  const [logs, setLogs] = useState<Log[]>([
    {
      name: "Log Alpha",
      description:
        "A cutting-edge web application for task management. This log aims to revolutionize how teams collaborate and manage their workflows. With intuitive interfaces and powerful features, Log Alpha streamlines task allocation, progress tracking, and team communication.",
      imageUrl: ["/placeholder.svg?height=200&width=300"],
      date: "2023-06-15",
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [viewingLog, setViewingLog] = useState<Log | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [newLog, setNewLog] = useState({
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
    setNewLog({ name: "", description: "", imageUrl: [""], date: "" });
    if (selectedFiles && selectedFiles.length > 0) {
      newLog.imageUrl = await handleUpload();
    }
    console.log(newLog.imageUrl);

    if (newLog.name && newLog.description && newLog.date) {
      setLogs([
        ...logs,
        {
          name: newLog.name,
          description: newLog.description,
          imageUrl: newLog.imageUrl,
          date: newLog.date,
        },
      ]);
      setIsAdding(false);
    }
  };

  const removeLog = (id: number) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  const startEditing = () => {
    if (viewingLog) {
      setNewLog({
        name: viewingLog.name,
        description: viewingLog.description,
        imageUrl: viewingLog.imageUrl,
        date: viewingLog.date,
      });
      setIsEditing(true);
    }
  };

  const saveEdit = () => {
    if (viewingLog && newLog.name && newLog.description && newLog.date) {
      setLogs(
        logs.map((log) =>
          log.id === viewingLog.id
            ? { ...log, ...newLog, imageUrl: newLog.imageUrl || log.imageUrl }
            : log
        )
      );
      setViewingLog({ ...viewingLog, ...newLog });
      setIsEditing(false);
    }
  };

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description;
    return description.substr(0, maxLength) + "...";
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Log Row</h2>
      <div className="grid grid-cols-3 gap-6">
        {logs.map((log) => (
          <Card key={log.id} className="overflow-hidden flex flex-col">
            <div className="aspect-video relative">
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
              </Button>
            </div>
            <CardContent className="p-4 flex-grow">
              <h3 className="font-bold text-lg mb-2">{log.name}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {truncateDescription(log.description, 100)}
              </p>
              <p className="text-gray-500 text-sm flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {log.date}
              </p>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4">
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
                src={viewingLog.imageUrl}
                alt={viewingLog.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <p className="text-sm text-gray-600">{viewingLog.description}</p>
              <p className="text-sm text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {viewingLog.date}
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
