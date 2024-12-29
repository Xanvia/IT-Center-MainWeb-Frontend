"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { courses as Courses } from "@/app/(system)/dashboard/courseRegistration/courseData";

export default function EditCoursePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const course = Courses.find((c) => c.id === params.id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!course) {
    return <div>Course not found</div>;
  }

  const [formData, setFormData] = useState(course);
  const [previewImage, setPreviewImage] = useState(course.image);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    toast.success("Course updated successfully!");
    router.push("/dashboard/admin/courses/updateCourse");
  };

  const handleCancel = () => {
    router.push("/dashboard/admin/courses/updateCourse");
  };

  const handleDelete = () => {
    toast.success("Course deleted successfully!");
    router.push("/dashboard/admin/courses/updateCourse");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-maroon">
        Edit Course : {course.name}
      </h1>
      <form className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Course Code
            </label>
            <Input
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Course Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration
            </label>
            <Input
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="fees"
              className="block text-sm font-medium text-gray-700"
            >
              Fees
            </label>
            <Input
              id="fees"
              name="fees"
              type="number"
              placeholder="Rs"
              value={formData.fees.toString()}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="studentLimit"
              className="block text-sm font-medium text-gray-700"
            >
              Student Limit
            </label>
            <Input
              id="studentLimit"
              name="studentLimit"
              type="number"
              value={formData.studentLimit.toString()}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date (DD-MM-YYYY)
            </label>
            <Input
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              placeholder="DD-MM-YYYY"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              End Date (DD-MM-YYYY)
            </label>
            <Input
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              placeholder="DD-MM-YYYY"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label
              htmlFor="audience"
              className="block text-sm font-medium text-gray-700"
            >
              Target Audience
            </label>
            <Input
              id="audience"
              name="audience"
              value={formData.audience}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="instructor"
              className="block text-sm font-medium text-gray-700"
            >
              Instructor
            </label>
            <Input
              id="instructor"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Choose Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {previewImage && (
            <div className="mt-2">
              <Image
                src={previewImage}
                alt="Course preview"
                width={200}
                height={200}
                className="object-cover rounded"
              />
            </div>
          )}
        </div>
        <div className="flex space-x-4">
          <Button
            onClick={handleSave}
            className="bg-maroon text-white hover:bg-maroon-600"
          >
            Save
          </Button>
          <Button
            onClick={handleCancel}
            className="bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Delete Course
          </Button>
        </div>
      </form>
    </div>
  );
}
