"use server";

import { revalidatePath } from "next/cache";
import User from "@/lib/models/user.model";
import { connectToDB } from "../../mongoose";

// Update User
interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}
export async function updateUser({
  userId,
  name,
  username,
  image,
  bio,
  path,
}: Params): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true } // database operation that will update an existing row if a specified value already exists in a table, and insert a new row if the specified value doesn't already exist.May 8, 2023
    );

    if (path === "/profile/edit") {
      revalidatePath(path); // server Refresh
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
