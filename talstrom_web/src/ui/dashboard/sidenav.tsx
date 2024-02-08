import Link from "next/link";
import NavLinks from "@/ui/dashboard/nav-links";
import { useUser } from "@/context/UserContext";
import CustomerNavLinks from "../customer/dashboard/nav-links";
import Image from "next/image";
import LogoutButton from "../atoms/profile/log-out";

export default function SideNav() {
  const { userContextG } = useUser();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-16 items-center justify-start rounded-md bg-neutral-950 p-4 md:h-30"
        href="/"
      >
        <Image
          src="/talstrom.svg"
          alt="talstrom logo"
          className="w-12 h-12"
          width={100}
          height={100}
          priority
        />
        <div className="text-white flex flex-col pl-2">
        <span className="text-lg font-bold">TalStröm</span>
        <dd className="text-xs">Talent Pool Management</dd>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {userContextG?.role === "admin" ? <NavLinks /> : <CustomerNavLinks />}
        <div className="hidden h-auto w-full grow rounded-md bg-gray-100 md:block"></div>
        <LogoutButton/>
      </div>
    </div>
  );
}
