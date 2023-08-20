import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user/userFetch.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const page = async () => {
  // Get user Data from clerk
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  // Get User Data from MongoDB
  const userInfo = await fetchUser(user.id);

  // If user has been onboarded once
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user?.id,
    objectId: userInfo._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete you profile now to use Tweeter
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} buttonTitle={"Continue"} />
      </section>
    </main>
  );
};

export default page;
