"use server";
import TweetCard from "@/components/cards/TweetCard";
import Pagination from "@/components/shared/Pagination";
import { fetchTweets } from "@/lib/actions/tweet/tweetFetch.actions";
import { fetchUser } from "@/lib/actions/user/userFetch.actions";
import { UserButton, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // Clerk
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Mongo DB
  const userInfo = await fetchUser(user.id);

  if (!user) {
    redirect("/sign-in");
  }

  const result = await fetchTweets(
    searchParams.page ? +searchParams.page : 1,
    5
  );

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No Tweets found</p>
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
                likes={v.likes}
                userInfoId={userInfo._id}
                image={v.image}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}
