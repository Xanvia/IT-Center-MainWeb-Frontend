import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@heroui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Mail, Phone } from "lucide-react"
import type { StaffMember } from "../types/staff"

interface StaffCardProps {
  staff: StaffMember
}

export function StaffCard({ staff }: StaffCardProps) {


  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={staff.image} alt={staff.name} />
              <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex items-center space-x-1">
              <h3 className="text-sm font-medium text-muted-foreground">{staff.staffProfile.title}.</h3>
              <p className="font-semibold">{staff.name}</p>
              {/* <p className="text-sm text-muted-foreground">{staff.nominal}</p> */}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{staff.email}</span>
            </div>
            {staff.staffProfile.telephones.map((number, index)=> (
              <div key={index} className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{number.phoneNumber}</span>
              </div>
            ))}
            {/* console.log("Telephones:"); */}

          </div>
          <div className="text-right">
            <span className="text-sm text-muted-foreground">{staff.staffProfile.extNo}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

