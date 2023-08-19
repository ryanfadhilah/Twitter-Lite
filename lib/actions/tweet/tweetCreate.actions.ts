"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../../mongoose";

import User from "../../models/user.model";
import Tweet from "../../models/tweet.model";
// import Community from "../models/community.model";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}
export async function createTweet({ text, author, communityId, path }: Params) {
  try {
    // Connect -> Create DB Tweet -> Update DB Tweet
    connectToDB();
    const createdTweet = await Tweet.create({ text, author, community: null });
    await User.findByIdAndUpdate(author, {
      $push: { tweets: createdTweet._id },
    });
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
  // try {
  //   connectToDB();
  //   const communityIdObject = await Community.findOne(
  //     { id: communityId },
  //     { _id: 1 }
  //   );
  //   const createdTweet = await Tweet.create({
  //     text,
  //     author,
  //     community: communityIdObject, // Assign communityId if provided, or leave it null for personal account
  //   });
  //   // Update User model
  //   await User.findByIdAndUpdate(author, {
  //     $push: { threads: createdThread._id },
  //   });
  //   if (communityIdObject) {
  //     // Update Community model
  //     await Community.findByIdAndUpdate(communityIdObject, {
  //       $push: { threads: createdThread._id },
  //     });
  //   }
  //   revalidatePath(path);
  // } catch (error: any) {
  //   throw new Error(`Failed to create thread: ${error.message}`);
  // }
}
