import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string(), // Can be username or email
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
