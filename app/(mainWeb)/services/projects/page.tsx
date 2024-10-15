"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";

import info from "./information/info";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Cloud Migration",
    description:
      "Successfully migrated our infrastructure to a cloud-based solution, improving scalability and reducing costs by 30%. This project ensured minimal downtime and maximum efficiency.",
    imageUrl: "/placeholder.svg?height=180&width=320",
  },
  {
    id: 2,
    title: "AI-Powered Customer Service",
    description:
      "Implemented an AI chatbot handling 60% of customer inquiries, reducing response times and improving satisfaction. It uses NLP and ML to understand and respond to queries in real-time.Implemented an AI chatbot handling 60% of customer inquiries, reducing response times and improving satisfaction. It uses NLP and ML to understand and respond to queries in real-time.Implemented an AI chatbot handling 60% of customer inquiries, reducing response times and improving satisfaction. It uses NLP and ML to understand and respond to queries in real-time.Implemented an AI chatbot handling 60% of customer inquiries, reducing response times and improving satisfaction. It uses NLP and ML to understand and respond to queries in real-time.",
    imageUrl: "/placeholder.svg?height=180&width=320",
  },
  {
    id: 3,
    title: "Cybersecurity Enhancement",
    description:
      "Upgraded security protocols and implemented advanced threat detection systems, reducing incidents by 80%. This included multi-factor authentication and AI-powered threat detection.",
    imageUrl: "/placeholder.svg?height=180&width=320",
  },
];

export default function ProjectShowcase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const handleSearch = () => {
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        {/* <h1 className=" text-2xl font-bold">IT Center Projects</h1> */}
        <h1 className="text-2xl font-bold text-center w-full">
          IT Center Projects
        </h1>
        <div className="flex items-center">
          <div className="relative m-5">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search projects..."
              className="pl-8 pr-4 py-1 w-48 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button size="sm" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        {filteredProjects.map((project, index) => (
          <Card key={project.id} className="mx-52 overflow-hidden shadow-md">
            <div
              className={` flex flex-col ${
                index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
            >
              <div className="w-full sm:w-1/5 h-48 sm:h-auto">
                <Image
                  src="/common/courseReg.jpg"
                  alt={project.title}
                  width={320}
                  height={180}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full  sm:w-full p-4">
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <CardDescription className="text-sm line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {filteredProjects.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No projects found matching your search.
        </p>
      )}
    </div>
  );
}
