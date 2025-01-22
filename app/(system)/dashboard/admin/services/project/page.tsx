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
import { PlusCircle, X, Edit, Eye, Calendar, AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Axios from "@/config/axios";
import { delay } from "@/utils/common";
import { toast } from "@/hooks/use-toast";

interface Project {
  id: string;
  title: string;
  description: string;
  images: {
    id: string;
    path: string;
  }[];
  date: string;
}

export default function InteractiveProjectRow() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { data: session, status } = useSession();

  const [isAdding, setIsAdding] = useState(false);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newProject, setNewProject] = useState<Project>({
    id: "",
    title: "",
    description: "",
    images: [{ id: "", path: "" }],
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
          setNewProject((prev) => ({
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

  //addProject function
  const addProject = async () => {
    console.log("hehehehe");
    if (newProject.title && newProject.description && newProject.date) {
      // Prepare the new project data
      const projectData = {
        title: newProject.title,
        description: newProject.description,
        date: newProject.date,
        images: newProject.images.map((image) => image.path),
      };

      try {
        setIsAdding(true);
        // Send POST request to server
        const response = await Axios.post("contents/projects", projectData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const savedProject = await response.data; // Assuming the server returns the saved project
        setProjects([...projects, savedProject]);
        setNewProject({
          id: "",
          title: "",
          description: "",
          images: [{ id: "", path: "" }],
          date: "",
        });
        setIsAdding(false);
      } catch (error) {
        console.error("Error while adding project:", error);
        setIsAdding(false);
      }
    }
  };

  const removeProject = async (id: string) => {
    try {
      // Send DELETE request to server
      await Axios.delete(`contents/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error while removing project:", error);
    }
  };

  const startEditing = () => {
    if (viewingProject) {
      setNewProject({
        id: viewingProject.id,
        title: viewingProject.title,
        description: viewingProject.description,
        images: viewingProject.images,
        date: viewingProject.date,
      });
      setIsEditing(true);
    }
  };

  //saveEdit

  const saveEdit = async () => {
    if (
      viewingProject &&
      newProject.title &&
      newProject.description &&
      newProject.date
    ) {
      const updatedProject = {
        ...viewingProject,
        ...newProject,
        images: newProject.images || viewingProject.images,
      };

      console.log(updatedProject);

      try {
        // Send PUT request to server
        const response = await Axios.put(
          `/contents/${viewingProject.id}`,
          updatedProject,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );

        const savedProject = await response.data;
        setProjects(
          projects.map((project) =>
            project.id === savedProject.id ? savedProject : project
          )
        );
        setViewingProject(savedProject);
        setIsEditing(false);
      } catch (error) {
        console.error("Error while updating project:", error);
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
    const fetchProjects = async () => {
      try {
        const response = await Axios.get("/contents/projects", {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });

        const fetcheddata = response.data;
        console.log(fetcheddata);
        setProjects(fetcheddata);
      } catch (error) {
        console.error("Error while fetching Logs:", error);
      }
    };

    fetchProjects();
  }, [session]);

  return (
    <div className="max-w-7xl mx-auto  p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col h-[400px]">
            <div className="h-[200px] relative">
              <img
                src={
                  project.images && project.images[0]
                    ? project.images[0].path
                    : ""
                }
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removeProject(project.id)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove project</span>
              </Button>
            </div>
            <CardContent className="p-4 flex-grow overflow-hidden">
              <h3 className="font-bold text-lg mb-2">
                {truncateText(project.title, 30)}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {truncateText(project.description, 100)}
              </p>
              <div className="space-y-2">
                <p className="text-gray-500 text-sm flex items-center">
                  <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                  {project.date || (
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
                onClick={() => setViewingProject(project)}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Project
              </Button>
            </CardFooter>
          </Card>
        ))}
        <Card
          className="flex flex-col justify-center items-center p-6 border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors h-[400px]"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-500 text-center">Add a new project</p>
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
            <DialogTitle>Add New Project</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addProject();
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="newProjectName">Project Name</Label>
              <Input
                id="newProjectName"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                placeholder="Enter project name"
                required
              />
            </div>
            <div>
              <Label htmlFor="newProjectDescription">Description</Label>
              <Textarea
                id="newProjectDescription"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                placeholder="Enter project description"
                required
              />
            </div>
            <div>
              <Label htmlFor="newProjectDate"> Date</Label>
              <Input
                id="newProjectDate"
                type="date"
                value={newProject.date}
                onChange={(e) =>
                  setNewProject({ ...newProject, date: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="newProjectImage">Image</Label>
              <div className="flex m-1 space-x-2 overflow-auto">
                {newProject.images.map((image, index) => (
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
                          setNewProject((prev) => ({
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
              <Button type="submit">Add Project</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={viewingProject !== null}
        onOpenChange={(open) => {
          if (!open) {
            setViewingProject(null);
            setIsEditing(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Project" : viewingProject?.title}
            </DialogTitle>
          </DialogHeader>
          {viewingProject && !isEditing && (
            <div className="space-y-4">
              <img
                src={
                  viewingProject.images && viewingProject.images[0]
                    ? viewingProject.images[0].path
                    : ""
                }
                alt={viewingProject.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <p className="text-sm text-gray-600">
                {viewingProject.description}
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {viewingProject.date || (
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
                <Label htmlFor="editProjectName">Project Name</Label>
                <Input
                  id="editProjectName"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="editProjectDescription">Description</Label>
                <Textarea
                  id="editProjectDescription"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter project description"
                  required
                />
              </div>
              <div>
                <Label htmlFor="editProjectDate">Project Date</Label>
                <Input
                  id="editProjectDate"
                  type="date"
                  value={newProject.date}
                  onChange={(e) =>
                    setNewProject({ ...newProject, date: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="editProjectImage">Project Image</Label>
                {/* <Input
                  id="editProjectImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewProject({
                          ...newProject,
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
                Edit Project
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
