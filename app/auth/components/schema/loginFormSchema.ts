import { z } from "zod";
import { passwordSchema } from "./registerFormSchema";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is reqiured")
    .email({ message: "Invalid email address" }),
  password: passwordSchema,
});

export type loginSchemaType = z.infer<typeof loginSchema>;
