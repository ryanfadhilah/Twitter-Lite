import { fetchUserTweets } from "@/lib/actions/user/userFetch.actions";
import { redirect } from "next/navigation";
import TweetCard from "../cards/TweetCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

// import { fetchCommunityPosts } from "@/lib/actions/community.actions";
// import { fetchUserPosts } from "@/lib/actions/user.actions";

// import ThreadCard from "../cards/ThreadCard";

interface Result {
  name: string;
  image: string;
  id: string;
  tweets: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
    likes: string[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
  userInfoId: string;
}

async function TweetsTab({
  currentUserId,
  accountId,
  accountType,
  userInfoId,
}: Props) {
  let result: Result;

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserTweets(accountId);
  }
  if (!result) redirect("/");

  return (
    // <div>Tweets Tab</div>
    <section className="mt-9 flex flex-col gap-10">
      {result.tweets.map((v) => (
        <TweetCard
          key={v._id}
          id={v._id}
          currentUserId={currentUserId}
          parentId={v.parentId}
          content={v.text}
          userInfoId={userInfoId}
          likes={v.likes}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: v.author.name,
                  image: v.author.image,
                  id: v.author.id,
                }
          }
          community={
            accountType === "Community"
              ? { name: result.name, id: result.id, image: result.image }
              : v.community
          }
          createdAt={v.createdAt}
          comments={v.children}
        />
      ))}
    </section>
  );
}

export default TweetsTab;
