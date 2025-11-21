import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "password must have 6 characters"),
});

export const registerSchema = z.object({
  fullname: z.string().min(6, "name should have atleast 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "phone number must have 10 digits"),
  password: z.string().min(6, "password must have 6 characters"),
});
