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
  Clock,
  MapPin,
} from "lucide-react";

interface News {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  date: string;
  time: string;
  venue: string;
}

export default function News() {
  const [newss, setNewss] = useState<News[]>([
    {
      id: 1,
      name: "News Alpha",
      description:
        "A cutting-edge web application for task management. This news aims to revolutionize how teams collaborate and manage their workflows. With intuitive interfaces and powerful features, News Alpha streamlines task allocation, progress tracking, and team communication.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      date: "2023-06-15",
      time: "14:00",
      venue: "Tech Hub, Silicon Valley",
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [viewingNews, setViewingNews] = useState<News | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newNews, setNewNews] = useState({
    name: "",
    description: "",
    imageUrl: "",
    date: "",
    time: "",
    venue: "",
  });

  const addNews = () => {
    if (
      newNews.name &&
      newNews.description &&
      newNews.date &&
      newNews.time &&
      newNews.venue
    ) {
      setNewss([
        ...newss,
        {
          id: Date.now(),
          name: newNews.name,
          description: newNews.description,
          imageUrl: newNews.imageUrl || "/placeholder.svg?height=200&width=300",
          date: newNews.date,
          time: newNews.time,
          venue: newNews.venue,
        },
      ]);
      setNewNews({
        name: "",
        description: "",
        imageUrl: "",
        date: "",
        time: "",
        venue: "",
      });
      setIsAdding(false);
    }
  };

  const removeNews = (id: number) => {
    setNewss(newss.filter((news) => news.id !== id));
  };

  const startEditing = () => {
    if (viewingNews) {
      setNewNews({
        name: viewingNews.name,
        description: viewingNews.description,
        imageUrl: viewingNews.imageUrl,
        date: viewingNews.date,
        time: viewingNews.time,
        venue: viewingNews.venue,
      });
      setIsEditing(true);
    }
  };

  const saveEdit = () => {
    if (
      viewingNews &&
      newNews.name &&
      newNews.description &&
      newNews.date &&
      newNews.time &&
      newNews.venue
    ) {
      setNewss(
        newss.map((news) =>
          news.id === viewingNews.id
            ? {
                ...news,
                ...newNews,
                imageUrl: newNews.imageUrl || news.imageUrl,
              }
            : news
        )
      );
      setViewingNews({ ...viewingNews, ...newNews });
      setIsEditing(false);
    }
  };

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description;
    return description.substr(0, maxLength) + "...";
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">News Row</h2>
      <div className="grid grid-cols-3 gap-6">
        {newss.map((news) => (
          <Card key={news.id} className="overflow-hidden flex flex-col">
            <div className="aspect-video relative">
              <img
                src={news.imageUrl}
                alt={news.name}
                className="w-full h-full object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removeNews(news.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-4 flex-grow">
              <h3 className="font-bold text-lg mb-2">{news.name}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {truncateDescription(news.description, 100)}
              </p>
              <p className="text-gray-500 text-sm flex items-center mb-1">
                <Calendar className="w-4 h-4 mr-2" />
                {news.date}
              </p>
              <p className="text-gray-500 text-sm flex items-center mb-1">
                <Clock className="w-4 h-4 mr-2" />
                {news.time}
              </p>
              <p className="text-gray-500 text-sm flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {news.venue}
              </p>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setViewingNews(news)}
              >
                <Eye className="w-4 h-4 mr-2" />
                View News
              </Button>
            </CardFooter>
          </Card>
        ))}
        {newss.length < 3 && !isAdding && (
          <Card
            className="flex flex-col justify-center items-center p-6 border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setIsAdding(true)}
          >
            <PlusCircle className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center">Add a new news</p>
          </Card>
        )}
        {isAdding && (
          <Card className="overflow-hidden flex flex-col">
            <CardContent className="p-4 flex-grow">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addNews();
                }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="newNewsName">News Name</Label>
                  <Input
                    id="newNewsName"
                    value={newNews.name}
                    onChange={(e) =>
                      setNewNews({ ...newNews, name: e.target.value })
                    }
                    placeholder="Enter news name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newNewsDescription">Description</Label>
                  <Textarea
                    id="newNewsDescription"
                    value={newNews.description}
                    onChange={(e) =>
                      setNewNews({ ...newNews, description: e.target.value })
                    }
                    placeholder="Enter news description"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newNewsDate">News Date</Label>
                  <Input
                    id="newNewsDate"
                    type="date"
                    value={newNews.date}
                    onChange={(e) =>
                      setNewNews({ ...newNews, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newNewsTime">News Time</Label>
                  <Input
                    id="newNewsTime"
                    type="time"
                    value={newNews.time}
                    onChange={(e) =>
                      setNewNews({ ...newNews, time: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newNewsVenue">News Venue</Label>
                  <Input
                    id="newNewsVenue"
                    value={newNews.venue}
                    onChange={(e) =>
                      setNewNews({ ...newNews, venue: e.target.value })
                    }
                    placeholder="Enter news venue"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newNewsImage">News Image</Label>
                  <Input
                    id="newNewsImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setNewNews({
                            ...newNews,
                            imageUrl: reader.result as string,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1">
                    Add News
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
        open={viewingNews !== null}
        onOpenChange={(open) => {
          if (!open) {
            setViewingNews(null);
            setIsEditing(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit News" : viewingNews?.name}
            </DialogTitle>
          </DialogHeader>
          {viewingNews && !isEditing && (
            <div className="space-y-4">
              <img
                src={viewingNews.imageUrl}
                alt={viewingNews.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <p className="text-sm text-gray-600">{viewingNews.description}</p>
              <p className="text-sm text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {viewingNews.date}
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {viewingNews.time}
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {viewingNews.venue}
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
                <Label htmlFor="editNewsName">News Name</Label>
                <Input
                  id="editNewsName"
                  value={newNews.name}
                  onChange={(e) =>
                    setNewNews({ ...newNews, name: e.target.value })
                  }
                  placeholder="Enter news name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="editNewsDescription">Description</Label>
                <Textarea
                  id="editNewsDescription"
                  value={newNews.description}
                  onChange={(e) =>
                    setNewNews({ ...newNews, description: e.target.value })
                  }
                  placeholder="Enter news description"
                  required
                />
              </div>
              <div>
                <Label htmlFor="editNewsDate">News Date</Label>
                <Input
                  id="editNewsDate"
                  type="date"
                  value={newNews.date}
                  onChange={(e) =>
                    setNewNews({ ...newNews, date: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="editNewsTime">News Time</Label>
                <Input
                  id="editNewsTime"
                  type="time"
                  value={newNews.time}
                  onChange={(e) =>
                    setNewNews({ ...newNews, time: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="editNewsVenue">News Venue</Label>
                <Input
                  id="editNewsVenue"
                  value={newNews.venue}
                  onChange={(e) =>
                    setNewNews({ ...newNews, venue: e.target.value })
                  }
                  placeholder="Enter news venue"
                  required
                />
              </div>
              <div>
                <Label htmlFor="editNewsImage">News Image</Label>
                <Input
                  id="editNewsImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewNews({
                          ...newNews,
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
                Edit News
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
