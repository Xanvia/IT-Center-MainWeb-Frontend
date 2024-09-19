"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

const formSchema = z.object({
  personalDetails: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    fullName: z.string().min(2, { message: "Full name is required" }),
    nameWithInitials: z
      .string()
      .min(2, { message: "Name with initials is required" }),
    nationalIdCardNo: z
      .string()
      .min(5, { message: "National ID Card number is required" }),
    phoneNumber: z
      .string()
      .min(10, { message: "Valid phone number is required" }),
    postalAddress: z.string().min(5, { message: "Postal address is required" }),
    photo: z.any().optional(),
  }),
  educationalQualifications: z.object({
    olevel: z.object({
      english: z.string().min(1, { message: "Grade is required" }),
      mathematics: z.string().min(1, { message: "Grade is required" }),
      science: z.string().min(1, { message: "Grade is required" }),
    }),
    alevel: z
      .array(
        z.object({
          subject: z.string().min(1, { message: "Subject is required" }),
          grade: z.string().min(1, { message: "Grade is required" }),
        })
      )
      .min(4, { message: "At least 4 A-Level subjects are required" }),
  }),
  higherEducationalQualifications: z.array(
    z.object({
      qualification: z
        .string()
        .min(1, { message: "Qualification is required" }),
      dateAwarded: z.string().min(1, { message: "Date awarded is required" }),
      institute: z.string().min(1, { message: "Institute is required" }),
    })
  ),
  otherQualifications: z.string(),
  employmentDetails: z.object({
    institute: z.string().min(1, { message: "Institute is required" }),
    designation: z.string().min(1, { message: "Designation is required" }),
    officeAddress: z.string().min(1, { message: "Office address is required" }),
    officeTelephone: z
      .string()
      .min(1, { message: "Office telephone is required" }),
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function StudentRegistrationForm() {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalDetails: {
        title: "",
        fullName: "",
        nameWithInitials: "",
        nationalIdCardNo: "",
        phoneNumber: "",
        postalAddress: "",
        photo: null,
      },
      educationalQualifications: {
        olevel: {
          english: "",
          mathematics: "",
          science: "",
        },
        alevel: [
          { subject: "", grade: "" },
          { subject: "", grade: "" },
          { subject: "", grade: "" },
          { subject: "", grade: "" },
        ],
      },
      higherEducationalQualifications: [
        { qualification: "", dateAwarded: "", institute: "" },
      ],
      otherQualifications: "",
      employmentDetails: {
        institute: "",
        designation: "",
        officeAddress: "",
        officeTelephone: "",
      },
    },
  });

  const {
    fields: higherEducationFields,
    append: appendHigherEducation,
    remove: removeHigherEducation,
  } = useFieldArray({
    control,
    name: "higherEducationalQualifications",
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setValue("personalDetails.photo", file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 max-w-4xl mx-auto p-4"
      >
        <div className="card bg-base-100 shadow-xl">
          <h1 className="text-3xl font-bold my-6 text-center">
            Student Registration
          </h1>
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="personalDetails.title"
                control={control}
                render={({ field }) => (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      {...field}
                    >
                      <option value="">Select a title</option>
                      {["Rev", "Mr", "Ms", "Mrs", "Dr", "Prof"].map((title) => (
                        <option key={title} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>
                    {errors.personalDetails?.title && (
                      <span className="text-error text-sm">
                        {errors.personalDetails.title.message}
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                name="personalDetails.fullName"
                control={control}
                render={({ field }) => (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="input input-bordered w-full"
                      {...field}
                    />
                    {errors.personalDetails?.fullName && (
                      <span className="text-error text-sm">
                        {errors.personalDetails.fullName.message}
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                name="personalDetails.nameWithInitials"
                control={control}
                render={({ field }) => (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name with Initials</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name with initials"
                      className="input input-bordered w-full"
                      {...field}
                    />
                    {errors.personalDetails?.nameWithInitials && (
                      <span className="text-error text-sm">
                        {errors.personalDetails.nameWithInitials.message}
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                name="personalDetails.nationalIdCardNo"
                control={control}
                render={({ field }) => (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">National ID Card No</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your National ID Card number"
                      className="input input-bordered w-full"
                      {...field}
                    />
                    {errors.personalDetails?.nationalIdCardNo && (
                      <span className="text-error text-sm">
                        {errors.personalDetails.nationalIdCardNo.message}
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                name="personalDetails.phoneNumber"
                control={control}
                render={({ field }) => (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone Number</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="input input-bordered w-full"
                      {...field}
                    />
                    {errors.personalDetails?.phoneNumber && (
                      <span className="text-error text-sm">
                        {errors.personalDetails.phoneNumber.message}
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                name="personalDetails.postalAddress"
                control={control}
                render={({ field }) => (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Postal Address</span>
                    </label>
                    <textarea
                      placeholder="Enter your postal address"
                      className="textarea textarea-bordered w-full"
                      {...field}
                    />
                    {errors.personalDetails?.postalAddress && (
                      <span className="text-error text-sm">
                        {errors.personalDetails.postalAddress.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Profile Photo</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="file-input file-input-bordered w-full"
              />
              {photoPreview && (
                <div className="mt-4">
                  <Image
                    src={photoPreview}
                    alt="Profile Photo"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">
              Educational Qualifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  GCE Ordinary Level
                </h3>
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["english", "mathematics", "science"].map((subject) => (
                      <tr key={subject}>
                        <td>
                          {subject.charAt(0).toUpperCase() + subject.slice(1)}
                        </td>
                        <td>
                          <Controller
                            name={`educationalQualifications.olevel.${subject}`}
                            control={control}
                            render={({ field }) => (
                              <input
                                type="text"
                                placeholder="Grade"
                                className="input input-bordered w-full"
                                {...field}
                              />
                            )}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  GCE Advanced Level
                </h3>
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {watch("educationalQualifications.alevel").map(
                      (_, index) => (
                        <tr key={index}>
                          <td>
                            <Controller
                              name={`educationalQualifications.alevel.${index}.subject`}
                              control={control}
                              render={({ field }) => (
                                <input
                                  type="text"
                                  placeholder="Subject"
                                  className="input input-bordered w-full"
                                  {...field}
                                />
                              )}
                            />
                          </td>
                          <td>
                            <Controller
                              name={`educationalQualifications.alevel.${index}.grade`}
                              control={control}
                              render={({ field }) => (
                                <input
                                  type="text"
                                  placeholder="Grade"
                                  className="input input-bordered w-full"
                                  {...field}
                                />
                              )}
                            />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">
              Higher Educational Qualifications
            </h2>
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Qualification</th>
                  <th>Date Awarded</th>
                  <th>Institute</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {higherEducationFields.map((field, index) => (
                  <tr key={field.id}>
                    <td>
                      <Controller
                        name={`higherEducationalQualifications.${index}.qualification`}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="text"
                            placeholder="Qualification"
                            className="input input-bordered w-full"
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        name={`higherEducationalQualifications.${index}.dateAwarded`}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="date"
                            className="input input-bordered w-full"
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        name={`higherEducationalQualifications.${index}.institute`}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="text"
                            placeholder="Institute"
                            className="input input-bordered w-full"
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-error btn-sm"
                        onClick={() => removeHigherEducation(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              className="btn btn-primary mt-4"
              onClick={() =>
                appendHigherEducation({
                  qualification: "",
                  dateAwarded: "",
                  institute: "",
                })
              }
            >
              Add Qualification
            </button>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">
              Other Qualifications
            </h2>
            <Controller
              name="otherQualifications"
              control={control}
              render={({ field }) => (
                <div className="form-control">
                  <textarea
                    placeholder="Enter any other qualifications..."
                    className="textarea textarea-bordered w-full h-32"
                    {...field}
                  />
                </div>
              )}
            />
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">
              Employment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="employmentDetails.institute"
                control={control}
                render={({ field }) => (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Institute</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your institute"
                      className="input input-bordered w-full"
                      {...field}
                    />
                    {errors.employmentDetails?.institute && (
                      <span className="text-error text-sm">
                        {errors.employmentDetails.institute.message}
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                name="employmentDetails.designation"
                control={control}
                render={({ field }) => (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Designation</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your designation"
                      className="input input-bordered w-full"
                      {...field}
                    />
                    {errors.employmentDetails?.designation && (
                      <span className="text-error text-sm">
                        {errors.employmentDetails.designation.message}
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                name="employmentDetails.officeAddress"
                control={control}
                render={({ field }) => (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Office Address</span>
                    </label>
                    <textarea
                      placeholder="Enter your office address"
                      className="textarea textarea-bordered w-full"
                      {...field}
                    />
                    {errors.employmentDetails?.officeAddress && (
                      <span className="text-error text-sm">
                        {errors.employmentDetails.officeAddress.message}
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                name="employmentDetails.officeTelephone"
                control={control}
                render={({ field }) => (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Office Telephone</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your office telephone"
                      className="input input-bordered w-full"
                      {...field}
                    />
                    {errors.employmentDetails?.officeTelephone && (
                      <span className="text-error text-sm">
                        {errors.employmentDetails.officeTelephone.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit Registration
        </button>
      </form>
    </>
  );
}
