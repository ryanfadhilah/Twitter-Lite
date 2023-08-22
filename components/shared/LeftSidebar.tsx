"use client";

import { sidebarLinks } from "@/constants";
import {
  OrganizationSwitcher,
  SignOutButton,
  SignedIn,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AiOutlineCloseSquare, AiOutlineCheckSquare } from "react-icons/ai";
import { ImTwitter } from "react-icons/im";
import { dark } from "@clerk/themes";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6 ">
        <Link href={"/"} className="flex items-center gap-4">
          <ImTwitter className="text-blue shrink-0 sm:text-heading3-bold"></ImTwitter>
          <p className="text-heading3-bold text-light-1 max-xs:hidden">
            Blue Bird
          </p>
        </Link>
        {sidebarLinks.map((v, i, a) => {
          // Active ?
          const isActive =
            (pathname.includes(v.route) && v.route.length > 1) ||
            pathname === v.route;

          if (v.route === "/profile") {
            v.route = `${v.route}/${userId}`;
          }

          return (
            <Link
              href={v.route}
              key={i}
              className={`leftsidebar_link hover:bg-zinc-800 transition-all ease-out duration-200
            ${isActive && "bg-blue"}
            `}
            >
              <Image src={v.imgURL} alt={v.label} width={23} height={23} />
              <p className="text-light-1 max-lg:hidden">{v.label}</p>
            </Link>
          );
        })}
      </div>

      {/* <div
        className="relative flex justify-start gap-4 rounded-lg px-5 py-2
       items-center hover:bg-zinc-800 transition-all ease-out duration-200"
      >
        <UserButton></UserButton>
        <p className="text-light-1 max-lg:hidden text-small-regular">
          ryan fadhilah
        </p>
      </div> */}

      <div className="flex items-center justify-center">
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>

      {/* <div className="mt-10 px-5">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex items-center cursor-pointer text-small-regular gap-1">
              <AiOutlineCloseSquare className="text-white"></AiOutlineCloseSquare>
              <p className="text-light-1 ">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div> */}
    </section>
  );
};

export default LeftSidebar;
