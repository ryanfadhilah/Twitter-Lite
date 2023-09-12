import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user/userFetch.actions";
import TweetCard from "@/components/cards/TweetCard";

import Comment from "@/components/forms/Comment";
import { fetchTweetById } from "@/lib/actions/tweet/tweetFetch.actions";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const tweet = await fetchTweetById(params.id);

  return (
    <section className="relative">
      <div>
        <TweetCard
          id={tweet._id}
          currentUserId={user.id}
          parentId={tweet.parentId}
          content={tweet.text}
          author={tweet.author}
          community={tweet.community}
          createdAt={tweet.createdAt}
          comments={tweet.children}
          userInfoId={userInfo._id}
          likes={tweet.likes}
          image={tweet.image}
        />
      </div>

      <div className="mt-7">
        <Comment
          tweetId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {tweet.children.map((childItem: any) => (
          <TweetCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment // rather than making another REPLIED TWEET CARD
            userInfoId={userInfo._id}
            likes={childItem.likes}
            image={childItem.image}
          />
        ))}
      </div>
    </section>
  );
}

export default page;
