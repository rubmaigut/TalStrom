import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import LoginButton from "./atoms/profile/login-button";
import { PowerIcon } from "@heroicons/react/24/outline";
import LogoutButton from "./atoms/profile/log-out";

interface AccessDeniedProps {
  role: string;
}

export default function AccessDenied({ role }: AccessDeniedProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-16 px-6 md:px-8">
      <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
      <span className="text-gray-600 my-4"> Sign in with you account to redirect you to the right page </span>
      <span className="text-gray-600 my-4"> {`You must be ${role} to view this page`} </span>
      <LoginButton classNameTitle="text-gray-600" classNameButton="px-2 mb-4"/>
      <LogoutButton/>
    </div>
  );
}
