'use client'

import { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, Image } from "@nextui-org/react"
import { Trash2, Edit3, Plus, Upload } from 'lucide-react'

interface Project {
  id: number
  name: string
  description: string
  image: string
}

export default function Component() {
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const addProject = () => {
    const newProject: Project = {
      id: Date.now(),
      name: '',
      description: '',
      image: ''
    }
    setProjects([...projects, newProject])
    setEditingProject(newProject)
    setIsModalOpen(true)
  }

  const updateProject = (updatedProject: Project) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p))
    setEditingProject(null)
    setIsModalOpen(false)
  }

  const deleteProject = (projectId: number) => {
    setProjects(projects.filter(p => p.id !== projectId))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, projectId: number) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const updatedProject = projects.find(p => p.id === projectId)
        if (updatedProject) {
          setEditingProject({ ...updatedProject, image: reader.result as string })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-6 flex justify-start">
        <Button 
          onClick={addProject} 
          color="primary"
          endContent={<Plus size={20} />}
        >
          Add New Project
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <Card key={project.id} className="w-full h-[200px]">
            <CardHeader className="flex justify-between items-center p-4">
              <h4 className="text-lg font-semibold truncate mr-4">{project.name || 'New Project'}</h4>
              <div className="flex gap-2 flex-shrink-0">
                <Button 
                  isIconOnly 
                  color="primary" 
                  aria-label="Edit" 
                  size="sm"
                  onClick={() => {
                    setEditingProject(project)
                    setIsModalOpen(true)
                  }}
                >
                  <Edit3 size={18} />
                </Button>
                <Button 
                  isIconOnly 
                  color="danger" 
                  aria-label="Delete" 
                  size="sm"
                  onClick={() => deleteProject(project.id)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </CardHeader>
            <CardBody className="overflow-hidden p-0">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <p className="text-gray-500 dark:text-gray-400">No image</p>
                </div>
              )}
              {project.description && (
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white">
                  <p className="text-sm truncate">{project.description}</p>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        size="2xl"
        backdrop="blur"
        classNames={{
          backdrop: "bg-gray-900/50 backdrop-opacity-40",
          base: "border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-700",
          header: "border-b border-gray-100 dark:border-gray-700",
          footer: "border-t border-gray-100 dark:border-gray-700",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {editingProject?.name ? 'Edit Project' : 'New Project'}
              </ModalHeader>
              <ModalBody>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Project Name
                    </label>
                    <Input
                      placeholder="Enter the name of your project"
                      value={editingProject?.name || ''}
                      onChange={(e) => setEditingProject(prev => prev ? {...prev, name: e.target.value} : null)}
                      variant="bordered"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Project Description
                    </label>
                    <Textarea
                      placeholder="Provide a brief description of your project"
                      value={editingProject?.description || ''}
                      onChange={(e) => setEditingProject(prev => prev ? {...prev, description: e.target.value} : null)}
                      variant="bordered"
                      minRows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Project Image
                    </label>
                    <div className="flex items-center">
                      <label htmlFor="project-image" className="cursor-pointer">
                        <Button
                          color="primary"
                          variant="flat"
                          startContent={<Upload size={18} />}
                        >
                          Upload Image
                        </Button>
                        <input
                          id="project-image"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => editingProject && handleImageUpload(e, editingProject.id)}
                        />
                      </label>
                    </div>
                  </div>
                  {editingProject?.image && (
                    <Image
                      src={editingProject.image}
                      alt="Project preview"
                      className="mt-2 max-w-full h-48 object-cover rounded-md"
                    />
                  )}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color="primary" 
                  onPress={() => {
                    if (editingProject) updateProject(editingProject)
                    onClose()
                  }}
                >
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}