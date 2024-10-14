import * as z from "zod";

export const staffRegSchema = z.object({
  displayName: z.string().min(1, { message: "Display name is required" }),
  designation: z.string().min(1, { message: "Designation is required" }),
  nominal: z.string().min(1, { message: "Nominal is required" }),
  extNo: z.string().min(1, { message: "Extension number is required" }),
  emails: z
    .array(
      z.object({
        value: z.string().email({ message: "Invalid email address" }),
      })
    )
    .min(1, { message: "At least one email is required" })
    .max(2, { message: "You can provide up to two email addresses" }),
  telephones: z
    .array(
      z.object({
        value: z
          .string()
          .regex(/^\d{10}$/, { message: "Invalid phone number" }),
      })
    )
    .min(1, { message: "At least one telephone number is required" })
    .max(2, { message: "You can provide up to two telephone numbers" }),
});

export type StaffFormData = z.infer<typeof staffRegSchema>;