import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ImTwitter } from "react-icons/im";
import { AiOutlineCloseSquare, AiOutlineCheckSquare } from "react-icons/ai";
import { dark } from "@clerk/themes";

const TopBar = () => {
  return (
    <nav className="topbar md:hidden">
      <Link href={"/"} className="flex items-center gap-4">
        <ImTwitter className="text-blue shrink-0 sm:text-heading3-bold"></ImTwitter>
        <p className="text-heading3-bold text-light-1 max-xs:hidden">
          Blue Bird
        </p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <AiOutlineCloseSquare className="text-white"></AiOutlineCloseSquare>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
};

export default TopBar;
