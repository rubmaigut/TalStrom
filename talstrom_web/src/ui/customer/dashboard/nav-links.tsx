"use client";
import {
  UserGroupIcon,
  HomeIcon,
  BriefcaseIcon,
  PaperClipIcon,
  ChartBarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";


// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

export default function CustomerNavLinks() {
  const pathname = usePathname();
  
  const {userContextG} = useUser();

  const links = [
    { name: "Home", href: "/customer", icon: HomeIcon },
    { name: "My Profile", href: `/customer/profile?sub=${userContextG?.sub}`, icon: UserIcon },
    { name: "Jobs", href: "/customer/jobs", icon: BriefcaseIcon },
    { name: "Candidates", href: "/customer/candidates", icon: PaperClipIcon },
    { name: "Consultants", href: "/customer/consultants", icon: UserGroupIcon },
    {
      name: "Analytics",
      href: "/customer/analytics",
      icon: ChartBarIcon,
    },
  ];
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-teal-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

