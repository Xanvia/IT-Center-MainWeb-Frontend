"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StaffFormData, staffRegSchema } from "@/schemas/staffRegSchema";
import { Select, SelectItem } from "@nextui-org/react";

export default function StaffRegistrationForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StaffFormData>({
    resolver: zodResolver(staffRegSchema),
    defaultValues: {
      emails: [{ value: "" }],
      telephones: [{ value: "" }],
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

  // State for success or error messages
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: StaffFormData) => {
    setIsSubmitting(true); // Disable the submit button during submission
    setMessage(null); // Reset message state before submission

    try {
      const response = await fetch("http://localhost:3001/staff-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Handle error response (e.g., validation errors, server errors)
        const errorMessage = `Failed to submit: ${response.statusText}`;
        setMessage(errorMessage);
        console.error(errorMessage);
        setIsSubmitting(false); // Re-enable submit button
        return;
      }

      // Assuming the API returns a success message or created resource data
      const result = await response.json();
      console.log("Staff registration successful:", result);
      setMessage("Staff registration successful!");

      // You can add additional logic here, like resetting the form
    } catch (error) {
      // Handle any network errors
      console.error("An error occurred during submission:", error);
      setMessage("An error occurred during submission.");
    } finally {
      setIsSubmitting(false); // Re-enable submit button
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 max-w-4xl mx-auto p-4"
    >
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center pb-8">
            Staff Registration
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <Select
                    {...field}
                    placeholder="Select a title"
                    className="max-w-xs"
                  >
                    <SelectItem key="DR" value="DR">
                      DR
                    </SelectItem>
                    <SelectItem key="MR" value="MR">
                      MR
                    </SelectItem>
                    <SelectItem key="MRS" value="MRS">
                      MRS
                    </SelectItem>
                    <SelectItem key="MISS" value="MISS">
                      MISS
                    </SelectItem>
                    <SelectItem key="REV" value="REV">
                      REV
                    </SelectItem>
                  </Select>
                  {errors.title && (
                    <span className="text-error text-sm">
                      {errors.title.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="displayName"
              control={control}
              render={({ field }) => (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Display Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter display name"
                    className="input input-bordered w-full"
                    {...field}
                  />
                  {errors.displayName && (
                    <span className="text-error text-sm">
                      {errors.displayName.message}
                    </span>
                  )}
                </div>
              )}
            />

            <Controller
              name="designation"
              control={control}
              render={({ field }) => (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Designation</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter designation"
                    className="input input-bordered w-full"
                    {...field}
                  />
                  {errors.designation && (
                    <span className="text-error text-sm">
                      {errors.designation.message}
                    </span>
                  )}
                </div>
              )}
            />

            <Controller
              name="nominal"
              control={control}
              render={({ field }) => (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nominal</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter nominal"
                    className="input input-bordered w-full"
                    {...field}
                  />
                  {errors.nominal && (
                    <span className="text-error text-sm">
                      {errors.nominal.message}
                    </span>
                  )}
                </div>
              )}
            />

            <Controller
              name="extNo"
              control={control}
              render={({ field }) => (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Extension Number</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter extension number"
                    className="input input-bordered w-full"
                    {...field}
                  />
                  {errors.extNo && (
                    <span className="text-error text-sm">
                      {errors.extNo.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>

          <div className="mt-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            {emailFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mb-2">
                <Controller
                  name={`emails.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <div className="form-control flex-grow">
                      <input
                        {...field}
                        type="email"
                        placeholder={`Enter email address ${index + 1}`}
                        className="input input-bordered w-full"
                      />
                      {errors.emails?.[index]?.value && (
                        <span className="text-error text-sm">
                          {errors.emails[index].value.message}
                        </span>
                      )}
                    </div>
                  )}
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="btn btn-error btn-sm text-white"
                    onClick={() => removeEmail(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {emailFields.length < 2 && (
              <button
                type="button"
                className="btn btn-primary btn-sm mt-2 bg-maroon hover:bg-gray-600 border-maroon hover:border-gray-700 text-white"
                onClick={() => appendEmail({ value: "" })}
              >
                Add Email
              </button>
            )}
          </div>

          <div className="mt-4">
            <label className="label">
              <span className="label-text">Telephone</span>
            </label>
            {telephoneFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mb-2">
                <Controller
                  name={`telephones.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <div className="form-control flex-grow">
                      <input
                        {...field}
                        type="tel"
                        placeholder={`Enter telephone number ${index + 1}`}
                        className="input input-bordered w-full"
                      />
                      {errors.telephones?.[index]?.value && (
                        <span className="text-error text-sm">
                          {errors.telephones[index].value.message}
                        </span>
                      )}
                    </div>
                  )}
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="btn btn-error btn-sm text-white"
                    onClick={() => removeTelephone(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {telephoneFields.length < 2 && (
              <button
                type="button"
                className="btn btn-primary btn-sm mt-2 bg-maroon hover:bg-gray-600 border-maroon hover:border-gray-700 text-white"
                onClick={() => appendTelephone({ value: "" })}
              >
                Add Telephone
              </button>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full bg-maroon hover:bg-gray-600 border-maroon hover:border-gray-700 text-white"
        disabled={isSubmitting} // Disable button while submitting
      >
        {isSubmitting ? "Submitting..." : "Submit Registration"}
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </form>
  );
}
