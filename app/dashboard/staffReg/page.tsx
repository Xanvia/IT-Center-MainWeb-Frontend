"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { PlusIcon, TrashIcon } from "lucide-react";
import { StaffFormData, staffSchema } from "@/schemas/staffSchema";

// move validation schema into different file in student reg
// remove designation selection and make it a text input
// limit emails and phones upto maximum 3 from frontend
// Add profile picture section

export default function StaffRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StaffFormData>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      emails: [{ value: "" }],
      phoneNumbers: [{ value: "" }],
    },
  });

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control,
    name: "emails",
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: "phoneNumbers",
  });

  const onSubmit = async (data: StaffFormData) => {
    setIsSubmitting(true);
    // Here you would typically send the data to your API
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
    setIsSubmitting(false);
    alert("Staff member registered successfully!");
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
              <span className="label-text">Designation</span>
            </label>
            <Controller
              name="designation"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select designation"
                  className="w-full"
                  errorMessage={errors.designation?.message}
                >
                  <SelectItem key="manager" value="manager">
                    Manager
                  </SelectItem>
                  <SelectItem key="developer" value="developer">
                    Developer
                  </SelectItem>
                  <SelectItem key="designer" value="designer">
                    Designer
                  </SelectItem>
                  <SelectItem key="hr" value="hr">
                    HR
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
              name="extNumber"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter extension number"
                  errorMessage={errors.extNumber?.message}
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
                  name={`emails.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter email address"
                      errorMessage={errors.emails?.[index]?.value?.message}
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
            <Button
              type="button"
              onClick={() => appendEmail({ value: "" })}
              color="primary"
              className="mt-2"
            >
              <PlusIcon className="h-4 w-4 mr-2" /> Add Email
            </Button>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Numbers</span>
            </label>
            {phoneFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mb-2">
                <Controller
                  name={`phoneNumbers.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter phone number"
                      errorMessage={
                        errors.phoneNumbers?.[index]?.value?.message
                      }
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
            <Button
              type="button"
              onClick={() => appendPhone({ value: "" })}
              color="primary"
              className="mt-2"
            >
              <PlusIcon className="h-4 w-4 mr-2" /> Add Phone Number
            </Button>
          </div>

          <Button
            type="submit"
            color="success"
            className="w-full"
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Submit Registration"}
          </Button>
        </form>
      </div>
    </div>
  );
}
