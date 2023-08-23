"use server";

import { revalidatePath } from "next/cache";
import Tweet from "../models/tweet.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

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
