export interface StaffMember {
  id: string
  displayName: string
  title: string
  designation: string
  nominal: string
  extNo: string
  requestBy: string
  emails: string[]
  telephones: {
    
      id: string,
      phoneNumber: string
  
  }[]
  category?: "ADMINISTRATION" | "INSTRUCTORS" | "OTHER STAFF"
  image:string
}
  