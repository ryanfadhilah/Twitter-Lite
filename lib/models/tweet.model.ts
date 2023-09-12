import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  image: {
    type: String,
  },
});

const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);

export default Tweet;

// 1 Parent Tweet can have multiple Children Tweet
// in Case, This Comment/Tweet "have another" Comments/Tweet inside  (Replied Tweet)
// Then this Comment/Tweet will become the new Parent
// LOGIC Recursion
//-> Tweet Person (A) Parent (A)
//    -> Tweet Person (B) Children (A)
//    -> Tweet Person (C) Children (A) & Parent (C)
//       -> Tweet Person (B) Children (C)
//       -> Tweet Person (C) Children (C)
//       -> Tweet Person (A) Children (C) & Parent (A)
//           -> Tweet Person (E) Children (A)
//           -> Tweet Person (F) Children (A)
//           -> Tweet Person (G) Children (A)
