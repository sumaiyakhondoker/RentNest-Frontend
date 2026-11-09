
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
    phone: z
      .string()
      .trim()
      .refine((value) => value === "" || value.length === 11, {
        message: "Phone number must contain exactly 11 characters.",
      }),
    role: z.enum(["TENANT", "LANDLORD"], {
      error: "Please choose Tenant or Landlord.",
    }),
    password: z
      .string()
      .min(7, "Password must be at least 7 characters."),
  })
  

export type RegisterFormValues = z.infer<typeof registerSchema>;
