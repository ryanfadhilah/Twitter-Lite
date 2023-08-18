"use client";

import { sidebarLinks } from "@/constants";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AiOutlineCloseSquare, AiOutlineCheckSquare } from "react-icons/ai";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6 ">
        {sidebarLinks.map((v, i, a) => {
          // Active ?
          const isActive =
            (pathname.includes(v.route) && v.route.length > 1) ||
            pathname === v.route;
          return (
            <Link
              href={v.route}
              key={i}
              className={`leftsidebar_link hover:bg-gray-700 transition-all ease-out duration-500
            ${isActive && "bg-blue"}
            `}
            >
              <Image src={v.imgURL} alt={v.label} width={22} height={22} />
              <p className="text-light-1 max-lg:hidden">{v.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-5">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex items-center cursor-pointer text-small-regular gap-1">
              <AiOutlineCloseSquare className="text-white"></AiOutlineCloseSquare>
              <p className="text-light-1 ">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
