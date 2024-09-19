import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

const reTypePasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long");

export const registerSchema = z
  .object({
    username: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(1, "Email is reqiured")
      .email({ message: "Invalid email address" }),
    password: passwordSchema,
    rePassword: reTypePasswordSchema,
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type registerSchemaType = z.infer<typeof registerSchema>;
