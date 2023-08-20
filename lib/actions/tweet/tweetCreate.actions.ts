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

export async function addCommentToTweet(
  tweetId: string,
  commentText: string,
  userId: string,
  path: string
) {
  try {
    connectToDB();

    // Find original tweet by its id
    const originalTweet = await Tweet.findById(tweetId);

    // If original tweet does not exist
    if (!originalTweet) {
      throw new Error("Thread not found");
    }

    // Create the new comment tweet
    const commentTweet = new Tweet({
      text: commentText,
      author: userId,
      parentId: tweetId, // Set the parentId to the original Tweet's ID
    });

    // Save the comment tweet to the database
    const savedCommentTweet = await commentTweet.save();

    // Add the comment tweet's ID to the original tweet's children array
    originalTweet.children.push(savedCommentTweet._id);

    // Save the updated original thread to the database
    await originalTweet.save();

    // Server Refresh
    revalidatePath(path);
  } catch (err) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }
}
