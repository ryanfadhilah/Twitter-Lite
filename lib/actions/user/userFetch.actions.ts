"use server"
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
