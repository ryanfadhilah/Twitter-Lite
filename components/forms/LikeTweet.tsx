"use client";
import { createLike } from "@/lib/actions/like.actions";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RiLoaderFill } from "react-icons/ri";

type LikeTweet = {
  tweetId: string;
  userInfoId: string;
  className?: string;
  likes: boolean;
};

const LikeTweet = ({ tweetId, userInfoId, className, likes }: LikeTweet) => {
  const [loading, setLoading] = useState(false);
  const path = usePathname();
  const router = useRouter();

  return (
    <button
      className={`${
        className
          ? className
          : "hover:text-red-700 transition-all ease-out duration-200"
      }`}
      onClick={async () => {
        try {
          setLoading(true);
          await createLike({ tweetId, userInfoId, path });
          router.refresh();
        } catch (error) {
          console.log("error likes: likeTweet Components");
        } finally {
          setLoading(false);
        }
      }}
    >
      {loading ? (
        <RiLoaderFill className="animate-spin" />
      ) : likes ? (
        <AiFillHeart className="text-red-700"></AiFillHeart>
      ) : (
        <AiOutlineHeart />
      )}
    </button>
  );
};

export default LikeTweet;
