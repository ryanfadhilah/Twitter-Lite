"use server";
import Community from "@/lib/models/community.model";
import Tweet from "@/lib/models/tweet.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    // https://www.geeksforgeeks.org/mongoose-populate-method/
    // Need of Population: Whenever in the schema of one collection we provide a reference (in any field) to a document from any other collection, we need a populate() method to fill the field with that document.
    return await User.findOne({ id: userId });
    // .populate({
    //   path: "communities",
    //   model: Community,
    // });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function fetchUserTweets(userId: string) {
  try {
    connectToDB();

    // Find all tweets authored by the user with the given userId
    const tweets = await User.findOne({ id: userId }).populate({
      path: "tweets",
      model: Tweet,
      populate: [
        {
          path: "community",
          model: Community,
          select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
        },
        {
          path: "children",
          model: Tweet,
          populate: {
            path: "author",
            model: User,
            select: "name image id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });
    return tweets;
  } catch (error) {
    console.error("Error fetching user tweets:", error);
    throw error;
  }
}
