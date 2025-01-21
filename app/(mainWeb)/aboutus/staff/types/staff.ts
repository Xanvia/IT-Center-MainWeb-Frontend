export interface StaffMember {
  id: string
        email: string
        name: string
        role: string
        image: string
        staffProfile: {
            id: string
            title: string
            designation: string
            extNo: string
            emails:
                {
                    id: string
                    email: string
                }[],
            telephones:
                {
                    id: string
                    phoneNumber: string
                }[]
        }
  category?: "ADMINISTRATION" | "INSTRUCTORS" | "OTHER STAFF"
}

/**
{
        id: string
        email: string
        name: string
        role: string
        image: string
        staffProfile: {
            id: string
            title: string
            designation: string
            extNo: string
            emails:
                {
                    id: string
                    email: string
                }[],
            telephones:
                {
                    id: string
                    phoneNumber: string
                }[]
        }
    }
 */
  