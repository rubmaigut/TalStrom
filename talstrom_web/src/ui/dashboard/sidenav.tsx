import Link from "next/link";
import NavLinks from "@/ui/dashboard/nav-links";
import MockLogo from "@/ui/mock-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-teal-600 p-4 md:h-40"
        href="/"
      >
        <MockLogo />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <Link
          href={`/api/auth/signout`}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:p-2 md:px-3"
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          <PowerIcon className="w-6" />
          Sign out
        </Link>
      </div>
    </div>
  );
}
