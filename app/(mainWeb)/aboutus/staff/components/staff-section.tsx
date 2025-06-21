import type { StaffMember } from "../types/staff";
import { StaffCard } from "./staff-card";
import { cn } from "@/utils/common";

interface StaffSectionProps {
  title: string;
  staff: StaffMember[];
}

export function StaffSection({ title, staff }: StaffSectionProps) {
  if (!staff || staff.length === 0) return null;

  // Determine layout style based on number of staff members
  const fewStaff = staff.length <= 2;

  return (
    <section className="space-y-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold relative inline-block">
          {title}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-full"></span>
        </h2>
        <p className="text-muted-foreground mt-4">
          {title === "ADMINISTRATION" &&
            "Leadership team guiding our institution"}
          {title === "INSTRUCTORS" &&
            "Expert educators shaping future professionals"}
          {title === "OTHER STAFF" &&
            "Dedicated team supporting our operations"}
        </p>
      </div>

      <div
        className={cn(
          fewStaff
            ? "flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        )}
      >
        {staff.map((member) => (
          <StaffCard
            key={member.id}
            staff={member}
            className={fewStaff && staff.length === 1 ? "md:max-w-md" : ""}
          />
        ))}
      </div>
    </section>
  );
}
