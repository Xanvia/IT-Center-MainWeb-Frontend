"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StaffFormData, staffRegSchema } from "@/schemas/staffRegSchema";
import { Select, SelectItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import axios from "@/config/axios";
import { AxiosError } from "axios";
import { PlusCircle, MinusCircle } from "lucide-react";

export default function StaffRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const { data: session } = useSession();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<StaffFormData>({
    resolver: zodResolver(staffRegSchema),
    defaultValues: {
      emails: [""],
      telephones: [""],
      requestBy: "",
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
    fields: telephoneFields,
    append: appendTelephone,
    remove: removeTelephone,
  } = useFieldArray({
    control,
    name: "telephones",
  });

  const onSubmit = async (data: StaffFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);
    console.log("Form data:", data);

    // Ensure requestBy is set
    if (!data.requestBy && session?.user?.email) {
      data.requestBy = session.user.email;
    }

    try {
      const response = await axios.post("/staff-profile", data, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("API response:", response.data);
      setSubmitSuccess("Staff profile created successfully!");
      reset(); // Reset the form
      // Reset the email and telephone fields to have one empty field each
      setValue("emails", [""]);
      setValue("telephones", [""]);
    } catch (error) {
      console.error("API error:", error);
      if (error instanceof AxiosError) {
        console.error("Error response:", error.response?.data);
        setSubmitError(
          error.response?.data?.message ||
            "An error occurred while submitting the form."
        );
      } else {
        setSubmitError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      setValue("requestBy", session.user.email);
    }
  }, [session, setValue]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Staff Registration
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <select className="select select-bordered w-full" {...field}>
                  <option value="">Select a title</option>
                  {["DR", "MR", "MRS", "MISS", "REV"].map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.title && (
              <span className="text-error text-sm">{errors.title.message}</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Display Name</span>
            </label>
            <input
              {...register("displayName")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter your display name"
            />
            {errors.displayName && (
              <span className="text-error text-sm">
                {errors.displayName.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Designation</span>
            </label>
            <input
              {...register("designation")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter your designation"
            />
            {errors.designation && (
              <span className="text-error text-sm">
                {errors.designation.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Nominal</span>
            </label>
            <input
              {...register("nominal")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter your nominal"
            />
            {errors.nominal && (
              <span className="text-error text-sm">
                {errors.nominal.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Extension Number</span>
            </label>
            <input
              {...register("extNo")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter your extension number"
            />
            {errors.extNo && (
              <span className="text-error text-sm">{errors.extNo.message}</span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Emails</span>
            </label>
            {emailFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mb-2">
                <input
                  {...register(`emails.${index}`)}
                  type="email"
                  className="input input-bordered w-full flex-grow"
                  placeholder="Enter email address"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeEmail(index)}
                    className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <MinusCircle className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            {errors.emails && (
              <span className="text-error text-sm">
                {errors.emails.message}
              </span>
            )}
            {emailFields.length < 2 && (
              <button
                type="button"
                onClick={() => appendEmail("")}
                className="btn btn-primary btn-sm mt-2"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Email
              </button>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Telephones</span>
            </label>
            {telephoneFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mb-2">
                <input
                  {...register(`telephones.${index}`)}
                  type="tel"
                  className="input input-bordered w-full flex-grow"
                  placeholder="Enter telephone number"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeTelephone(index)}
                    className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <MinusCircle className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            {errors.telephones && (
              <span className="text-error text-sm">
                {errors.telephones.message}
              </span>
            )}
            {telephoneFields.length < 2 && (
              <button
                type="button"
                onClick={() => appendTelephone("")}
                className="btn btn-primary btn-sm mt-2"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Telephone
              </button>
            )}
          </div>
        </div>

        <input type="hidden" {...register("requestBy")} />

        {submitError && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
            role="alert"
          >
            <p className="font-bold">Error</p>
            <p>{submitError}</p>
          </div>
        )}

        {submitSuccess && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
            role="alert"
          >
            <p className="font-bold">Success</p>
            <p>{submitSuccess}</p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
