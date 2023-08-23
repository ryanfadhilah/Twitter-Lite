"use server";
import TweetCard from "@/components/cards/TweetCard";
import { fetchTweets } from "@/lib/actions/tweet/tweetFetch.actions";
import { fetchUser } from "@/lib/actions/user/userFetch.actions";
import { UserButton, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const result = await fetchTweets(1, 30);
  // Clerk
  const user = await currentUser();

  if (!user) return null;

  // Mongo DB
  const userInfo = await fetchUser(user.id);

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((v) => (
              <TweetCard
                key={v._id}
                id={v._id}
                currentUserId={user?.id || ""}
                parentId={v.parentId}
                content={v.text}
                author={v.author}
                community={v.community}
                createdAt={v.createdAt}
                comments={v.children}
                userInfoId={userInfo._id}
              />
            ))}
          </>
        )}
      </section>

      {/* <Pagination
    path='/'
    pageNumber={searchParams?.page ? +searchParams.page : 1}
    isNext={result.isNext}
  /> */}
    </>
  );
}
