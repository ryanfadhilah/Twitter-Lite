import * as z from "zod";

export const userValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: "Minimum 3 character" })
    .max(30, { message: "Maximum 30 character" }),
  userName: z
    .string()
    .min(3, { message: "Minimum 3 character" })
    .max(100, { message: "Maximum 100 character" }),
});
