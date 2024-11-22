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
  Progress,
  Tooltip,
} from "@nextui-org/react";
import {
  Calendar,
  Book,
  Users,
  DollarSign,
  Clock,
  Target,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

const formSchema = z.object({
  courseName: z.string().min(2, "Course name must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  duration: z.string().min(2, "Duration must be at least 2 characters."),
  registrationDeadline: z.date({
    required_error: "Registration deadline is required.",
  }),
  fees: z.number().positive("Fees must be a positive number."),
  audience: z.string().min(2, "Audience must be at least 2 characters."),
  instructor: z.string().optional(),
  studentLimit: z
    .number()
    .int()
    .positive("Student limit must be a positive integer."),
  startingDate: z.date({
    required_error: "Starting date is required.",
  }),
  endingDate: z.date({
    required_error: "Ending date is required.",
  }),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { title: "Basic Info", icon: Book },
  { title: "Dates", icon: Calendar },
  { title: "Audience", icon: Users },
  { title: "Financials", icon: DollarSign },
  { title: "Finalize", icon: Clock },
];

export default function CreateCourse() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
      description: "",
      duration: "",
      fees: 0,
      audience: "",
      instructor: "",
      studentLimit: 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data, images);
      toast.success("Course created successfully!");
      router.push("/dashboard/admin/courses");
    } catch (error) {
      toast.error("Failed to create course. Please try again.");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Controller
              name="courseName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Course Name"
                  placeholder="Enter an exciting course name"
                  isInvalid={!!errors.courseName}
                  errorMessage={errors.courseName?.message}
                  startContent={<Book className="text-default-400" />}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  placeholder="Describe your amazing course"
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
                  placeholder="How long is your course?"
                  isInvalid={!!errors.duration}
                  errorMessage={errors.duration?.message}
                  startContent={<Clock className="text-default-400" />}
                />
              )}
            />
          </>
        );
      case 1:
        return (
          <>
            <Controller
              name="registrationDeadline"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="date"
                  label="Registration Deadline"
                  placeholder="When does registration close?"
                  value={
                    field.value instanceof Date
                      ? field.value.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => {
                    const dateValue = e.target.value
                      ? new Date(e.target.value)
                      : null;
                    field.onChange(dateValue);
                  }}
                  isInvalid={!!errors.registrationDeadline}
                  errorMessage={errors.registrationDeadline?.message}
                  startContent={<Calendar className="text-default-400" />}
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
                  placeholder="When does the course begin?"
                  value={
                    field.value instanceof Date
                      ? field.value.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => {
                    const dateValue = e.target.value
                      ? new Date(e.target.value)
                      : null;
                    field.onChange(dateValue);
                  }}
                  isInvalid={!!errors.startingDate}
                  errorMessage={errors.startingDate?.message}
                  startContent={<Calendar className="text-default-400" />}
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
                  placeholder="When does the course end?"
                  value={
                    field.value instanceof Date
                      ? field.value.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => {
                    const dateValue = e.target.value
                      ? new Date(e.target.value)
                      : null;
                    field.onChange(dateValue);
                  }}
                  isInvalid={!!errors.endingDate}
                  errorMessage={errors.endingDate?.message}
                  startContent={<Calendar className="text-default-400" />}
                />
              )}
            />
          </>
        );
      case 2:
        return (
          <>
            <Controller
              name="audience"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Target Audience"
                  placeholder="Who is this course for?"
                  value={typeof field.value === "string" ? field.value : ""} // Ensure only string
                  isInvalid={!!errors.audience}
                  errorMessage={errors.audience?.message}
                  startContent={<Target className="text-default-400" />}
                />
              )}
            />
            <Controller
              name="studentLimit"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  label="Student Limit"
                  placeholder="How many students can enroll?"
                  value={field.value?.toString() || ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  isInvalid={!!errors.studentLimit}
                  errorMessage={errors.studentLimit?.message}
                  startContent={<Users className="text-default-400" />}
                />
              )}
            />
            <Controller
              name="instructor"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Instructor (Optional)"
                  placeholder="Who's teaching this course?"
                  value={typeof field.value === "string" ? field.value : ""} // Ensure only string
                  startContent={<User className="text-default-400" />}
                />
              )}
            />
          </>
        );
      case 3:
        return (
          <Controller
            name="fees"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                label="Course Fees"
                placeholder="How much does the course cost?"
                value={field.value?.toString() || ""}
                onChange={(e) => field.onChange(Number(e.target.value))}
                isInvalid={!!errors.fees}
                errorMessage={errors.fees?.message}
                startContent={<DollarSign className="text-default-400" />}
              />
            )}
          />
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Course Summary</h3>
            <p>
              <strong>Name:</strong> {watch("courseName")}
            </p>
            <p>
              <strong>Description:</strong> {watch("description")}
            </p>
            <p>
              <strong>Duration:</strong> {watch("duration")}
            </p>
            <p>
              <strong>Dates:</strong>{" "}
              {watch("startingDate")
                ? new Date(watch("startingDate")).toLocaleDateString()
                : "N/A"}{" "}
              -{" "}
              {watch("endingDate")
                ? new Date(watch("endingDate")).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <strong>Registration Deadline:</strong>{" "}
              {watch("registrationDeadline")
                ? new Date(watch("registrationDeadline")).toLocaleDateString()
                : "N/A"}
            </p>

            <p>
              <strong>Audience:</strong> {watch("audience")}
            </p>
            <p>
              <strong>Student Limit:</strong> {watch("studentLimit")}
            </p>
            <p>
              <strong>Instructor:</strong>{" "}
              {watch("instructor") || "Not specified"}
            </p>
            <p>
              <strong>Fees:</strong> ${watch("fees")}
            </p>
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
                  You can upload multiple images for the course.
                </span>
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardBody className="p-6">
          <h2 className="text-3xl text-maroon font-bold mb-8">
            Create a New Course
          </h2>

          <div className="mb-6">
            <Progress
              value={(currentStep + 1) * (100 / steps.length)}
              className="max-w-md"
              color="primary"
            />
          </div>
          <div className="flex justify-between mb-6">
            {steps.map((step, index) => (
              <Tooltip key={step.title} content={step.title}>
                <Button
                  isIconOnly
                  color={index === currentStep ? "primary" : "default"}
                  variant={index === currentStep ? "solid" : "bordered"}
                  onPress={() => setCurrentStep(index)}
                >
                  <step.icon />
                </Button>
              </Tooltip>
            ))}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {renderStep()}
            <div className="flex justify-between mt-6">
              <Button
                color="default"
                variant="flat"
                onPress={prevStep}
                isDisabled={currentStep === 0}
              >
                Previous
              </Button>
              {currentStep === steps.length - 1 ? (
                <Button color="primary" type="submit">
                  Create Course
                </Button>
              ) : (
                <Button color="primary" onPress={nextStep}>
                  Next
                </Button>
              )}
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
