import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  NewspaperIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  StarIcon as SolidStarIcon,
} from "@heroicons/react/24/outline";

interface NavLinksProps {
  onLinkClick: (link: string) => void;
}

export const links = [
  { name: "posts", href: "/customer/[id]/post", icon: NewspaperIcon },
  {
    name: "find-match",
    href: "/customer/[id]/find-match",
    icon: MagnifyingGlassIcon,
  },
  { name: "networking", href: "/customer/[id]/my-devs", icon: UserGroupIcon },
  { name: "saved", href: "/customer/[id]/saved", icon: SolidStarIcon },
];

const ProfileNavLinks: React.FC<NavLinksProps> = ({ onLinkClick }) => {
  const pathname = usePathname();

  const handleLinkClick = (link: string) => {
    if (onLinkClick) {
      onLinkClick(link);
    }
  };

  return (
    <div className="flex gap-2 justify-around">
      {links.map((link) => {
        const IconComponent = link.icon;
        return (
          <div
            key={link.name}
            onClick={() => handleLinkClick(link.name)}
            className={clsx(
              "flex items-center justify-center gap-2 rounded-lg bg-gray-200 p-3 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 lg:flex-none lg:justify-start lg:p-2 lg:px-3 custom-justify-center",
              {
                "bg-teal-100 text-teal-600": pathname === link.href,
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

export default ProfileNavLinks;
