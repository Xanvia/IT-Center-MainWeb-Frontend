import type { StaffMember } from "../types/staff"
import { StaffCard } from "./staff-card"

interface StaffSectionProps {
  title: string
  staff: StaffMember[]
}

export function StaffSection({ title, staff }: StaffSectionProps) {
  if (!staff || staff.length === 0) return null

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => (
          <StaffCard key={member.id} staff={member} />
        ))}
      </div>
    </section>
  )
}

