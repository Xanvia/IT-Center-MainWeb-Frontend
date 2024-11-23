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
  Book,
  Users,
  DollarSign,
  Clock,
  Target,
  User,
  Heading6,
} from "lucide-react";
import toast from "react-hot-toast";

const formSchema = z.object({
  courseName: z.string().min(2, "Course name must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  duration: z.string().min(2, "Duration must be at least 2 characters."),
  fees: z.number().positive("Fees must be a positive number."),
  audience: z.string().min(2, "Audience must be at least 2 characters."),
  instructor: z.string().min(1, "Instructor name is required."),
  studentLimit: z
    .number()
    .int()
    .positive("Student limit must be a positive integer."),
  startingDate: z.string().min(1, "Starting date is required."),
  endingDate: z.string().min(1, "Ending date is required."),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { title: "Basic Info", icon: Book },
  { title: "Dates", icon: Clock },
  { title: "Audience", icon: Users },
  { title: "Financials", icon: DollarSign },
  { title: "Finalize", icon: Clock },
];

export default function CreateCourse() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [image, setImage] = useState<File | null>(null);
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
      startingDate: "",
      endingDate: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data, image);
      toast.success("Course created successfully!");
      router.push("/dashboard/admin/courses");
    } catch (error) {
      toast.error("Failed to create course. Please try again.");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
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
                  startContent={<Book className="text-default-400 w-4 h-4" />}
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
                  startContent={<Clock className="text-default-400 w-4 h-4" />}
                />
              )}
            />
          </>
        );
      case 1:
        return (
          <>
            <Controller
              name="startingDate"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Starting Date"
                  placeholder="DD-MM-YYYY"
                  isInvalid={!!errors.startingDate}
                  errorMessage={errors.startingDate?.message}
                  startContent={<Clock className="text-default-400 w-4 h-4" />}
                />
              )}
            />
            <Controller
              name="endingDate"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Ending Date"
                  placeholder="DD-MM-YYYY"
                  isInvalid={!!errors.endingDate}
                  errorMessage={errors.endingDate?.message}
                  startContent={<Clock className="text-default-400 w-4 h-4" />}
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
                  isInvalid={!!errors.audience}
                  errorMessage={errors.audience?.message}
                  startContent={<Target className="text-default-400 w-4 h-4" />}
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
                  isInvalid={!!errors.studentLimit}
                  errorMessage={errors.studentLimit?.message}
                  value={field.value.toString()} // Convert number to string
                  onChange={(e) => field.onChange(Number(e.target.value))} // Convert string back to number
                  startContent={<Users className="text-default-400 w-4 h-4" />}
                />
              )}
            />
            <Controller
              name="instructor"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Instructor"
                  placeholder="Who's teaching this course?"
                  isInvalid={!!errors.instructor}
                  errorMessage={errors.instructor?.message}
                  startContent={<User className="text-default-400 w-4 h-4" />}
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
                isInvalid={!!errors.fees}
                errorMessage={errors.fees?.message}
                value={field.value.toString()} // Convert number to string
                onChange={(e) => field.onChange(Number(e.target.value))} // Convert string back to number
                startContent={<h6 className="text-sm">Rs. </h6>}
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
              <strong>Dates:</strong> {watch("startingDate")} -{" "}
              {watch("endingDate")}
            </p>
            <p>
              <strong>Audience:</strong> {watch("audience")}
            </p>
            <p>
              <strong>Student Limit:</strong> {watch("studentLimit")}
            </p>
            <p>
              <strong>Instructor:</strong> {watch("instructor")}
            </p>
            <p>
              <strong>Fees:</strong> Rs. {watch("fees")}.00
            </p>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Course Image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full"
              />
              <label className="label">
                <span className="label-text-alt">
                  Upload an image for the course.
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
              color="default"
              classNames={{
                indicator: "bg-maroon",
              }}
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
                  className={
                    index === currentStep ? "bg-maroon text-white" : ""
                  }
                >
                  <step.icon
                    className={index === currentStep ? "text-white" : ""}
                  />
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
                <Button
                  color="primary"
                  type="submit"
                  className="bg-maroon text-white"
                >
                  Create Course
                </Button>
              ) : (
                <Button
                  color="primary"
                  onPress={nextStep}
                  className="bg-maroon text-white"
                >
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
