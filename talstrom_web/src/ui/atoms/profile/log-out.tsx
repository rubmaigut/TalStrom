import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import Link from "next/link";

const handleSignOut = async (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  try {
    await signOut({ redirect: false, callbackUrl: "/" });
    window.location.href = "/";
  } catch (error) {
    console.error("Error signing out", error);
  }
};

export default function LogoutButton() {
  return (
    <Link
    href={`/api/auth/signout`}
    className="flex grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:p-2 md:px-3"
    onClick={handleSignOut}
  >
    <PowerIcon className="w-6" />
    <p className="hidden md:block">Sign out</p>
  </Link>
  );
}
