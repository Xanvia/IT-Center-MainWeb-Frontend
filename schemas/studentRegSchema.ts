import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  fullName: z.string().min(2, { message: "Full name is required" }),
  nameWithIntials: z.string().min(2, { message: "Name with initials is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  nationalIdCardNo: z.string().min(5, { message: "National ID Card number is required" }),
  phoneNumber: z.string().min(10, { message: "Valid phone number is required" }),
  address: z.string().min(5, { message: "Permanent address is required" }),
  education: z.object({
    englishOL: z.string().min(1, { message: "Grade is required (ex: B)" }),
    mathematicsOL: z.string().min(1, { message: "Grade is required (ex: B)" }),
    scienceOL: z.string().min(1, { message: "Grade is required (ex: B)" }),
    aLevelResults: z.array(
      z.object({
        subject: z.string().min(1, { message: "Subject is required (ex: Chemistry)" }),
        grade: z.string().min(1, { message: "Grade is required (ex: B)" }),
      })
    ).min(4, { message: "At least 4 A-Level subjects are required" }),
  }),
  higherEdu: z.array(
    z.object({
      FOQualification: z.string().min(1, { message: "Qualification is required" }),
      date: z.string().min(1, { message: "Date awarded is required" }),
      institute: z.string().min(1, { message: "Institute is required" }),
    })
  ),
  otherQualification: z.string(),
  employment: z.object({
    institution: z.string().min(1, { message: "Institute is required" }),
    designation: z.string().min(1, { message: "Designation is required" }),
    officeAddress: z.string().min(1, { message: "Office address is required" }),
    officePhone: z.string().min(1, { message: "Office telephone is required" }),
  }),
});

export type StudentFormData = z.infer<typeof formSchema>;

