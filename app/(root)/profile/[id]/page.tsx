import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user/userFetch.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";

import { profileTabs } from "@/constants";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiFillTags, AiOutlineMessage, AiOutlineTwitter } from "react-icons/ai";
import TweetsTab from "@/components/shared/TweetsTab";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

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
                {tab.label === "Tagged" && <AiFillTags />}
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Tweets" && (
                  <p className="ml-1 rounded-sm bg-slate-800 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo.tweets.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1"
            >
              {/* @ts-ignore */}
              <TweetsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
export default Page;
