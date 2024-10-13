import { z } from "zod";

export const signInSchema = z.object({
  siteVisible: z.boolean(),
});
