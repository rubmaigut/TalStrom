import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  NewspaperIcon,
  UserGroupIcon,
  StarIcon as SolidStarIcon,
  ClipboardDocumentIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";
import TalstromLogo from "@/ui/atoms/general ui/talstrom-logo";
import LogoutButton from "@/ui/atoms/profile/log-out";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface NavLinksProps {
  onLinkClick: (link: string) => void;
}

export const links = [
  { name: "posts", href: "/customer/[id]/post", icon: NewspaperIcon },
  {
    name: "feed",
    href: "/customer/[id]/feed",
    icon: ViewfinderCircleIcon,
  },
  { name: "networking", href: "/customer/[id]/my-devs", icon: UserGroupIcon },
  { name: "saved", href: "/customer/[id]/saved", icon: SolidStarIcon },
];

const ProfileNavLinks: React.FC<NavLinksProps> = ({ onLinkClick }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const sub = session?.user?.sub

  const handleLinkClick = (link: string) => {
    if (onLinkClick) {
      onLinkClick(link);
    }
  };

  return (
    <div className="w-full h-full flex justify-around items-center max-w-5xl container mx-auto py-2">
      <TalstromLogo shortVersion={true} />
      <div className="flex pl-4 gap-2 justify-between ">
        {links.map((link) => {
          const IconComponent = link.icon;
          return (
            <div
              key={link.name}
              onClick={() => handleLinkClick(link.name)}
              className={clsx(
                "flex items-center text-primary-light  justify-center gap-2 rounded-lg bg-gray-100 p-3 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 lg:flex-none lg:justify-start lg:p-2 lg:px-3 custom-justify-center",
                {
                  "bg-teal-100 text-tea-900": pathname === link.href,
                }
              )}
            >
              <IconComponent className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </div>
          );
        })}
        <LogoutButton />
        <Link
          href={`/customer/${sub}`}
          className="flex grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start"
        >
          <ClipboardDocumentIcon className="w-6 "/>
        </Link>
      </div>
    </div>
  );
};

export default ProfileNavLinks;
