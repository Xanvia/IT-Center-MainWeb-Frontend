"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Input,
  Textarea,
  Button,
  Card,
  CardBody,
  Calendar,
} from "@nextui-org/react";
import { Book, Users, DollarSign, Clock, Target } from "lucide-react";
//import { DatePicker } from "@/components/ui/date-picker";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const formSchema = z.object({
  courseName: z.string().min(2, "Course name must be at least 2 characters."),
  courseCode: z.string().min(2, "Course code must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  duration: z.string().min(1, "Duration is required."),
  registrationDeadline: z.date({
    required_error: "Registration deadline is required",
  }),
  startingDate: z.date({
    required_error: "Starting date is required",
  }),
  endingDate: z.date({
    required_error: "Ending date is required",
  }),
  studentLimit: z
    .number()
    .int()
    .positive("Student limit must be a positive integer."),
  fees: z.number().positive("Fees must be a positive number."),
  instructor: z.string().min(1, "Instructor name is required."),
  audience: z.string().min(1, "Target audience is required."),
  images: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateCourse() {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
      courseCode: "",
      description: "",
      duration: "",
      registrationDeadline: new Date(),
      startingDate: new Date(),
      endingDate: new Date(),
      studentLimit: 0,
      fees: 0,
      instructor: "",
      audience: "",
      images: [],
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Handle image uploads first
      const imageUrls: string[] = [];

      if (images.length > 0) {
        for (const image of images) {
          const formData = new FormData();
          formData.append("file", image);

          // Replace with your image upload endpoint
          const uploadResponse = await fetch("http://localhost:3001/upload", {
            method: "POST",
            body: formData,
          });

          if (!uploadResponse.ok) {
            throw new Error("Failed to upload images");
          }

          const { url } = await uploadResponse.json();
          imageUrls.push(url);
        }
      }

      // Prepare the course data
      const courseData = {
        ...data,
        images: imageUrls,
        registrationDeadline: data.registrationDeadline
          .toISOString()
          .split("T")[0],
        startingDate: data.startingDate.toISOString(),
        endingDate: data.endingDate.toISOString(),
      };

      // Submit the course
      const response = await fetch("http://localhost:3001/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create course");
      }

      toast.success("Course created successfully!", {
        duration: 5000,
        style: {
          background: "#22c55e",
          color: "#fff",
          fontSize: "16px",
          padding: "16px",
        },
      });
      setTimeout(() => {
        router.push("/dashboard/admin/courses");
      }, 5000);
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create course"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Toaster position="top-center" />
      <Card className="max-w-4xl mx-auto">
        <CardBody className="p-6">
          <h2 className="text-3xl text-maroon font-bold mb-8">
            Create a New Course
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="courseName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Course Name"
                    placeholder="Enter course name"
                    isInvalid={!!errors.courseName}
                    errorMessage={errors.courseName?.message}
                    startContent={<Book className="text-default-400 w-4 h-4" />}
                  />
                )}
              />
              <Controller
                name="courseCode"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Course Code"
                    placeholder="Enter course code"
                    isInvalid={!!errors.courseCode}
                    errorMessage={errors.courseCode?.message}
                    startContent={<Book className="text-default-400 w-4 h-4" />}
                  />
                )}
              />
            </div>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  placeholder="Describe your course"
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                />
              )}
            />
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Duration"
                  placeholder="Enter course duration"
                  isInvalid={!!errors.duration}
                  errorMessage={errors.duration?.message}
                  startContent={
                    <Calendar className="text-default-400 w-4 h-4" />
                  }
                />
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Controller
                name="registrationDeadline"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    label="Registration Deadline"
                    value={field.value.toISOString().split("T")[0]}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                    isInvalid={!!errors.registrationDeadline}
                    errorMessage={errors.registrationDeadline?.message}
                    startContent={
                      <Clock className="text-default-400 w-4 h-4" />
                    }
                  />
                )}
              />
              <Controller
                name="startingDate"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    label="Starting Date"
                    value={field.value.toISOString().split("T")[0]}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                    isInvalid={!!errors.startingDate}
                    errorMessage={errors.startingDate?.message}
                    startContent={
                      <Clock className="text-default-400 w-4 h-4" />
                    }
                  />
                )}
              />
              <Controller
                name="endingDate"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    label="Ending Date"
                    value={field.value.toISOString().split("T")[0]}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                    isInvalid={!!errors.endingDate}
                    errorMessage={errors.endingDate?.message}
                    startContent={
                      <Clock className="text-default-400 w-4 h-4" />
                    }
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="studentLimit"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Student Limit"
                    placeholder="Enter student limit"
                    isInvalid={!!errors.studentLimit}
                    errorMessage={errors.studentLimit?.message}
                    value={field.value.toString()}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    startContent={
                      <Users className="text-default-400 w-4 h-4" />
                    }
                  />
                )}
              />
              <Controller
                name="fees"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Course Fees"
                    placeholder="Enter course fees"
                    isInvalid={!!errors.fees}
                    errorMessage={errors.fees?.message}
                    value={field.value.toString()}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    startContent={
                      <DollarSign className="text-default-400 w-4 h-4" />
                    }
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="instructor"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Instructor"
                    placeholder="Enter instructor name"
                    isInvalid={!!errors.instructor}
                    errorMessage={errors.instructor?.message}
                    startContent={
                      <Users className="text-default-400 w-4 h-4" />
                    }
                  />
                )}
              />
              <Controller
                name="audience"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Target Audience"
                    placeholder="Enter target audience"
                    isInvalid={!!errors.audience}
                    errorMessage={errors.audience?.message}
                    startContent={
                      <Target className="text-default-400 w-4 h-4" />
                    }
                  />
                )}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Course Images</span>
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full"
              />
              <label className="label">
                <span className="label-text-alt">
                  Upload images for the course
                </span>
              </label>
            </div>
            <Button
              color="primary"
              type="submit"
              className="bg-maroon text-white w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Course..." : "Create Course"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
