import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import {
  NewspaperIcon,
  TvIcon,
  PhotoIcon,
  BriefcaseIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

interface NavLinksProps {
  onLinkClick: (link: string) => void;
}

export const links = [
  { name: 'Bio', href: '/developer/[id]/videos', icon: UserCircleIcon },
  { name: 'Videos', href: '/developer/[id]/videos', icon: TvIcon },
  { name: 'Images', href: '/developer/[id]/images', icon: PhotoIcon },
  { name: 'Posts', href: '/developer/[id]/post', icon: NewspaperIcon },
  {
    name: 'Jobs',
    href: '/developer/[id]/my-opportunities',
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
    <div className="flex gap-2 justify-center">
      {links.map((link) => {
        const IconComponent = link.icon;
        return (
          <div
            key={link.name}
            onClick={() => handleLinkClick(link.name)}
            className={clsx(
              'flex items-center justify-center gap-2 rounded-lg bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 lg:flex-none lg:justify-start lg:p-2 lg:px-3 custom-justify-center',
              {
                'bg-sky-100 text-teal-600': pathname === link.href,
              },
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
