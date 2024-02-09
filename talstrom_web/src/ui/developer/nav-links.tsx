import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  NewspaperIcon,
  TvIcon,
  PhotoIcon,
  BriefcaseIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import TalstromLogo from "@/ui/atoms/general ui/talstrom-logo";
import LogoutButton from "@/ui/atoms/profile/log-out";
import React from "react";

interface NavLinksProps {
  onLinkClick: (link: string) => void;
}

export const links = [
  { name: "Bio", href: "/developer/[id]/videos", icon: UserCircleIcon },
  { name: "Videos", href: "/developer/[id]/videos", icon: TvIcon },
  { name: "Images", href: "/developer/[id]/images", icon: PhotoIcon },
  { name: "Posts", href: "/developer/[id]/post", icon: NewspaperIcon },
  {
    name: "Jobs",
    href: "/developer/[id]/my-opportunities",
    icon: BriefcaseIcon,
  },
];

const NavLinks: React.FC<NavLinksProps> = ({ onLinkClick }) => {
  const pathname = usePathname();

  const handleLinkClick = (link: string) => {
    if (onLinkClick) {
      onLinkClick(link);
    }
  };

  return (
    <div className="w-full h-full flex justify-around items-center ">
      <div className="lg:hidden">
        <TalstromLogo shortVersion={true} />
      </div>
      <div className="hidden lg:block">
        <TalstromLogo shortVersion={false} />
      </div>
      <div className="flex gap-2 justify-between ">
        {links.map((link) => {
          const IconComponent = link.icon;
          return (
            <div
              key={link.name}
              onClick={() => handleLinkClick(link.name)}
              className={clsx(
                "flex items-center text-primary-light  justify-center gap-2 rounded-lg bg-gray-100 p-3 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 lg:flex-none lg:justify-start lg:p-2 custom-justify-center",
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
        <div className="">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
