"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StaffFormData, staffRegSchema } from "@/schemas/staffRegSchema";
import { useSession } from "next-auth/react";
import axios from "@/config/axios";
import { AxiosError } from "axios";
import { PlusCircle, MinusCircle } from "lucide-react";
import { delay } from "@/utils/common";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import Axios from "@/config/axios";

export default function StaffRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
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
      emails: [{ email: "" }],
      telephones: [{ telephone: "" }],
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

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);
    console.log("Form data:", data);

    // Ensure requestBy is set
    if (!data.requestBy && session?.user?.email) {
      data.requestBy = session.user.email;
    }

    // change email and telephone object array to string arrays
    data.emails = data.emails.map((email: any) => email.email);
    data.telephones = data.telephones.map(
      (telephone: any) => telephone.telephone
    );

    try {
      const response = await Axios.post("/staff-profile", data, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("API response:", response.data);
      toast({
        title: "Success",
        description: "Staff Registeration Request Sent successfully!",
      });
      reset(); // Reset the form
      router.push("/dashboard");
    } catch (error) {
      console.error("API error:", error);
      if (error instanceof AxiosError) {
        console.error("Error response:", error.response?.data);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            error.response?.data?.message ||
            "An error occurred while submitting the form.",
        });
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
          toast({
            title: "Success",
            description: "Image uploaded successfully!",
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
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center pb-8">
        Staff Registration
      </h1>
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

        <div className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Emails</span>
            </label>
            {emailFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mb-2">
                <input
                  {...register(`emails.${index}.email`)}
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
                onClick={() => appendEmail({ email: "" })}
                className="btn btn-primary btn-sm mt-2 bg-maroon hover:bg-gray-600 border-maroon hover:border-gray-700 text-white"
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
                  {...register(`telephones.${index}.telephone`)}
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
                onClick={() => appendTelephone({ telephone: "" })}
                className="btn btn-primary btn-sm mt-2 bg-maroon hover:bg-gray-600 border-maroon hover:border-gray-700 text-white"
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
            className="btn btn-primary w-full bg-maroon hover:bg-gray-600 border-maroon hover:border-gray-700 text-white"
          >
            {isSubmitting ? "Submitting..." : "Submit Registration"}
          </button>
        </div>
      </form>
    </div>
  );
}
