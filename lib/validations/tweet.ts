import * as z from "zod";

export const TweetValidation = z.object({
  tweet: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  accountId: z.string(),
  image: z.string().url().optional().nullable(),
});

export const CommentValidation = z.object({
  tweet: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  image: z.string().url().optional().nullable(),
});
