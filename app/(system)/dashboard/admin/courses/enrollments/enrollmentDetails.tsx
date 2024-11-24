"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Table } from "lucide-react";
import { TableBody, TableCell, TableRow } from "@nextui-org/react";
import React from "react";

// Mock data for enrollment requests
const enrollmentRequests = [
  {
    id: "1",
    studentName: "Tharu Jayalath",
    personalDetails: {
      title: "Mr",
      fullName: "John Michael Doe",
      nameWithInitials: "J.M. Doe",
      nationalIdCardNo: "123456789V",
      phoneNumber: "0771234567",
      postalAddress: "123 Main St, Colombo",
    },
    educationalQualifications: {
      alResults: "AAB",
      olResults: "8A 1B",
    },
    higherEducationalQualifications: [
      {
        qualification: "BSc in Computer Science",
        institute: "University of Colombo",
        year: "2020",
      },
    ],
    otherQualifications: "Certified in Web Development",
    employmentDetails: {
      currentEmployment: "Software Engineer at Tech Co",
      relevantExperience: "2 years in web development",
    },
  },
  {
    id: "2",
    studentName: "Minasha Rathnayake",
    personalDetails: {
      title: "Mr",
      fullName: "John Michael Doe",
      nameWithInitials: "J.M. Doe",
      nationalIdCardNo: "123456789V",
      phoneNumber: "0771234567",
      postalAddress: "123 Main St, Colombo",
    },
    educationalQualifications: {
      alResults: "AAB",
      olResults: "8A 1B",
    },
    higherEducationalQualifications: [
      {
        qualification: "BSc in Computer Science",
        institute: "University of Colombo",
        year: "2020",
      },
    ],
    otherQualifications: "Certified in Web Development",
    employmentDetails: {
      currentEmployment: "Software Engineer at Tech Co",
      relevantExperience: "2 years in web development",
    },
  },
];

interface EnrollmentRequestsTableProps {
  courseId: string;
}

export function EnrollmentRequestsTable({
  courseId,
}: EnrollmentRequestsTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-maroon">
        Enrollment Requests
      </h2>
      <Table>
        <TableBody>
          {enrollmentRequests.map((request, index) => (
            <React.Fragment key={index}>
              <TableRow
                key={request.id}
                className="hover:bg-muted/50 cursor-pointer"
              >
                <TableCell className="font-medium">
                  {request.studentName}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">
                    Accept
                  </Button>
                  <Button variant="outline" size="sm">
                    Reject
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRow(request.id)}
                  >
                    {expandedRow === request.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
              {expandedRow === request.id && (
                <TableRow key={`${request.id}-details`}>
                  <TableCell colSpan={3}>
                    <div className="p-4 bg-muted/50">
                      <h3 className="text-lg font-semibold mb-2">
                        Student Details
                      </h3>
                      <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <dt className="font-medium text-gray-500">
                            Full Name
                          </dt>
                          <dd>{request.personalDetails.fullName}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">NIC</dt>
                          <dd>{request.personalDetails.nationalIdCardNo}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Phone</dt>
                          <dd>{request.personalDetails.phoneNumber}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Address</dt>
                          <dd>{request.personalDetails.postalAddress}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">
                            A/L Results
                          </dt>
                          <dd>{request.educationalQualifications.alResults}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">
                            O/L Results
                          </dt>
                          <dd>{request.educationalQualifications.olResults}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">
                            Higher Education
                          </dt>
                          <dd>
                            {request.higherEducationalQualifications.map(
                              (qual, index) => (
                                <div key={index}>
                                  {qual.qualification} - {qual.institute} (
                                  {qual.year})
                                </div>
                              )
                            )}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">
                            Other Qualifications
                          </dt>
                          <dd>{request.otherQualifications}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">
                            Current Employment
                          </dt>
                          <dd>{request.employmentDetails.currentEmployment}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">
                            Relevant Experience
                          </dt>
                          <dd>
                            {request.employmentDetails.relevantExperience}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
