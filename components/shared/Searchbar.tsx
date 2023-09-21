"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "../ui/input";
import { RiSearchLine } from "react-icons/ri";

interface Props {
  routeType: string;
}

function Searchbar({ routeType }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // query after 0.3s of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/${routeType}?q=` + search);
      } else {
        router.push(`/${routeType}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType]);

  return (
    <div className="flex items-center gap-1 rounded-sm bg-dark-3 px-4 py-2 group">
      <RiSearchLine className="text-5xl text-blue" />
      <Input
        id="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`${
          routeType !== "search" ? "Search communities" : "Search creators"
        }`}
        className="no-focus searchbar_input text-blue placeholder:text-sky-800 placeholder:italic"
      />
    </div>
  );
}

export default Searchbar;
