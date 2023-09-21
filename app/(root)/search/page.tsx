import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import UserCard from "@/components/cards/UserCard";

import Pagination from "@/components/shared/Pagination";
import { fetchUser, fetchUsers } from "@/lib/actions/user/userFetch.actions";
import Searchbar from "@/components/shared/Searchbar";

// import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";

export const metadata = {
  title: "BluBird - Search",
};

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <Searchbar routeType="search" />

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <div className="w-full text-center text-heading1-bold mt-5 text-blue/50">
            <p>No Result</p>
          </div>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>

      <Pagination
        path="search"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
  );
}

export default Page;
