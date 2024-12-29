// ProjectShowcase.tsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { projects } from "../data/projectsData"

export default function ProjectShowcase() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="from-red-700 to-gray-800 bg-clip-text text-transparent bg-gradient-to-t font-bold md:text-3xl text-xl text-center mb-6">
        Projects
      </h1>
      <Card className="p-6 shadow-lg">
        <div className="space-y-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card key={project.id} className="overflow-hidden shadow-md">
              <div className={`flex flex-col ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                <div className="w-full sm:w-2/5 h-48 sm:h-auto">
                  <Image
                    src={project.imageUrl}
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
                    <CardDescription className="text-sm">{project.description}</CardDescription>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {projects.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No projects available.</p>
        )}
      </Card>
    </div>
  )
}
