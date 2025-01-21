'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { PlusCircle, X, Edit, Eye, Calendar, Clock, MapPin, AlertCircle } from "lucide-react"

interface Project {
  id: number
  name: string
  description: string
  imageUrl: string
  date: string
  time: string
  venue: string
}

export default function InteractiveProjectRow() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Project Alpha",
      description: "A cutting-edge web application for task management. This project aims to revolutionize how teams collaborate and manage their workflows.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      date: "2023-06-15",
      time: "14:00",
      venue: "Tech Hub, Silicon Valley"
    }
  ])

  const [isAdding, setIsAdding] = useState(false)
  const [viewingProject, setViewingProject] = useState<Project | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    imageUrl: '',
    date: '',
    time: '',
    venue: ''
  })

  const addProject = () => {
    if (newProject.name && newProject.description && newProject.date && newProject.time && newProject.venue) {
      setProjects([...projects, {
        id: Date.now(),
        name: newProject.name,
        description: newProject.description,
        imageUrl: newProject.imageUrl || "/placeholder.svg?height=200&width=300",
        date: newProject.date,
        time: newProject.time,
        venue: newProject.venue
      }])
      setNewProject({ name: '', description: '', imageUrl: '', date: '', time: '', venue: '' })
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
        date: viewingProject.date,
        time: viewingProject.time,
        venue: viewingProject.venue
      })
      setIsEditing(true)
    }
  }

  const saveEdit = () => {
    if (viewingProject && newProject.name && newProject.description && newProject.date && newProject.time && newProject.venue) {
      setProjects(projects.map(project => 
        project.id === viewingProject.id 
          ? { ...project, ...newProject, imageUrl: newProject.imageUrl || project.imageUrl }
          : project
      ))
      setViewingProject({ ...viewingProject, ...newProject })
      setIsEditing(false)
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <Card key={project.id} className="flex flex-col h-[500px]">
            <div className="h-[200px] relative">
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
                <span className="sr-only">Remove project</span>
              </Button>
            </div>
            <CardContent className="p-4 flex-grow overflow-hidden">
              <h3 className="font-bold text-lg mb-2">{truncateText(project.name, 30)}</h3>
              <p className="text-gray-600 text-sm mb-4">{truncateText(project.description, 100)}</p>
              <div className="space-y-2">
                <p className="text-gray-500 text-sm flex items-center">
                  <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                  {project.date || <span className="text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" /> Date not set</span>}
                </p>
                <p className="text-gray-500 text-sm flex items-center">
                  <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                  {project.time || <span className="text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" /> Time not set</span>}
                </p>
                <p className="text-gray-500 text-sm flex items-center">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  {project.venue ? truncateText(project.venue, 30) : <span className="text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" /> Venue not set</span>}
                </p>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4 mt-auto">
              <Button variant="outline" className="w-full" onClick={() => setViewingProject(project)}>
                <Eye className="w-4 h-4 mr-2" />
                View Project
              </Button>
            </CardFooter>
          </Card>
        ))}
        <Card 
          className="flex flex-col justify-center items-center p-6 border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors h-[500px]"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-500 text-center">Add a new project</p>
        </Card>
      </div>

      <Dialog open={isAdding} onOpenChange={(open) => {
        if (!open) setIsAdding(false)
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
          </DialogHeader>
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
              <Label htmlFor="newProjectTime">Project Time</Label>
              <Input
                id="newProjectTime"
                type="time"
                value={newProject.time}
                onChange={(e) => setNewProject({...newProject, time: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="newProjectVenue">Project Venue</Label>
              <Input
                id="newProjectVenue"
                value={newProject.venue}
                onChange={(e) => setNewProject({...newProject, venue: e.target.value})}
                placeholder="Enter project venue"
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
            <DialogFooter>
              <Button type="submit">Add Project</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
                {viewingProject.date || <span className="text-red-500">Date not set</span>}
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {viewingProject.time || <span className="text-red-500">Time not set</span>}
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {viewingProject.venue || <span className="text-red-500">Venue not set</span>}
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
                <Label htmlFor="editProjectTime">Project Time</Label>
                <Input
                  id="editProjectTime"
                  type="time"
                  value={newProject.time}
                  onChange={(e) => setNewProject({...newProject, time: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="editProjectVenue">Project Venue</Label>
                <Input
                  id="editProjectVenue"
                  value={newProject.venue}
                  onChange={(e) => setNewProject({...newProject, venue: e.target.value})}
                  placeholder="Enter project venue"
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