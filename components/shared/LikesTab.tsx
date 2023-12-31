import TweetCard from "../cards/TweetCard";
import { fetchLikedPosts } from "@/lib/actions/like.actions";
import { TbMessage2Heart } from "react-icons/tb";

type TweetsTabProps = {
  accountId: string;
  userInfoId: string;
  isDelete: string;
};

export default async function LikesTab({
  accountId,
  userInfoId,
  isDelete,
}: TweetsTabProps) {
  const result = await fetchLikedPosts(accountId);

  if (!result || result.length < 1)
    return (
      <div className="w-full text-center text-heading1-bold text-blue/50 mt-10 pt-5">
        <p>No Likes</p>
      </div>
    );

  return (
    <section className=" mt-9 flex flex-col gap-10">
      {result.map((v: any) => (
        <TweetCard
          key={v._id}
          id={v._id}
          currentUserId={v.author.id}
          parentId={v.parentId}
          content={v.text}
          author={{
            name: v.author.name,
            image: v.author.image,
            id: v.author.id,
          }}
          community={v.community}
          createdAt={v.createdAt}
          comments={v.children}
          image={v.image}
          userInfoId={userInfoId}
          likes={v.likes}
          isDelete={isDelete}
        />
      ))}
    </section>
  );
}
