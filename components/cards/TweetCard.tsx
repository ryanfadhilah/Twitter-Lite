import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
import DeleteTweet from "../forms/DeleteTweet";
import LikeTweet from "../forms/LikeTweet";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  likes: string[];
  userInfoId: string;
}

const TweetCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment, // rather than making another REPLIED TWEET CARD
  likes,
  userInfoId,
}: Props) => {
  return (
    <article
      className={`flex w-full flex-col rounded-sm ${
        isComment ? "px-0 xs:px-7" : "bg-zinc-950 p-7" // rather than making another REPLIED TWEET CARD
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`${isComment && "mb-10"} mt-3 flex flex-col gap-3`}>
              <div className="flex gap-5 text-slate-400 text-heading4-medium">
                <div className="flex items-center gap-1 group">
                  <LikeTweet
                    tweetId={id}
                    userInfoId={userInfoId}
                    likes={likes.includes(userInfoId)}
                    className="group-hover:text-red-700 transition-all ease-out duration-200"
                  />
                  <p
                    className={`${
                      likes.includes(userInfoId)
                        ? "text-small-regular text-red-700 transition-all ease-out duration-200 cursor-pointer"
                        : "text-small-regular group-hover:text-red-700 transition-all ease-out duration-200 cursor-pointer"
                    }`}
                  >
                    {likes.length}
                  </p>
                </div>

                <Link
                  href={`/tweet/${id}`}
                  className="flex items-center gap-1 hover:text-sky-400 transition-all ease-out duration-200 cursor-pointer"
                >
                  <BiCommentDetail />
                  <p className="text-small-regular">{comments.length}</p>
                </Link>

                <PiShareFat className=" hover:text-emerald-400 transition-all ease-out duration-200 cursor-pointer" />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/tweet/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Delete Tweet */}
        <DeleteTweet
          tweetId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {/* Show Comments */}
      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/tweet/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}

      {/* Community comments */}
      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
      {!community && (
        <p className="mt-5 text-subtle-medium text-gray-1">
          {formatDateString(createdAt)}
        </p>
      )}
    </article>
  );
};

export default TweetCard;
