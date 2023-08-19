"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { TweetValidation } from "@/lib/validations/tweet";
import { createTweet } from "@/lib/actions/tweet/tweetCreate.actions";
import { useState } from "react";
// import { createTweet } from "@/lib/actions/tweet.actions";

interface Props {
  userId: string;
}

function PostTweet({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof TweetValidation>>({
    resolver: zodResolver(TweetValidation),
    defaultValues: {
      tweet: "",
      accountId: userId,
    },
  });

  // Back-End / Server Action
  const onSubmit = async (values: z.infer<typeof TweetValidation>) => {
    setLoading(true);
    try {
      await createTweet({
        text: values.tweet,
        author: userId,
        communityId: organization ? organization.id : null,
        path: pathname,
      });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="tweet"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={10} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-blue">
          {loading ? "Loading" : "Post Tweet"}
        </Button>
      </form>
    </Form>
  );
}

export default PostTweet;
