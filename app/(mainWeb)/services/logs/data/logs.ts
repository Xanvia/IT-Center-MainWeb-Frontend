export interface Log {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  }
  
  export const logs: Log[] = [
    {
      id: "1",
      name: "System Startup",
      description: "The system has successfully started up and all services are running. This log entry indicates that the initialization process has completed without any errors.",
      imageUrl: "/placeholder.svg?height=200&width=200&text=System+Startup",
    },
    {
      id: "2",
      name: "User Login",
      description: "A user has successfully authenticated and logged into the system. This log entry captures important security-related events and user activities.",
      imageUrl: "/placeholder.svg?height=200&width=200&text=User+Login",
    },
    {
      id: "3",
      name: "Database Backup",
      description: "A full database backup has been completed and stored securely. This log entry confirms that data protection measures are in place and functioning correctly.",
      imageUrl: "/placeholder.svg?height=200&width=200&text=Database+Backup",
    },
    {
      id: "4",
      name: "Error Alert",
      description: "An error has occurred in the application. This log entry provides details about the nature of the error, its potential impact, and steps for resolution.",
      imageUrl: "/placeholder.svg?height=200&width=200&text=Error+Alert",
    },
  ];
  
  