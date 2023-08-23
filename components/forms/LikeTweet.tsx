"use client";
import { createLike } from "@/lib/actions/like.actions";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";

type LikeTweet = {
  tweetId: string;
  userInfoId: string;
};

const LikeTweet = async ({ tweetId, userInfoId }: LikeTweet) => {
  const [loading, setLoading] = useState(false);
  const path = usePathname();

  return (
    <button
      className="hover:text-red-700 transition-all ease-out duration-200"
      onClick={async () => {
        try {
          setLoading(false);
          await createLike({ tweetId, userInfoId });
        } catch (error) {
          console.log("error likes: likeTweet Components");
        } finally {
          setLoading(true);
        }
      }}
    >
      <AiOutlineHeart></AiOutlineHeart>
    </button>
  );
};

export default LikeTweet;
