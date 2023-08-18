import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

const page = async () => {
  // MongoDB
  const userInfo = {};
  // Clerk
  const user = await currentUser();
  // Combined Clerk & MongoDB
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
