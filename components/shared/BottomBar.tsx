"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const BottomBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((v, i, a) => {
          // Active ?
          const isActive =
            (pathname.includes(v.route) && v.route.length > 1) ||
            pathname === v.route;
          return (
            <Link
              href={v.route}
              key={i}
              className={`bottombar_link
          ${isActive && "bg-blue"}
          `}
            >
              <Image src={v.imgURL} alt={v.label} width={22} height={22} />
              <p className="text-light-1 text-subtle-medium max-sm:hidden">
                {v.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BottomBar;
