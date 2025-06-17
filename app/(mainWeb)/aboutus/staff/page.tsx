"use client";
import { StaffSection } from "../staff/components/staff-section";
import {
  categorizeStaffByExtension,
  groupStaffByCategory,
  sortStaffByExtension,
} from "./utils/sort-staff";
import type { StaffMember } from "./types/staff";
import { useState, useEffect } from "react";
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
        const response = await Axios.get("/user/staff");
        const data = await response.data;
        setStaffMembers(data);
      } catch (error) {
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

  const categorizedStaff = categorizeStaffByExtension(StaffMembers);
  const groupedStaff = groupStaffByCategory(categorizedStaff);
  const sortedGroupedStaff = sortStaffByExtension(groupedStaff);

  const orderedCategories = ["ADMINISTRATION", "INSTRUCTORS", "OTHER STAFF"];

  return (
    <div className="container mx-auto py-12 space-y-12">
      {orderedCategories.map(
        (category) =>
          sortedGroupedStaff[category] && (
            <StaffSection
              key={category}
              title={category}
              staff={sortedGroupedStaff[category]}
            />
          )
      )}
    </div>
  );
}
