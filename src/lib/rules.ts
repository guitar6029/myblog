import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Please enter a valid email" })
      .min(6)
      .max(50)
      .trim(),
    password: z.string().min(8).max(50).trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
