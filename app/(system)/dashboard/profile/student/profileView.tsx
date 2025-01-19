"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StuProfile } from "@/utils/types";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getAbsoluteImageUrl } from "@/utils/common";
import { Avatar } from "@nextui-org/react";

export default function StudentProfileView({
  stuProfile,
  admin,
}: {
  stuProfile: StuProfile | undefined;
  admin?: boolean;
}) {
  const navigate = useRouter();

  const handleGoBack = () => {
    navigate.back(); // Navigates back one step in history
  };

  return (
    <div className="min-h-[80vh] bg-white">
      {/* Header Banner */}
      {admin && (
        <div
          className="absolute top-28 left-8 cursor-pointer font-rubik underline text-white flex items-center"
          onClick={handleGoBack}
        >
          <ChevronLeft />
          Go back
        </div>
      )}
      <div className="h-48 bg-[#862727]" />
      <div className="max-w-3xl mx-auto px-4 -mt-24">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            {/* Profile Picture and Display Name */}
            <div className="flex flex-col items-center -mt-20 mb-4">
              <Avatar
                src={
                  getAbsoluteImageUrl(stuProfile?.image) ||
                  "/users/generalUser.png"
                }
                className="w-36 h-36  border-white shadow-lg"
              />

              <h2 className="mt-2 text-2xl font-semibold">
                {stuProfile?.studentProfile?.displayName}
              </h2>
              <p className="text-gray-500">{stuProfile?.studentId}</p>
            </div>

            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="higher">Higher Education</TabsTrigger>
                <TabsTrigger value="employment">Employment</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="font-medium">Student Name</p>
                    <p className="p-2 bg-gray-100 rounded-md">
                      {stuProfile?.studentProfile?.fullName}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium">Title</p>
                    <p className="p-2 bg-gray-100 rounded-md">
                      {stuProfile?.studentProfile?.title}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium">Date Of Birth</p>
                    <p className="p-2 bg-gray-100 rounded-md">
                      {stuProfile?.studentProfile?.dateOfBirth}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium">National ID</p>
                    <p className="p-2 bg-gray-100 rounded-md">
                      {stuProfile?.studentProfile?.nationalIdCardNo}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium">Email</p>
                    <p className="p-2 bg-gray-100 rounded-md">
                      {stuProfile?.email}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium">Phone No</p>
                    <p className="p-2 bg-gray-100 rounded-md">
                      {stuProfile?.studentProfile?.phoneNumber}
                    </p>
                  </div>

                  <div className="space-y-1 col-span-2">
                    <p className="font-medium">Address</p>
                    <p className="p-2 bg-gray-100 rounded-md">
                      {stuProfile?.studentProfile?.address}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="education">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">O/L Results</h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <p className="font-medium">English</p>
                      <p className="p-2 bg-gray-100 rounded-md">
                        {stuProfile?.studentProfile?.education.englishOL}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Mathematics</p>
                      <p className="p-2 bg-gray-100 rounded-md">
                        {stuProfile?.studentProfile?.education.mathematicsOL}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Science</p>
                      <p className="p-2 bg-gray-100 rounded-md">
                        {stuProfile?.studentProfile?.education.scienceOL}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold">A/L Results</h3>
                  <div className="grid grid-cols-4 gap-6">
                    {stuProfile?.studentProfile.education.aLevelResults.map(
                      (result) => (
                        <div className="space-y-1">
                          <p className="font-medium">{result.subject}</p>
                          <p className="p-2 bg-gray-100 rounded-md">
                            {result.grade}
                          </p>
                        </div>
                      )
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium">Other Qualification</p>
                    <p className="p-2 bg-gray-100 rounded-md">
                      {stuProfile?.studentProfile?.otherQualification}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="higher">
                <div className="space-y-6">
                  {stuProfile?.studentProfile?.higherEdu.map((edu, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="font-medium">Qualification</p>
                            <p className="p-2 bg-gray-100 rounded-md">
                              {edu.FOQualification}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium">Completed Date</p>
                            <p className="p-2 bg-gray-100 rounded-md">
                              {edu.date}
                            </p>
                          </div>
                          <div className="space-y-1 col-span-2">
                            <p className="font-medium">Institute</p>
                            <p className="p-2 bg-gray-100 rounded-md">
                              {edu.institute}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="employment">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="font-medium">Institution</p>
                      <p className="p-2 bg-gray-100 rounded-md">
                        {stuProfile?.studentProfile?.employment.institution}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Designation</p>
                      <p className="p-2 bg-gray-100 rounded-md">
                        {stuProfile?.studentProfile?.employment.designation}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Office Phone</p>
                      <p className="p-2 bg-gray-100 rounded-md">
                        {stuProfile?.studentProfile?.employment.officePhone}
                      </p>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <p className="font-medium">Office Address</p>
                      <p className="p-2 bg-gray-100 rounded-md">
                        {stuProfile?.studentProfile?.employment.officeAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
