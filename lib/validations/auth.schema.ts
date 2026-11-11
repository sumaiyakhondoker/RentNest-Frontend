
import { z } from "zod";



export const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;


export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters."),
    email: z.email("Please enter a valid email address."),
    profileImage: z
  .union([
    z.literal(""),
    z.url("Please enter a valid profile picture URL."),
  ])
  .optional(),

phone: z
  .string()
  .trim()
  .refine((value) => value === "" || /^\d{11}$/.test(value), {
    message: "Phone number must contain exactly 11 digits.",
  })
  .optional(),
    role: z.enum(["TENANT", "LANDLORD"], {
      error: "Please choose Tenant or Landlord.",
    }),
    password: z
      .string()
      .min(7, "Password must be at least 7 characters."),
  })
  

export type RegisterFormValues = z.infer<typeof registerSchema>;
