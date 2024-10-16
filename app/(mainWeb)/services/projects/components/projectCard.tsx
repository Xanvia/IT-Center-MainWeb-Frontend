// ProjectShowcase.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Image from "next/image"
import { projects, Project } from "../data/projectsData"


export default function ProjectShowcase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(projects)

  const handleSearch = () => {
    const filtered = projects.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProjects(filtered)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">IT Center Projects</h1>
      <Card className="p-6 shadow-lg">
        <div className="flex justify-end mb-6">
          <div className="flex items-center">
            <div className="relative mr-2">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search projects..."
                className="pl-8 pr-4 py-1 w-64 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="bg-red-800 text-white hover:bg-yellow-500 hover:text-black transition-colors" size="sm" onClick={handleSearch}>Search</Button>
          </div>
        </div>
        <div className="space-y-6 max-w-3xl mx-auto">
          {filteredProjects.map((project, index) => (
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
        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No projects found matching your search.</p>
        )}
      </Card>
    </div>
  )
}
