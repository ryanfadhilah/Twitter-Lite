import Link from "next/link";
import Image from "next/image";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { AiOutlineCloseSquare, AiFillEdit } from "react-icons/ai";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
}: Props) {
  // const router = useRouter();
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="logo"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {name}
            </h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>

        {accountId === authUserId && type !== "Community" && (
          <div className="flex items-center gap-3">
            <SignedIn>
              <SignOutButton
              // signOutCallback={() => router.push("/sign-in")}
              >
                <div className="flex items-center cursor-pointer gap-1 rounded-sm bg-dark-2 px-4 py-2 ">
                  <AiOutlineCloseSquare className="text-white"></AiOutlineCloseSquare>
                  <p className="text-light-1 ">Logout</p>
                </div>
              </SignOutButton>
            </SignedIn>

            <Link href="/profile/edit">
              <div className="flex items-center cursor-pointer gap-1 rounded-sm bg-dark-2 px-4 py-2">
                <AiFillEdit className="text-white"></AiFillEdit>
                <p className="text-light-2 max-sm:hidden">Edit</p>
              </div>
            </Link>
          </div>
        )}
      </div>

      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
}

export default ProfileHeader;
