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
import { PlusCircle, X, Edit, Eye, Calendar, AlertCircle, MapPin, Clock } from "lucide-react";
import { useSession } from "next-auth/react";
import Axios from "@/config/axios";

interface News {
  id: string;
  title: string;
  description: string;
  images: {
    id: string;
    path: string;
  }[];
  date: string;
  time:string;
  venue:string;
}

export default function InteractiveNewsRow() {
  const [news, setNews] = useState<News[]>([]);
  const { data: session, status } = useSession();

  const [isAdding, setIsAdding] = useState(false);
  const [viewingNews, setViewingNews] = useState<News | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newNews, setNewNews] = useState<News>({
    id: "",
    title: "",
    description: "",
    images: [{ id: "", path: "" }],
    date: "",
    time:"",
    venue:""
  });

  
  //addNews function
  const addNews = async () => {
    console.log("hehehehe");
    if (newNews.title && newNews.description && newNews.date) {
      // Prepare the new news data
      const newsData = {
        title: newNews.title,
        description: newNews.description,
        date: newNews.date,
      };

      try {
        setIsAdding(true);
        // Send POST request to server
        const response = await Axios.post("contents/news", newsData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const savedNews = await response.data; // Assuming the server returns the saved news
        setNews([...news, savedNews]);
        setNewNews({
          id: "",
          title: "",
          description: "",
          images: [{ id: "", path: "" }],
          date: "",
          time:"",
          venue:""
        });
        setIsAdding(false);
      } catch (error) {
        console.error("Error while adding news:", error);
        setIsAdding(false);
      }
    }
  };

  const removeNews = async (id: string) => {
    try {
      // Send DELETE request to server
      await Axios.delete(`contents/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setNews(news.filter((news) => news.id !== id));
    } catch (error) {
      console.error("Error while removing news:", error);
    }
  };

  const startEditing = () => {
    if (viewingNews) {
      setNewNews({
        id: viewingNews.id,
        title: viewingNews.title,
        description: viewingNews.description,
        images: viewingNews.images,
        date: viewingNews.date,
        time:viewingNews.time,
        venue:viewingNews.venue
      });
      setIsEditing(true);
    }
  };

  //saveEdit

  const saveEdit = async () => {
    if (
      viewingNews &&
      newNews.title &&
      newNews.description &&
      newNews.date
    ) {
      const updatedNews = {
        ...viewingNews,
        ...newNews,
        images: newNews.images || viewingNews.images,
      };

      console.log(updatedNews);

      try {
        // Send PUT request to server
        const response = await Axios.put(
          `/contents/${viewingNews.id}`,
          updatedNews,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );

        const savedNews = await response.data;
        setNews(
          news.map((news) =>
            news.id === savedNews.id ? savedNews : news
          )
        );
        setViewingNews(savedNews);
        setIsEditing(false);
      } catch (error) {
        console.error("Error while updating news:", error);
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
    const fetchNews = async () => {
      try {
        const response = await Axios.get("/contents/news", {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });

        const fetcheddata = response.data;
        console.log(fetcheddata);
        setNews(fetcheddata);
      } catch (error) {
        console.error("Error while fetching Logs:", error);
      }
    };

    fetchNews();
  }, [session]);

  return (
    <div className="max-w-7xl mx-auto  p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((news) => (
          <Card key={news.id} className="flex flex-col h-[400px]">
            <div className="h-[200px] relative">
              <img
                src={
                  news.images && news.images[0]? news.images[0].path: ""
                }
                alt={news.title}
                className="w-full h-full object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removeNews(news.id)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove news</span>
              </Button>
            </div>
            <CardContent className="p-4 flex-grow overflow-hidden">
              <h3 className="font-bold text-lg mb-2">
                {truncateText(news.title, 30)}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {truncateText(news.description, 100)}
              </p>
              <div className="space-y-2">
                <p className="text-gray-500 text-sm flex items-center">
                  <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                  {news.date || (
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
                onClick={() => setViewingNews(news)}
              >
                <Eye className="w-4 h-4 mr-2" />
                View News
              </Button>
            </CardFooter>
          </Card>
        ))}
        <Card
          className="flex flex-col justify-center items-center p-6 border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors h-[400px]"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-500 text-center">Add a new news</p>
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
            <DialogTitle>Add New News</DialogTitle>
          </DialogHeader>
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
                value={newNews.title}
                onChange={(e) =>
                  setNewNews({ ...newNews, title: e.target.value })
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
              <Label htmlFor="newNewsDate"> Date</Label>
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
              <Label htmlFor="newNewsTime">Time</Label>
              <Input
                id="newNewsTime"
                type="time"
                value={newNews.time}
                onChange={(e) => setNewNews({...newNews, time: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="newNewsVenue">Venue</Label>
              <Input
                id="newNewsVenue"
                value={newNews.venue}
                onChange={(e) => setNewNews({...newNews, venue: e.target.value})}
                placeholder="Enter news venue"
                required
              />
            </div>
            <div>
              <Label htmlFor="newNewsImage">Image</Label>
              {/* <Input
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
                        images: reader.result as string,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              /> */}
            </div>
            <DialogFooter>
              <Button type="submit">Add News</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
              {isEditing ? "Edit News" : viewingNews?.title}
            </DialogTitle>
          </DialogHeader>
          {viewingNews && !isEditing && (
            <div className="space-y-4">
              <img
                src={
                  viewingNews.images && viewingNews.images[0]
                    ? viewingNews.images[0].path
                    : ""
                }
                alt={viewingNews.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <p className="text-sm text-gray-600">
                {viewingNews.description}
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {viewingNews.date || (
                  <span className="text-red-500">Date not set</span>
                )}
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {viewingNews.time || <span className="text-red-500">Time not set</span>}
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {viewingNews.venue || <span className="text-red-500">Venue not set</span>}
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
                  value={newNews.title}
                  onChange={(e) =>
                    setNewNews({ ...newNews, title: e.target.value })
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
                    setNewNews({
                      ...newNews,
                      description: e.target.value,
                    })
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
                  onChange={(e) => setNewNews({...newNews, time: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="editNewsVenue">News Venue</Label>
                <Input
                  id="editNewsVenue"
                  value={newNews.venue}
                  onChange={(e) => setNewNews({...newNews, venue: e.target.value})}
                  placeholder="Enter news venue"
                  required
                />
              </div>

              <div>
                <Label htmlFor="editNewsImage">News Image</Label>
                {/* <Input
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
                          images: reader.result as string,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                /> */}
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
