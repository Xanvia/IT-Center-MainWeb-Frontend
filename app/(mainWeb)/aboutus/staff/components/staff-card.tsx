import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import type { StaffMember } from "../types/staff";
import { capitalizeFirstLetter, getAbsoluteImageUrl, cn } from "@/utils/common";
import { Avatar } from "@nextui-org/react";

interface StaffCardProps {
  staff: StaffMember;
  className?: string;
}

// Function to format phone numbers for better visibility
const formatPhoneNumber = (phoneNumber: string) => {
  // Remove any non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  // Format based on length (assuming Sri Lankan format)
  if (cleaned.length === 10) {
    // Format as: 077 335 5555
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  } else {
    // Return original if format doesn't match expected pattern
    return phoneNumber;
  }
};

export function StaffCard({ staff, className }: StaffCardProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-sm hover:shadow-lg transition-shadow duration-300",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <Avatar
              className="h-44 w-44 text-large"
              src={getAbsoluteImageUrl(staff.image)}
              name={staff.name.charAt(0)}
              showFallback
              size="lg"
              classNames={{
                base: "border-2 border-primary/20",
                img: "object-cover",
              }}
            />
            <div className="text-center space-y-3">
              <div>
                <h3 className="text-xl font-semibold">
                  {staff.staffProfile.title && `${staff.staffProfile.title}. `}
                  {capitalizeFirstLetter(staff.name)}
                </h3>
                {staff.staffProfile.nominal && (
                  <p className="text-sm text-gray-500">
                    {staff.staffProfile.nominal}
                  </p>
                )}
              </div>

              {staff.staffProfile.designation && (
                <div className="flex items-center justify-center gap-1">
                  {/* <Briefcase className="h-3.5 w-3.5 text-primary" /> */}
                  <p className=" font-medium">
                    {staff.staffProfile.designation}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full space-y-3 border-t pt-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-sm truncate">{staff.email}</span>
            </div>
            {staff.staffProfile.telephones.map((number, index) => (
              <div key={index} className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">
                  {formatPhoneNumber(number.phoneNumber)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
