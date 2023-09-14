"use server";

import { revalidatePath } from "next/cache";
import Tweet from "../models/tweet.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Community from "../models/community.model";

interface CreateLikeParams {
  userInfoId: string;
  tweetId: string;
  path: string;
}

export async function createLike({
  userInfoId,
  tweetId,
  path,
}: CreateLikeParams) {
  try {
    connectToDB();

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      throw new Error("Tweet not found");
    }

    if (!tweet.likes.includes(userInfoId)) {
      tweet.likes.push(userInfoId);
      await tweet.save();
      const user = await User.findById(userInfoId);
      user.likes.push(tweetId);
      await user.save();
    } else {
      tweet.likes = tweet.likes.filter(
        (id: any) => id.toString() !== userInfoId
      );
      await tweet.save();
      const user = await User.findById(userInfoId);
      user.likes = user.likes.filter((id: any) => id.toString() !== tweetId);
      await user.save();
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to like Tweet: ${error.message}`);
  }
}

export async function getUserLikes(userInfoId: string) {
  try {
    connectToDB();

    const user = await User.findOne({ _id: userInfoId }).populate({
      path: "likes",
      select: "_id text author username",
      populate: {
        path: "author",
        select: "_id id",
      },
    });
    return user;
  } catch (error: any) {
    throw new Error(`Failed to fetch user likes : ${error.message}`);
  }
}

export async function fetchLikedPosts(tweetId: string) {
  try {
    connectToDB();
    // Find all tweets authored by the user with the given userId
    const tweets = await Tweet.find({ _id: tweetId }).populate([
      {
        path: "community",
        model: Community,
        select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
      },
      {
        path: "author",
        model: User,
        select: "name id image _id username", // Select the "name" and "_id" fields from the "Community" model
      },
      {
        path: "children",
        model: Tweet,
        populate: {
          path: "author",
          model: User,
          select: "name image id _id username", // Select the "name" and "_id" fields from the "User" model
        },
      },
    ]);
    return tweets;
  } catch (error: any) {
    throw new Error(`Failed to fetch user posts: ${error.message}`);
  }
}

// "use server";

// import Tweet from "../models/tweet.model";
// import User from "../models/user.model";
// import { connectToDB } from "../mongoose";

// interface CreateLikeParams {
//   author: string;
//   post: string;
// }

// export async function createLike({ author, post }: CreateLikeParams) {
//   try {
//     connectToDB();

//     const tweet = await Tweet.findById(post);

//     if (!tweet) {
//       throw new Error("Tweet not found");
//     }

//     if (!tweet.likes.includes(author)) {
//       tweet.likes.push(author);
//       await tweet.save();
//       const user = await User.findById(author);
//       user.likes.push(post);
//       await user.save();
//     } else {
//       tweet.likes = tweet.likes.filter((id: any) => id.toString() !== author);
//       await tweet.save();
//       const user = await User.findById(author);
//       user.likes = user.likes.filter((id: any) => id.toString() !== author);
//       await user.save();
//     }
//   } catch (error: any) {
//     throw new Error(`Failed to like Tweet: ${error.message}`);
//   }
// }
