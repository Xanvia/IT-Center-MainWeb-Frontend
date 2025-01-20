import type { StaffMember } from "../types/staff"

export function categorizeStaffByExtension(staff: StaffMember[]): StaffMember[] {
  return staff.map((member) => {
    const ext = Number.parseInt(member.extNo.split("ST")[1])
    if (ext >= 100 && ext < 200) {
      return { ...member, category: "ADMINISTRATION" }
    } else if (ext >= 200 && ext < 300) {
      return { ...member, category: "INSTRUCTORS" }
    } else if (ext >= 300 && ext < 400) {
      return { ...member, category: "OTHER STAFF" }
    }
    return member
  })
}

export function groupStaffByCategory(staff: StaffMember[]) {
  
  return staff.reduce(
    (acc, member) => {
      if (!member.category) return acc
      if (!acc[member.category]) {
        acc[member.category] = []
      }
      acc[member.category].push(member)
      return acc
    },
    {} as Record<string, StaffMember[]>,
    
  )
  
}

