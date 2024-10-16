// projectsData.ts
export interface Project {
    id: number
    title: string
    description: string
    date:string
    imageUrl: string
  }
  
  export const projects: Project[] = [
    {
      id: 1,
      title: "Cloud Migration",
      description: "Successfully migrated our infrastructure to a cloud-based solution, improving scalability and reducing costs by 30%. This project ensured minimal downtime and maximum efficiency.",
      date:"10/15/2024",
      imageUrl: "/placeholder.svg?height=180&width=320"
    },
    {
      id: 2,
      title: "AI-Powered Customer Service",
      description: "Implemented an AI chatbot handling 60% of customer inquiries, reducing response times and improving satisfaction. It uses NLP and ML to understand and respond to queries in real-time.",
      date:"10/15/2024",
      imageUrl: "/placeholder.svg?height=180&width=320"
    },
    {
      id: 3,
      title: "Cybersecurity Enhancement",
      description: "Upgraded security protocols and implemented advanced threat detection systems, reducing incidents by 80%. This included multi-factor authentication and AI-powered threat detection.",
      date:"10/15/2024",
      imageUrl: "/placeholder.svg?height=180&width=320"
    }
  ]
  