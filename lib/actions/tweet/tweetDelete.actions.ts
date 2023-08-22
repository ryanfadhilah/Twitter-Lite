"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../../mongoose";

import User from "../../models/user.model";
import Tweet from "../../models/tweet.model";
import Community from "@/lib/models/community.model";
// import Community from "../models/community.model";

async function fetchAllChildTweets(tweetId: string): Promise<any[]> {
  const childTweets = await Tweet.find({ parentId: tweetId });

  const descendantTweets = [];
  for (const childTweet of childTweets) {
    const descendants = await fetchAllChildTweets(childTweet._id);
    descendantTweets.push(childTweet, ...descendants);
  }

  return descendantTweets;
}

export async function deleteTweet(id: string, path: string): Promise<void> {
  try {
    connectToDB();

    // Find the tweet to be deleted (the main tweet)
    const mainTweet = await Tweet.findById(id).populate("author community");

    if (!mainTweet) {
      throw new Error("Tweet not found");
    }

    // Fetch all child Tweets and their descendants recursively
    const descendantTweets = await fetchAllChildTweets(id);

    // Get all descendant tweet IDs including the main tweet ID and child tweet IDs
    const descendantTweetIds = [
      id,
      ...descendantTweets.map((tweet) => tweet._id),
    ];

    // Extract the authorIds and communityIds to update User and Community models respectively
    const uniqueAuthorIds = new Set(
      [
        ...descendantTweets.map((tweet) => tweet.author?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainTweet.author?._id?.toString(),
      ].filter((id) => id !== undefined)
    );

    const uniqueCommunityIds = new Set(
      [
        ...descendantTweets.map((tweet) => tweet.community?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainTweet.community?._id?.toString(),
      ].filter((id) => id !== undefined)
    );

    // Recursively delete child tweets and their descendants
    await Tweet.deleteMany({ _id: { $in: descendantTweetIds } });

    // Update User model
    await User.updateMany(
      { _id: { $in: Array.from(uniqueAuthorIds) } },
      { $pull: { tweets: { $in: descendantTweetIds } } }
    );

    // Update Community model
    await Community.updateMany(
      { _id: { $in: Array.from(uniqueCommunityIds) } },
      { $pull: { tweets: { $in: descendantTweetIds } } }
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete tweet: ${error.message}`);
  }
}
