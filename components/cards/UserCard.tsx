import Image from "next/image";
// import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

function UserCard({ id, name, username, imgUrl, personType }: Props) {
  const isCommunity = personType === "Community";

  return (
    <Link
      href={isCommunity ? `/communities/${id}` : `/profile/${id}`}
      className="flex flex-col justify-between gap-4 max-xs:rounded-xl max-xs:bg-dark-3 max-xs:p-4 xs:flex-row xs:items-center"
    >
      <div className="flex flex-1 items-start justify-start gap-3 xs:items-center group ">
        <div className="relative h-12 w-12 rounded-full ">
          <Image
            src={imgUrl}
            alt="user_logo"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="text-ellipsis cursor-pointer ">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1 group-hover:text-sky-600 transition-all ease-out duration-200">
            @{username}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default UserCard;
