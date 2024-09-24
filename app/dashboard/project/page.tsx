'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { PlusCircle, X, Edit, Eye, Calendar } from "lucide-react"

interface Project {
  id: number
  name: string
  description: string
  imageUrl: string
  date: string
}

export default function InteractiveProjectRow() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Project Alpha",
      description: "A cutting-edge web application for task management. This project aims to revolutionize how teams collaborate and manage their workflows. With intuitive interfaces and powerful features, Project Alpha streamlines task allocation, progress tracking, and team communication.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      date: "2023-06-15"
    }
  ])

  const [isAdding, setIsAdding] = useState(false)
  const [viewingProject, setViewingProject] = useState<Project | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    imageUrl: '',
    date: ''
  })

  const addProject = () => {
    if (newProject.name && newProject.description && newProject.date) {
      setProjects([...projects, {
        id: Date.now(),
        name: newProject.name,
        description: newProject.description,
        imageUrl: newProject.imageUrl || "/placeholder.svg?height=200&width=300",
        date: newProject.date
      }])
      setNewProject({ name: '', description: '', imageUrl: '', date: '' })
      setIsAdding(false)
    }
  }

  const removeProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id))
  }

  const startEditing = () => {
    if (viewingProject) {
      setNewProject({
        name: viewingProject.name,
        description: viewingProject.description,
        imageUrl: viewingProject.imageUrl,
        date: viewingProject.date
      })
      setIsEditing(true)
    }
  }

  const saveEdit = () => {
    if (viewingProject && newProject.name && newProject.description && newProject.date) {
      setProjects(projects.map(project => 
        project.id === viewingProject.id 
          ? { ...project, ...newProject, imageUrl: newProject.imageUrl || project.imageUrl }
          : project
      ))
      setViewingProject({ ...viewingProject, ...newProject })
      setIsEditing(false)
    }
  }

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description;
    return description.substr(0, maxLength) + '...';
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Project Row</h2>
      <div className="grid grid-cols-3 gap-6">
        {projects.map(project => (
          <Card key={project.id} className="overflow-hidden flex flex-col">
            <div className="aspect-video relative">
              <img 
                src={project.imageUrl} 
                alt={project.name} 
                className="w-full h-full object-cover"
              />
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute top-2 right-2"
                onClick={() => removeProject(project.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-4 flex-grow">
              <h3 className="font-bold text-lg mb-2">{project.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{truncateDescription(project.description, 100)}</p>
              <p className="text-gray-500 text-sm flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {project.date}
              </p>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4">
              <Button variant="outline" className="w-full" onClick={() => setViewingProject(project)}>
                <Eye className="w-4 h-4 mr-2" />
                View Project
              </Button>
            </CardFooter>
          </Card>
        ))}
        {projects.length < 3 && !isAdding && (
          <Card 
            className="flex flex-col justify-center items-center p-6 border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setIsAdding(true)}
          >
            <PlusCircle className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center">Add a new project</p>
          </Card>
        )}
        {isAdding && (
          <Card className="overflow-hidden flex flex-col">
            <CardContent className="p-4 flex-grow">
              <form onSubmit={(e) => { e.preventDefault(); addProject(); }} className="space-y-4">
                <div>
                  <Label htmlFor="newProjectName">Project Name</Label>
                  <Input
                    id="newProjectName"
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    placeholder="Enter project name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newProjectDescription">Description</Label>
                  <Textarea
                    id="newProjectDescription"
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    placeholder="Enter project description"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newProjectDate">Project Date</Label>
                  <Input
                    id="newProjectDate"
                    type="date"
                    value={newProject.date}
                    onChange={(e) => setNewProject({...newProject, date: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newProjectImage">Project Image</Label>
                  <Input
                    id="newProjectImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onloadend = () => {
                          setNewProject({...newProject, imageUrl: reader.result as string})
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1">Add Project</Button>
                  <Button type="button" variant="outline" onClick={() => setIsAdding(false)} className="flex-1">Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={viewingProject !== null} onOpenChange={(open) => {
        if (!open) {
          setViewingProject(null)
          setIsEditing(false)
        }
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Project' : viewingProject?.name}</DialogTitle>
          </DialogHeader>
          {viewingProject && !isEditing && (
            <div className="space-y-4">
              <img 
                src={viewingProject.imageUrl} 
                alt={viewingProject.name} 
                className="w-full h-48 object-cover rounded-md"
              />
              <p className="text-sm text-gray-600">{viewingProject.description}</p>
              <p className="text-sm text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {viewingProject.date}
              </p>
            </div>
          )}
          {isEditing && (
            <form onSubmit={(e) => { e.preventDefault(); saveEdit(); }} className="space-y-4">
              <div>
                <Label htmlFor="editProjectName">Project Name</Label>
                <Input
                  id="editProjectName"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="editProjectDescription">Description</Label>
                <Textarea
                  id="editProjectDescription"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
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
                  onChange={(e) => setNewProject({...newProject, date: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="editProjectImage">Project Image</Label>
                <Input
                  id="editProjectImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setNewProject({...newProject, imageUrl: reader.result as string})
                      }
                      reader.readAsDataURL(file)
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
                Edit Project
              </Button>
            )}
            {isEditing && (
              <div className="flex space-x-2">
                <Button onClick={saveEdit}>Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}