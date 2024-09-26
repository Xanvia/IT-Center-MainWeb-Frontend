"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { ChevronDownIcon } from "lucide-react";

// Define the schema for a staff member
const staffSchema = z.object({
  title: z.string(),
  displayName: z.string(),
  designationName: z.string(),
  nominal: z.string(),
  extNumber: z.string(),
  emails: z.array(z.string().email()),
  telephones: z.array(z.string()),
});

type StaffMember = z.infer<typeof staffSchema>;

// Mock data for demonstration
const mockStaffRequests: StaffMember[] = [
  {
    title: "Mr.",
    displayName: "John Doe",
    designationName: "Software Engineer",
    nominal: "JD001",
    extNumber: "1234",
    emails: ["john.doe@example.com"],
    telephones: ["123-456-7890"],
  },
  {
    title: "Ms.",
    displayName: "Jane Smith",
    designationName: "Project Manager",
    nominal: "JS002",
    extNumber: "5678",
    emails: ["jane.smith@example.com", "jane.work@example.com"],
    telephones: ["987-654-3210", "555-123-4567"],
  },
];

export default function StaffRequests() {
  const [staffRequests, setStaffRequests] = useState(mockStaffRequests);
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null);

  const handleApprove = (displayName: string) => {
    // Implement approval logic here
    console.log(`Approved: ${displayName}`);
  };

  const handleDecline = (displayName: string) => {
    // Implement decline logic here
    console.log(`Declined: ${displayName}`);
  };

  const toggleExpand = (displayName: string) => {
    setExpandedRequest(expandedRequest === displayName ? null : displayName);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Staff Registration Requests</h1>
      <div className="space-y-4">
        {staffRequests.map((staff) => (
          <Card key={staff.displayName} className="shadow-lg rounded-lg">
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onClick={() => toggleExpand(staff.displayName)}
                    aria-expanded={expandedRequest === staff.displayName}
                    aria-controls={`details-${staff.displayName}`}
                  >
                    <ChevronDownIcon
                      className={`transform transition-transform ${
                        expandedRequest === staff.displayName
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                    <span className="sr-only">Toggle details</span>
                  </Button>
                  <span className="font-semibold">{staff.displayName}</span>
                </div>
                <div className="space-x-2">
                  <Button
                    color="success"
                    onClick={() => handleApprove(staff.displayName)}
                    className="font-semibold"
                  >
                    Approve
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => handleDecline(staff.displayName)}
                    className="font-semibold"
                  >
                    Decline
                  </Button>
                </div>
              </div>
              {expandedRequest === staff.displayName && (
                <div
                  id={`details-${staff.displayName}`}
                  className="mt-4 pl-8 space-y-2 bg-gray-50 p-4 rounded-lg"
                >
                  <p>
                    <strong>Designation:</strong> {staff.designationName}
                  </p>
                  <p>
                    <strong>Nominal:</strong> {staff.nominal}
                  </p>
                  <p>
                    <strong>Ext Number:</strong> {staff.extNumber}
                  </p>
                  <p>
                    <strong>Emails:</strong> {staff.emails.join(", ")}
                  </p>
                  <p>
                    <strong>Telephones:</strong> {staff.telephones.join(", ")}
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
