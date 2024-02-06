import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import LoginButton from "./atoms/profile/login-button";
import { PowerIcon } from "@heroicons/react/24/outline";

interface AccessDeniedProps {
  role: string;
}

export default function AccessDenied({ role }: AccessDeniedProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-16 px-6 md:px-8">
      <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
      <span className="text-gray-600 my-4"> Sign in with you account to redirect you to the right page </span>
      <span className="text-gray-600 my-4"> {`You must be ${role} to view this page`} </span>
      <LoginButton classNameTitle="text-gray-600" classNameButton="px-2"/>
      <Link
          href={`/api/auth/signout`}
          className="flex w-44 my-4 border border-teal-500 h-[48px]grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:p-2 md:px-3"
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          <PowerIcon className="w-6" />
          Sign out
        </Link>
    </div>
  );
}
