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
        className="mb-2 flex h-16 items-center justify-center rounded-md bg-gray-50 p-4 md:h-30"
        href="/"
      >
        <Image
          src="/talstrom.png"
          alt="talstrom logo"
          className="w-32 h-14"
          width={100}
          height={100}
          priority
        />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {userContextG?.role === "admin" ? <NavLinks /> : <CustomerNavLinks />}
        <div className="hidden h-auto w-full grow rounded-md bg-gray-100 md:block"></div>
        <LogoutButton/>
      </div>
    </div>
  );
}
