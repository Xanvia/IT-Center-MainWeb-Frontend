"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import Axios from "@/config/axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { PiArrowRightBold } from "react-icons/pi";

type Project = {
  id: string;
  title: string;
  description: string;
  date: string;
  images: {
    id: string;
    path: string;
  }[];
};

export default function ProjectSlider() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await Axios.get("contents/projects");
        const data = await response.data;
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No projects available.</p>
      ) : (
        <>
          <Carousel className="w-full">
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem key={project.id} className="basis-full">
                  <Card className="overflow-hidden shadow-md h-full">
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="w-full md:w-1/2 h-64 md:h-auto">
                        <Image
                          src={project.images && project.images[0]?.path}
                          alt={project.title}
                          width={500}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-full md:w-1/2 p-6 flex flex-col flex-grow">
                        <CardHeader className="p-0 pb-4">
                          <CardTitle className="md:text-5xl text-3xl from-blue-900 py-5 to-blue-600 bg-clip-text text-transparent bg-gradient-to-t">
                            {project.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 flex-grow">
                          <CardDescription className="text-sm md:text-base">
                            {project.description}
                          </CardDescription>
                          <div className="mt-4 italic text-sm text-gray-400 font-medium">
                            {project.date}
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>

          <div className="flex justify-center mt-10">
            <Link
              href={"/services/projects"}
              className="flex items-center group"
            >
              <span className="mr-2 text-xl text-red-800 hover:text-red-700 font-medium">
                View all projects
              </span>
              <PiArrowRightBold
                color="maroon"
                size={20}
                className="group-hover:translate-x-1 duration-300"
              />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
