import type { StaffMember } from "../types/staff"
import { StaffCard } from "./staff-card"

interface StaffGridProps {
  title: string
  staff: StaffMember[]
}

export function StaffGrid({ title, staff }: StaffGridProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => (
          <StaffCard key={member.id} staff={member} />
        ))}
      </div>
    </div>
  )
}

