"use server";

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
