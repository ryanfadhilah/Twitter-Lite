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
          <div className="flex max-sm:flex-col items-center gap-3">
            <SignedIn>
              <SignOutButton
              // signOutCallback={() => router.push("/sign-in")}
              >
                <div className=" group flex items-center cursor-pointer gap-1 rounded-sm bg-black px-4 py-2 transition-all ease-out duration-200 ">
                  <AiOutlineCloseSquare className="text-red-500 group-hover:text-sky-500 transition-all ease-out duration-200"></AiOutlineCloseSquare>
                  <p className="max-sm:hidden text-red-600 group-hover:text-sky-500 transition-all ease-out duration-200">
                    Logout
                  </p>
                </div>
              </SignOutButton>
            </SignedIn>

            <Link href="/profile/edit">
              <div className="group flex items-center cursor-pointer gap-1 rounded-sm bg-black px-4 py-2  transition-all ease-out duration-200">
                <AiFillEdit className="text-white group-hover:text-sky-500 transition-all ease-out duration-200"></AiFillEdit>
                <p className="text-light-2 max-sm:hidden  group-hover:text-sky-500 transition-all ease-out duration-200">
                  Edit
                </p>
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
