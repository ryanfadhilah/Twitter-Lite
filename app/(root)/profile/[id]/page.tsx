import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import {
  fetchUser,
  fetchUserTweetActivity,
} from "@/lib/actions/user/userFetch.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";

import { profileTabs } from "@/constants";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiFillTags, AiOutlineMessage, AiOutlineTwitter } from "react-icons/ai";
import TweetsTab from "@/components/shared/TweetsTab";
import Link from "next/link";
import { Metadata } from "next";

// Metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const userInfo = await fetchUser(params.id);

  return {
    title: `${userInfo.name} - BlueBird`,
    description: `${userInfo.bio}`,
    openGraph: {
      images: [{ url: userInfo.image }],
    },
  };
}

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;
  // Mongo DB
  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const activity = await fetchUserTweetActivity(userInfo._id);

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id} // Selected Profile
        authUserId={user.id} // User (the one who select)
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="tweets" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab ">
                {tab.label === "Tweets" && <AiOutlineTwitter />}
                {tab.label === "Replies" && <AiOutlineMessage />}
                {tab.label === "Liked" && <AiFillTags />}
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Tweets" && (
                  <p className="ml-1 rounded-sm bg-slate-800 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo.tweets.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={"tweets"} className="w-full text-light-1">
            {/* @ts-ignore */}
            <TweetsTab
              currentUserId={user.id}
              accountId={userInfo.id}
              accountType="User"
              userInfoId={userInfo._id}
            />
          </TabsContent>
          <TabsContent value={"replies"} className="w-full text-light-1">
            <>
              <section className="mt-10 flex flex-col gap-5">
                {activity.length > 0 ? (
                  <>
                    {activity.map((activity) => (
                      <Link
                        key={activity._id}
                        href={`/tweet/${activity.parentId}`}
                      >
                        <article className="activity-card">
                          <Image
                            src={activity.author.image}
                            alt="user_logo"
                            width={20}
                            height={20}
                            className="rounded-full object-cover"
                          />
                          <p className="!text-small-regular text-light-1">
                            <span className="mr-1 text-blue">
                              {activity.author.name}
                            </span>{" "}
                            replied to your tweet
                          </p>
                        </article>
                      </Link>
                    ))}
                  </>
                ) : (
                  <p className="!text-base-regular text-light-3">
                    No activity yet
                  </p>
                )}
              </section>
            </>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
export default Page;
