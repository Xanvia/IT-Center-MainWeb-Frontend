"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  StudentFormData as FORMdata,
  formSchema,
} from "@/schemas/studentRegSchema";
import { DefaultStudentRegValues } from "@/constants/studentRegDefault";
import toast, { Toaster } from "react-hot-toast";
import Axios from "@/config/axios";
import { useSession } from "next-auth/react";
import { delay } from "@/utils/common";

type OLSubject = "englishOL" | "mathematicsOL" | "scienceOL";
const OLSub: OLSubject[] = ["englishOL", "mathematicsOL", "scienceOL"];

export default function StudentRegistrationForm() {
  const { data: session } = useSession();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FORMdata>({
    resolver: zodResolver(formSchema),
    defaultValues: DefaultStudentRegValues,
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

  const onSubmit = async (data: FORMdata) => {
    // continue the function
    // here check the data in browser console and match it with backend dto.
    // test the flow and make sure there will be a student user in database
    // extra: delete the user (old one) after successfully created the student

    console.log(data);

    try {
      // Send the form data to the backend
      const response = await Axios.post("/user/convert/student", data, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        toast("Student registered successfully!");

        // Optionally, delete the old user after successful registration
        /*await Axios.delete(`/user/${data.oldUserId}`, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
  
        toast("Old user deleted successfully!");*/
      } else {
        toast("Failed to register student.");
      }
    } catch (error) {
      console.error("Error registering student:", error);
      toast("An error occurred while registering the student.");
    }
  };

  // upload profile image
  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files;
    if (file) {
      const formData = new FormData();
      formData.append("user", file[0]);
      try {
        //axios use instead of fetch
        const response = await Axios.post("/user/upload-img", formData, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        const imageUrl = response.data.path;
        console.log(imageUrl);
        if (imageUrl) {
          toast("Profile Picture Uploaded Successfully!");
          await delay(3000);
          setPhotoPreview(process.env.NEXT_PUBLIC_BACKEND_URL + "/" + imageUrl);
        } else {
          toast("Profile Picture Upload Failed. Try Again!");
        }
      } catch (error) {
        toast("Profile Picture Upload Failed. Try Again!");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 max-w-4xl mx-auto p-4"
      >
        <Toaster />
        <div className="card bg-base-100 shadow-xl">
          <h1 className="text-2xl font-bold my-4 text-center">
            Student Registration
          </h1>
          {/* Personal Details  */}
          <div className="card-body">
            <h2 className="card-title text-xl font-bold">Personal Details</h2>
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
                      {["Rev", "Mr", "Miss", "Mrs", "Dr"].map((title) => (
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
                name="personalDetails.dateOfBirth"
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
                    {errors.personalDetails?.dateOfBirth && (
                      <span className="text-error text-sm">
                        {errors.personalDetails.dateOfBirth.message}
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
                name="personalDetails.address"
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
                    {errors.personalDetails?.address && (
                      <span className="text-error text-sm">
                        {errors.personalDetails.address.message}
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
                    className="rounded-lg h-28 w-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Education Qualification  */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl font-bold">
              Educational Qualifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">
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
                    {OLSub.map((subject) => (
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
                <h3 className="text-lg font-semibold mb-4">
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
                {higherEducationFields.map((field, index) => (
                  <tr key={field.id}>
                    <td>
                      <Controller
                        name={`higherEducationalQualifications.${index}.FOQualification`}
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
                        name={`higherEducationalQualifications.${index}.date`}
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
                        className="btn btn-error btn-sm text-white"
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
              className="btn btn-primary w-full bg-maroon hover:bg-gray-600 border-maroon hover:border-gray-700 text-white"
              onClick={() =>
                appendHigherEducation({
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

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl font-bold">
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
            <h2 className="card-title text-xl font-bold">Employment Details</h2>
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
                name="employmentDetails.officePhone"
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
                    {errors.employmentDetails?.officePhone && (
                      <span className="text-error text-sm">
                        {errors.employmentDetails.officePhone.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full bg-maroon hover:bg-gray-600 border-maroon hover:border-gray-700 text-white"
        >
          Submit Registration
        </button>
      </form>
    </>
  );
}
