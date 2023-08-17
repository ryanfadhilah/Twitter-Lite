"use client";

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((v, i, a) => {
          // Active ?
          const isActive =
            (pathname.includes(v.route) && v.route.length > 1) ||
            pathname === v.route;
          return (
            <Link
              href={v.route}
              key={i}
              className={`leftsidevar_link
            ${isActive && ""}
            `}
            >
              <Image src={v.imgURL} alt={v.label} width={22} height={22} />
              <p className="text-light-1 max-lg:hidden">{v.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default LeftSidebar;
