"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import Axios from "@/config/axios";
import { delay } from "@/utils/common";
import { Course } from "@/utils/types";
import { useSession } from "next-auth/react";

interface CourseModalProps {
  course?: Course | null;
  onClose: () => void;
  onSave: (course: Course) => void;
}

export default function CourseModal({
  course,
  onClose,
  onSave,
}: CourseModalProps) {
  const [formData, setFormData] = useState<Course>({
    id: "",
    courseName: "",
    courseCode: "",
    description: "",
    duration: "",
    registrationDeadline: "",
    fees: 0,
    audience: "",
    instructor: "",
    images: [],
    studentLimit: 0,
    registered: 0,
    startingDate: "",
    endingDate: "",
  });
  const { data: session } = useSession();

  useEffect(() => {
    if (course) {
      setFormData(course);
    }
  }, [course]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("course", files[i]);
      }
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/upload`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );
        if (result.ok) {
          const data = await result.json();
          console.log(data);
          await delay(3000);
          setFormData((prev) => ({
            ...prev,
            images: [
              ...prev.images,
              ...data.files.map(
                (file: { path: string }) =>
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/${file.path}`
              ),
            ],
          }));
          toast({ description: "Images uploaded successfully" });
        }
      } catch (error) {
        console.error(error);
        toast({ description: "Failed to upload images" });
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert numeric fields to numbers
    const convertedFormData = {
      ...formData,
      fees: Number(formData.fees),
      studentLimit: Number(formData.studentLimit),
      registered: Number(formData.registered),
    };

    const url = course ? `courses/${course.id}` : "courses";
    console.log("formData", convertedFormData);
    let res;
    try {
      if (course) {
        res = await Axios.patch(url, convertedFormData, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        console.log(res.data);
        onSave(formData);
      } else {
        const { id, ...data } = convertedFormData;
        res = await Axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        console.log(res.data);
        onSave(res.data);
      }

      toast({
        title: "Course saved.",
        description: "Your course has been saved successfully",
      });
      onClose();
      console.log("convertedFormData", convertedFormData, res.data);
    } catch (error: any) {
      console.log(error.response.data);
      toast({
        title: "Something went wrong!",
        description: "Your course has not been saved successfully",
      });
    }
  };

  return (
    <div className="fixed top-16 bottom-0 right-0 left-28 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto z-10">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {course ? "Edit" : "Add"} Course
          </h2>
          <Button variant="ghost" onClick={onClose}>
            <X />
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="courseName">Course Name</Label>
                <Input
                  id="courseName"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="courseCode">Course Code</Label>
                <Input
                  id="courseCode"
                  name="courseCode"
                  value={formData.courseCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="fees">Course Fee</Label>
                <Input
                  id="fees"
                  name="fees"
                  type="number"
                  value={formData.fees}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="studentLimit">Student Limit</Label>
                <Input
                  id="studentLimit"
                  name="studentLimit"
                  type="number"
                  value={formData.studentLimit}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="duration">Course Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="duration">Registered Count</Label>
                <Input
                  id="registered"
                  name="registered"
                  value={formData.registered}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="startingDate">Starting Date</Label>
                <Input
                  id="startingDate"
                  name="startingDate"
                  value={formData.startingDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="endingDate">Ending Date</Label>
                <Input
                  id="endingDate"
                  name="endingDate"
                  value={formData.endingDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="registrationDeadline">
                  Registration Deadline
                </Label>
                <Input
                  id="registrationDeadline"
                  name="registrationDeadline"
                  value={formData.registrationDeadline}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="audience">Audience</Label>
                <Textarea
                  id="audience"
                  name="audience"
                  value={formData.audience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="image">Images</Label>

                <div className="flex m-1 space-x-2 overflow-auto">
                  {formData.images.map((image, index) => (
                    <div className="relative ">
                      <img
                        src={image}
                        alt={`image:${index}`}
                        className="h-20"
                      />
                      <div className="absolute top-0 right-1">
                        <p
                          className=" text-red-500 cursor-pointer text-sm font-bold"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              images: prev.images.filter(
                                (img) => img !== image
                              ),
                            }))
                          }
                        >
                          x
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleImageChange}
                  multiple
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-maroon" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
