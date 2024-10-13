import {z} from "zod"

export const personalProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    about: z.string().optional(),
    favoriteQuote: z.string().optional(),
    socialMediaLinks: z.array(
      z.object({
        platform: z.string(),
        link: z.string().url({ message: "Invalid URL" }),
      })
    ).optional(),
    profilePhoto: z.string().url({ message: "Invalid URL" }).optional(),
    gender: z.enum(["male", "female", "non-binary", "other"]).optional(),
    occupation: z.string().optional(),
  });
  
  export const organizationProfileSchema = z.object({
    teamName: z.string().min(2, "Team name must be at least 2 characters"),
    designation: z.string().min(2, "Designation must be at least 2 characters"),
    department: z.string().optional(),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]).optional(),
  });
  