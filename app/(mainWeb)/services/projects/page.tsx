"use client";

import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

// Define the Project interface
interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  images: {
    path: string;
    id: string;
  }[];
}

export default function ProjectShowcase() {
  const [projects, setProjects] = useState<Project[]>([]); // State to store projects fetched from the API

  // Fetch projects from API when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/contents/projects`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="from-red-700 to-gray-800 bg-clip-text text-transparent bg-gradient-to-t font-bold md:text-3xl text-xl text-center mb-6">
          Projects
        </h1>
        <Card className="p-6 shadow-lg">
          <div className="space-y-6 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <Card key={project.id} className="overflow-hidden shadow-md">
                <div
                  className={`flex flex-col ${
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div className="w-full sm:w-2/5 h-48 sm:h-auto">
                    <Image
                      src={
                        project.images[0]?.path.startsWith("/")
                          ? project.images[0]?.path
                          : `/${project.images[0]?.path}`
                      }
                      alt={project.title}
                      width={320}
                      height={180}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full sm:w-3/5 p-4">
                    <CardHeader className="p-0 pb-2">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CardDescription className="text-sm text-justify">
                        {project.description}
                      </CardDescription>
                      <p className="text-sm text-gray-500 mt-2">
                        {project.date}
                      </p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          {projects.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No projects available.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
