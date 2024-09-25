import { z } from "zod";

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

export const staffSchema = z.object({
  title: z.string().min(1, "Title is required"),
  displayName: z.string().min(1, "Display name is required"),
  displayDesignation: z.string().min(1, "Display designation is required"),
  nominal: z.string().min(1, "Nominal is required"),
  extNumber: z.string().min(1, "Extension number is required"),

  emails: z
    .array(
      z.object({
        value: z.string().email("Invalid email address"),
      })
    )
    .min(1, "At least one email is required"),
  phoneNumbers: z
    .array(
      z.object({
        value: z.string().regex(phoneRegex, "Invalid phone number"),
      })
    )
    .min(1, "At least one phone number is required"),
});

export type StaffFormData = z.infer<typeof staffSchema>;
