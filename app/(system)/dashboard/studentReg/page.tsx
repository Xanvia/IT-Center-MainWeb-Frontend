"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { StudentFormData, formSchema } from "@/schemas/studentRegSchema";
import { DefaultStudentRegValues } from "@/CONSTANT_DATA/studentRegDefault";
import axios from "@/config/axios";
import { signOut, useSession } from "next-auth/react";
import { delay } from "@/utils/common";
import { toast } from "@/hooks/use-toast";

type OLSubject = "englishOL" | "mathematicsOL" | "scienceOL";
const OLSub: OLSubject[] = ["englishOL", "mathematicsOL", "scienceOL"];

export default function StudentRegistrationForm() {
  const { data: session } = useSession();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: DefaultStudentRegValues,
  });

  const {
    fields: higherEduFields,
    append: appendHigherEdu,
    remove: removeHigherEdu,
  } = useFieldArray({
    control,
    name: "higherEdu",
  });

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/signin" });
  };

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: StudentFormData) => {
    console.log(data);

    try {
      setLoading(true);
      const response = await axios.post("/user/convert/student", data, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Student registered successfully!",
        });
        handleSignOut();
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        console.error("Server response:", response.data);
      }
    } catch (error: any) {
      console.error("Error registering student:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("user", file);
      try {
        setLoading(true);
        const response = await axios.post("/user/upload-img", formData, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        const imageUrl = response.data.path;
        if (imageUrl) {
          toast({
            title: "Success",
            description: "Image Uploaded Successfully!",
          });
          await delay(3000);
          setPhotoPreview(process.env.NEXT_PUBLIC_BACKEND_URL + "/" + imageUrl);
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        }
      } catch (error: any) {
        console.error("Student registration image upload error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);

        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "There was a problem with your request.";
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: `Failed to upload image: ${errorMessage}`,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 max-w-4xl mx-auto p-4"
    >
      <div className="card bg-base-100 shadow-xl">
        <h1 className="text-2xl font-bold my-4 text-center">
          Student Registration
        </h1>

        {/* Personal Details */}
        <div className="card-body">
          <h2 className="card-title text-xl font-bold">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <select className="select select-bordered w-full" {...field}>
                    <option value="">Select a title</option>
                    {["REV", "MR", "MISS", "MRS", "DR"].map((title) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                  {errors.title && (
                    <span className="text-error text-sm">
                      {errors.title.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="fullName"
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
                  {errors.fullName && (
                    <span className="text-error text-sm">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="nameWithIntials"
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
                  {errors.nameWithIntials && (
                    <span className="text-error text-sm">
                      {errors.nameWithIntials.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date of Birth</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    {...field}
                  />
                  {errors.dateOfBirth && (
                    <span className="text-error text-sm">
                      {errors.dateOfBirth.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="nationalIdCardNo"
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
                  {errors.nationalIdCardNo && (
                    <span className="text-error text-sm">
                      {errors.nationalIdCardNo.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="phoneNumber"
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
                  {errors.phoneNumber && (
                    <span className="text-error text-sm">
                      {errors.phoneNumber.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Postal Address</span>
                  </label>
                  <textarea
                    placeholder="Enter your permanent address"
                    className="textarea textarea-bordered w-full"
                    {...field}
                  />
                  {errors.address && (
                    <span className="text-error text-sm">
                      {errors.address.message}
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
              disabled={loading}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="file-input file-input-bordered w-full"
            />
            {photoPreview && (
              <div className="mt-4">
                <Image
                  src={photoPreview || "/placeholder.svg"}
                  alt="Profile Photo"
                  width={100}
                  height={100}
                  className="rounded-lg h-28 w-auto"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Education Qualification */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl font-bold">
            Educational Qualifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">GCE Ordinary Level</h3>
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {OLSub.map((subject) => (
                    <tr key={subject}>
                      <td>{subject.replace("OL", "")}</td>
                      <td>
                        <Controller
                          name={`education.${subject}`}
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
              <h3 className="text-lg font-semibold mb-4">GCE Advanced Level</h3>
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {/* 
                  {aLevelResultsFields.map((field, index) => (
                    <tr key={field.id}> 
                    */}
                  {watch("education.aLevelResults").map((_, index) => (
                    <tr key={index}>
                      <td>
                        <Controller
                          name={`education.aLevelResults.${index}.subject`}
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
                          name={`education.aLevelResults.${index}.grade`}
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
          </div>
        </div>
      </div>

      {/* Higher Educational Qualifications */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl font-bold">
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
              {higherEduFields.map((field, index) => (
                <tr key={field.id}>
                  <td>
                    <Controller
                      name={`higherEdu.${index}.FOQualification`}
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
                      name={`higherEdu.${index}.date`}
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
                      name={`higherEdu.${index}.institute`}
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
                      className="btn btn-error btn-sm text-white"
                      onClick={() => removeHigherEdu(index)}
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
            className="btn btn-primary w-full mt-4 bg-maroon hover:bg-gray-600 border-maroon hover:border-gray-700 text-white"
            onClick={() =>
              appendHigherEdu({
                FOQualification: "",
                date: "",
                institute: "",
              })
            }
          >
            Add Qualification
          </button>
        </div>
      </div>

      {/* Other Qualifications */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl font-bold">Other Qualifications</h2>
          <Controller
            name="otherQualification"
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

      {/* Employment Details */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl font-bold">Employment Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="employment.institution"
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
                  {errors.employment?.institution && (
                    <span className="text-error text-sm">
                      {errors.employment.institution.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="employment.designation"
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
                  {errors.employment?.designation && (
                    <span className="text-error text-sm">
                      {errors.employment.designation.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="employment.officeAddress"
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
                  {errors.employment?.officeAddress && (
                    <span className="text-error text-sm">
                      {errors.employment.officeAddress.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="employment.officePhone"
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
                  {errors.employment?.officePhone && (
                    <span className="text-error text-sm">
                      {errors.employment.officePhone.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      </div>

      <button
        disabled={loading}
        type="submit"
        className="btn btn-primary w-full bg-maroon hover:bg-gray-600 border-maroon hover:border-gray-700 text-white"
      >
        Submit Registration
      </button>
    </form>
  );
}
