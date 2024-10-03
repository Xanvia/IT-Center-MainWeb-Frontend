"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { PlusIcon, TrashIcon } from "lucide-react";
import { StaffFormData, staffSchema } from "@/schemas/staffRegSchema";
import { useRouter } from "next/navigation";

export default function StaffRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StaffFormData>({
    resolver: zodResolver(staffSchema),
    // defaultValues: {
    //   emails: [""],
    //   telephones: [""],
    // },
  });

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    name: "emails",
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    name: "telephones",
  });

  const onSubmit = async (data: StaffFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3001/staff-profile", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });
      console.log(JSON.stringify(data));
      if (!response.ok) {
        throw new Error(`Failed to submit: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);
      alert("Request Sent Successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Staff Registration
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select title"
                  className="w-full"
                  errorMessage={errors.title?.message}
                >
                  <SelectItem key="dr" value="DR">
                    Dr
                  </SelectItem>
                  <SelectItem key="mr" value="MR">
                    Mr
                  </SelectItem>
                  <SelectItem key="mrs" value="MRS">
                    Mrs
                  </SelectItem>
                  <SelectItem key="miss" value="MISS">
                    Miss
                  </SelectItem>
                  <SelectItem key="dev" value="REV">
                    Dev
                  </SelectItem>
                </Select>
              )}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Display Name</span>
            </label>
            <Controller
              name="displayName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter display name"
                  errorMessage={errors.displayName?.message}
                />
              )}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Designation</span>
            </label>
            <Controller
              name="designation"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter display designation"
                  errorMessage={errors.designation?.message}
                />
              )}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Nominal</span>
            </label>
            <Controller
              name="nominal"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter nominal"
                  errorMessage={errors.nominal?.message}
                />
              )}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Extension Number</span>
            </label>
            <Controller
              name="extNo"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter extension number"
                  errorMessage={errors.extNo?.message}
                />
              )}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email Addresses</span>
            </label>
            {emailFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mb-2">
                <Controller
                  name={`emails.${index}`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter email address"
                      errorMessage={errors.emails?.[index]?.message}
                      className="flex-grow"
                    />
                  )}
                />
                {index > 0 && (
                  <Button
                    type="button"
                    onClick={() => removeEmail(index)}
                    color="danger"
                    isIconOnly
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {emailFields.length < 2 && (
              <Button
                type="button"
                onClick={() => appendEmail({ value: "" })}
                color="primary"
                className="mt-2"
              >
                <PlusIcon className="h-4 w-4 mr-2" /> Add Email
              </Button>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Numbers</span>
            </label>
            {phoneFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mb-2">
                <Controller
                  name={`telephones.${index}`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter phone number"
                      errorMessage={errors.telephones?.[index]?.message}
                      className="flex-grow"
                    />
                  )}
                />
                {index > 0 && (
                  <Button
                    type="button"
                    onClick={() => removePhone(index)}
                    color="danger"
                    isIconOnly
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {phoneFields.length < 2 && (
              <Button
                type="button"
                onClick={() => appendPhone({ value: "" })}
                color="primary"
                className="mt-2"
              >
                <PlusIcon className="h-4 w-4 mr-2" /> Add Phone Number
              </Button>
            )}
          </div>

          <Button
            type="submit"
            color="success"
            className="w-full bg-red-900 hover:bg-gray-600 text-white"
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Submit Registration"}
          </Button>
        </form>
      </div>
    </div>
  );
}
