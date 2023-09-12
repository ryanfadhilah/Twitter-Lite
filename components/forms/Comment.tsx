"use client";

import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { CommentValidation } from "@/lib/validations/tweet";
import { addCommentToTweet } from "@/lib/actions/tweet/tweetCreate.actions";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import { RiLoader4Fill, RiLoader5Fill } from "react-icons/ri";
import { TbPhoto } from "react-icons/tb";
import { PiXLight } from "react-icons/pi";
import { Textarea } from "../ui/textarea";
// import { addCommentToTweet } from "@/lib/actions/thread.actions";

interface Props {
  tweetId: string;
  currentUserImg: string;
  currentUserId: string;
}

function Comment({ tweetId, currentUserImg, currentUserId }: Props) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  // Collect & Manipulate form data / state
  const [files, setFiles] = useState<File[]>([]);

  // Upload Image Hook: Upload thing
  const { startUpload } = useUploadThing("media");

  // Handle Form Input (Image)
  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string | null) => void
  ) => {
    e.preventDefault();
    if (e.target.files?.length == 0) {
      console.log("no image");
      fieldChange(null);

      return;
    } else if (e.target.files && e.target.files.length > 0) {
      console.log("start inserting image");
      const fileReader = new FileReader();
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      console.log(files);

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      console.log("image inserted");
      fileReader.readAsDataURL(file);
    }
  };

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      tweet: "",
      image: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    try {
      setLoading(true);
      if (!values.image) {
        // No image provided, proceed without uploading an image
        console.log("no image");
        await addCommentToTweet(
          tweetId,
          values.tweet,
          JSON.parse(currentUserId),
          pathname,
          values.image ? values.image : null
        );

        console.log("uploading tweets");
      } else if (isBase64Image(values.image)) {
        // Image is base64-encoded, proceed with image upload logic
        const imageResponse = await startUpload(files!);
        if (imageResponse && imageResponse[0].fileUrl) {
          values.image = imageResponse[0].fileUrl;
        }
        console.log("uploading image");
        await addCommentToTweet(
          tweetId,
          values.tweet,
          JSON.parse(currentUserId),
          pathname,
          values.image ? values.image : null
        );
        console.log("uploading tweets");
      }
    } catch (error) {
    } finally {
      setLoading(false);
      form.reset(); // reset() : method from react hook form, forced to be used by shadcn
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" mt-10 flex flex-col justify-start gap-8"
      >
        <FormField
          control={form.control}
          name="tweet"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              {/* <FormLabel className="text-base-semibold text-light-2">
              Content
            </FormLabel> */}
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea
                  placeholder="What is Happening?!"
                  className=" border-none bg-transparent"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex-col items-center gap-2">
              <FormLabel className="w-full">
                {field.value ? (
                  <div className="w-full h-fit relative flex-col items-center gap-5 ">
                    <Image
                      src={field.value}
                      alt="profile_icon"
                      width={96}
                      height={96}
                      priority
                      className="w-full rounded-2xl"
                    />
                    <button
                      className=" absolute top-1 right-1 bg-black/50 p-2 rounded-full "
                      onClick={(e) => {
                        e.preventDefault();
                        form.resetField("image");
                      }}
                    >
                      <PiXLight className=" shrink-0 text-white " />
                    </button>
                  </div>
                ) : (
                  <div className=" flex w-full justify-end items-center gap-5 border-t-2 pt-5 border-dark-4">
                    <TbPhoto className="shrink-0 cursor-pointer text-blue text-heading3-bold" />
                    <Button
                      type="submit"
                      className=" bg-blue hover:bg-gray-700 transition-all ease-in duration-200 w-[80px] rounded-full"
                    >
                      {loading ? (
                        <div className="relative w-fit h-[24px] animate-spin">
                          <RiLoader5Fill className=" shrink-0 text-heading3-bold " />
                          <RiLoader4Fill className=" shrink-0 text-heading3-bold absolute bottom-0 text-white/30" />
                        </div>
                      ) : (
                        "Reply"
                      )}
                    </Button>
                  </div>
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/**"
                  placeholder="Upload a photo"
                  className="hidden"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleImage(e, field.onChange)
                  }
                />
              </FormControl>
              <FormMessage />
              {field.value ? (
                <div
                  className=" sticky bottom-0 border-t-2 border-dark-4 bg-dark-1 flex justify-end
              mt-5 pt-5 pb-[84px]
              md:pb-[120px]"
                >
                  <Button
                    type="submit"
                    className=" bg-sky-500 hover:bg-gray-700 transition-all ease-in duration-200 w-[80px] rounded-full"
                  >
                    {loading ? (
                      <div className="relative w-fit h-[24px] animate-spin">
                        <RiLoader5Fill className=" shrink-0 text-heading3-bold " />
                        <RiLoader4Fill className=" shrink-0 text-heading3-bold absolute bottom-0 text-white/30" />
                      </div>
                    ) : (
                      "Reply"
                    )}
                  </Button>
                </div>
              ) : (
                ""
              )}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default Comment;
