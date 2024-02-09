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
import { useSession } from "next-auth/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useUser } from "@/context/UserContext";


export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { id } = context.params;
  return { props: { id } };
};

export default function CustomerNavLinks({ id } :InferGetServerSidePropsType<typeof getServerSideProps>) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { userContextG } = useUser()
  const customerId = session?.user?.sub || id

  const links = [
    { name: "Home", href: `/customer/${customerId}`, icon: HomeIcon },
    { name: "My Profile", href: `/customer/profile/${customerId}`, icon: UserIcon },
    { name: "Jobs", href: "/customer/jobs", icon: BriefcaseIcon },
    /* { name: "Candidates", href: "/customer/candidates", icon: PaperClipIcon },
    { name: "Consultants", href: "/customer/consultants", icon: UserGroupIcon }, */
    {
      name: "Analytics",
      href: "/customer/analytics",
      icon: ChartBarIcon,
    },
  ];
  return (
    <div className="flex md:flex-col -m-1">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:p-2 md:px-3 md:mb-1",
              {
                "bg-teal-100 text-teal-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}

