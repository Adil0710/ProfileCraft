import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username should not exceed 20 characters")
  .regex(/^(?!.*[^\w_]).*$/, "Special characters and space not allowed");


  export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .optional(), // Password optional for OAuth users
    accountType: z.enum(["personal", "organization"]),
    name: z.string().min(1, "Name is required"), // Ensure 'name' is provided
  });
  