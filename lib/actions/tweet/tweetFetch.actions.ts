"use server";

import Community from "@/lib/models/community.model";
import Tweet from "@/lib/models/tweet.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";

export async function fetchTweets(pageNumber = 1, pageSize = 20) {
  connectToDB();

  //number of posts to skip
  const skipAmount = (pageNumber - 1) * pageSize;
  //
  const postQuery = Tweet.find({ parentId: { $in: [null, undefined] } })
    .sort({
      createdAt: "desc",
    })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalPostCount = await Tweet.countDocuments({
    parentId: { $in: [null, undefined] },
  });
  const posts = await postQuery.exec(); // execute
  const isNext = totalPostCount > skipAmount + posts.length;
  return { posts, isNext };
}

export async function fetchTweetById(tweetId: string) {
  connectToDB();

  try {
    const tweet = await Tweet.findById(tweetId)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      }) // Populate the author field with _id and username
      // .populate({
      //   path: "community",
      //   model: Community,
      //   select: "_id id name image",
      // }) // Populate the community field with _id and name
      .populate({
        path: "children", // Populate the children field
        populate: [
          {
            path: "author", // Populate the author field within children
            model: User,
            select: "_id id name parentId image", // Select only _id and username fields of the author
          },
          {
            path: "children", // Populate the children field within children
            model: Tweet, // The model of the nested children (assuming it's the same "Thread" model)
            populate: {
              path: "author", // Populate the author field within nested children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
          },
        ],
      })
      .exec();

    return tweet;
  } catch (err) {
    console.error("Error while fetching tweet:", err);
    throw new Error("Unable to fetch tweet");
  }
}
