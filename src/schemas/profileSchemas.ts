import { z } from "zod";

// Common fields for both personal and organization users
export const personalProfileSchema = z.object({
  about: z.string().optional(),
  favoriteQuote: z.string().min(2, {message: "quote or thoughts must be atleast 2 character"}).max(50,{message: "quote or thoughts must not exceed 50 character"}).optional(),
  socialMediaLinks: z
    .array(
      z.object({
        platform: z.string(),
        platform_username: z.string(),
      })
    )
    .optional(),
  profilePhoto: z.string().url({ message: "Invalid URL" }).optional(),
  gender: z.enum(["male", "female"]).optional(),
  occupation: z.string().optional(), // This is relevant for personal accounts
  image: z.string().url({ message: "Invalid URL" }).optional(),
  location: z.string().min(2, {message: "location must be at least 2 characters"}),
});


