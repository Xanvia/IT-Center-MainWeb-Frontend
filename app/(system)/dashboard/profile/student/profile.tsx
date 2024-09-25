"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type FieldType = {
  label: string
  value: string
}

export default function Component() {
  const userType = "Student"

  const profileImage = "/users/generalUser.png"
  const fields: FieldType[] = [
    { label: "Student Name", value: "student_name" },
    { label: "Undergraduate/Visiting Student", value: "Undergraduate" },
    { label: "Student No", value: "s62718" },
    { label: "Date Of Birth", value: "2000-12-25" },
    { label: "Email", value: "sfssfs@vhh.com" },
    { label: "Phone No", value: "070288191" },
  ]

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="bg-red-900 h-32 relative">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="relative w-32 h-32 bg-muted rounded-full overflow-hidden">
            <Image
              src={profileImage}
              alt="Student profile picture"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
            <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-20 pb-8">
        <h2 className="text-2xl font-bold text-center mb-1">
          {fields[0].value}
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          {fields[2].value}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field, index) => (
            <div key={index} className="relative">
              <Label htmlFor={`field-${index}`} className="block text-sm font-medium text-foreground mb-1">
                {field.label}
              </Label>
              <Input
                type="text"
                id={`field-${index}`}
                value={field.value}
                readOnly
                className="w-full bg-muted text-foreground border border-input rounded-md py-2 px-3 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}