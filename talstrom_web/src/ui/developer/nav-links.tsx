import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import {
  NewspaperIcon,
  UserGroupIcon,
  TvIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

interface NavLinksProps {
  onLinkClick: (link: string) => void;
}

export const links = [
  { name: "videos", href: "/developer/[id]/videos", icon: TvIcon },
  { name: "images", href: "/developer/[id]/images", icon: PhotoIcon },
  { name: "posts", href: "/developer/[id]/post", icon: NewspaperIcon },
  { name: "my-opportunities", href: "/developer/[id]/my-oppurtunities", icon: UserGroupIcon }
];

const NavLinks: React.FC<NavLinksProps> = ({ onLinkClick }) => {
  const pathname = usePathname();

  const handleLinkClick = (link: string) => {
    if (onLinkClick) {
      onLinkClick(link);
    }
  };

  return (
    <div className="flex gap-2">
      {links.map((link) => {
        const IconComponent = link.icon;
        return (
          <div
            key={link.name}
            onClick={() => handleLinkClick(link.name)}
            className={clsx(
              "flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-teal-600": pathname === link.href,
              }
            )}
          >
            <IconComponent className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default NavLinks;
