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
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-[500px] md:h-[400px]">
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="w-full md:w-1/2 h-48 md:h-full relative">
                        <Image
                          src={
                            (project.images && project.images[0]?.path) ||
                            "/placeholder.jpg"
                          }
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                        <div className="flex-grow">
                          <CardHeader className="p-0 pb-4">
                            <CardTitle className="text-2xl md:text-3xl lg:text-4xl from-blue-900 to-blue-600 bg-clip-text text-transparent bg-gradient-to-t font-bold leading-tight">
                              {project.title}
                              {project.images[0].path}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-0">
                            <CardDescription className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-6">
                              {project.description}
                            </CardDescription>
                          </CardContent>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="italic text-sm text-gray-500 font-medium">
                            {project.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>

          <div className="flex justify-center mt-8">
            <Link
              href={"/services/projects"}
              className="flex items-center group bg-white hover:bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 hover:border-red-300 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <span className="mr-3 text-lg text-red-800 hover:text-red-700 font-semibold">
                View all projects
              </span>
              <PiArrowRightBold
                color="maroon"
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
