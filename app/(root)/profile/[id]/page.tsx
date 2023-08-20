import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user/userFetch.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";

import { profileTabs } from "@/constants";

// import ThreadsTab from "@/components/shared/ThreadsTab";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    </section>
  );
}
export default Page;
