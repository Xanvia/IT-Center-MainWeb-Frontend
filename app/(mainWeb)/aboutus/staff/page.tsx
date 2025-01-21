'use client'
import { StaffSection } from "../staff/components/staff-section"
import { categorizeStaffByExtension, groupStaffByCategory } from "./utils/sort-staff"
import type { StaffMember } from "./types/staff"
import { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Axios from "@/config/axios";
import { toast } from "@/hooks/use-toast";

// Example staff data - replace with your actual data source
export default function StaffsPage() {
  const [StaffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        // Simulated API call
        const response = await Axios.get("/staff-profile/profile");
        const data = await response.data;
        setStaffMembers(data);
      } catch (error) {
        console.error("Error fetching students:", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            "There was a problem with our System. Try Again Later...",
        });
      }
    };
    fetchStaffs();
  }, []);

    const categorizedStaff = categorizeStaffByExtension(StaffMembers)
    const groupedStaff = groupStaffByCategory(categorizedStaff)

    return (
      <div className="container mx-auto py-12 space-y-12">
        {Object.entries(groupedStaff).map(([category, staff]) => (
          <StaffSection key={category} title={category} staff={staff} />
        ))}
      </div>
    )
  }


