'use client'

import { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, Image } from "@nextui-org/react"
import { Trash2, Edit3, Plus, Upload } from 'lucide-react'

interface Service {
  id: number
  name: string
  description: string
  image: string
}

export default function Component() {
  const [services, setServices] = useState<Service[]>([])
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const addService = () => {
    const newService: Service = {
      id: Date.now(),
      name: '',
      description: '',
      image: ''
    }
    setServices([...services, newService])
    setEditingService(newService)
    setIsModalOpen(true)
  }

  const updateService = (updatedService: Service) => {
    setServices(services.map(p => p.id === updatedService.id ? updatedService : p))
    setEditingService(null)
    setIsModalOpen(false)
  }

  const deleteService = (serviceId: number) => {
    setServices(services.filter(p => p.id !== serviceId))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, serviceId: number) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const updatedService = services.find(p => p.id === serviceId)
        if (updatedService) {
          setEditingService({ ...updatedService, image: reader.result as string })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-6 flex justify-start">
        <Button 
          onClick={addService} 
          color="primary"
          endContent={<Plus size={20} />}
        >
          Add New Service
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <Card key={service.id} className="w-full h-[200px]">
            <CardHeader className="flex justify-between items-center p-4">
              <h4 className="text-lg font-semibold truncate mr-4">{service.name || 'New Service'}</h4>
              <div className="flex gap-2 flex-shrink-0">
                <Button 
                  isIconOnly 
                  color="primary" 
                  aria-label="Edit" 
                  size="sm"
                  onClick={() => {
                    setEditingService(service)
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
                  onClick={() => deleteService(service.id)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </CardHeader>
            <CardBody className="overflow-hidden p-0">
              {service.image ? (
                <Image
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <p className="text-gray-500 dark:text-gray-400">No image</p>
                </div>
              )}
              {service.description && (
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white">
                  <p className="text-sm truncate">{service.description}</p>
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
                {editingService?.name ? 'Edit Service' : 'New Service'}
              </ModalHeader>
              <ModalBody>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Service Name
                    </label>
                    <Input
                      placeholder="Enter the name of your service"
                      value={editingService?.name || ''}
                      onChange={(e) => setEditingService(prev => prev ? {...prev, name: e.target.value} : null)}
                      variant="bordered"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Service Description
                    </label>
                    <Textarea
                      placeholder="Provide a brief description of your service"
                      value={editingService?.description || ''}
                      onChange={(e) => setEditingService(prev => prev ? {...prev, description: e.target.value} : null)}
                      variant="bordered"
                      minRows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Service Image
                    </label>
                    <div className="flex items-center">
                      <label htmlFor="service-image" className="cursor-pointer">
                        <Button
                          color="primary"
                          variant="flat"
                          startContent={<Upload size={18} />}
                        >
                          Upload Image
                        </Button>
                        <input
                          id="service-image"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => editingService && handleImageUpload(e, editingService.id)}
                        />
                      </label>
                    </div>
                  </div>
                  {editingService?.image && (
                    <Image
                      src={editingService.image}
                      alt="Service preview"
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
                    if (editingService) updateService(editingService)
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