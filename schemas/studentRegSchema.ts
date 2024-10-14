import { z } from "zod";

export const formSchema = z.object({
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

export type FormData = z.infer<typeof formSchema>;
