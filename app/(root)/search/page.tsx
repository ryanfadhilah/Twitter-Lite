import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { fetchUser } from "@/lib/actions/user/userFetch.actions";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <section>
      search
      <h1 className="head-text mb-10">Search</h1>
    </section>
  );
}

export default Page;
