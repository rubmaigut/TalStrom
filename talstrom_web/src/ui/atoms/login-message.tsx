// components/InviteUserForm.tsx
import { useUser } from "@/context/UserContext";
import { Role } from "@/types/IUser";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import GreetingModal from "./greetings";

interface Props {
  displayRole: string;
}

const LoginMessage: React.FC<Props> = ({ displayRole }) => {
  const { userContextG } = useUser();

  return (
    <>
      <div>
        {displayRole === "pending" && (
          <div>
            <p className="text-gray-800">
              <GreetingModal />
              <strong>Now you are a user! 🎊 </strong>
              Your role will be assigned soon, {userContextG?.name}.
            </p>
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
        )}
        {displayRole === "admin" && (
          <div
            key={userContextG?.id}
            className="flex flex-col justify-center items-center"
          >
            <GreetingModal />
            <h2> Welcome Admin </h2>
            <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2 ">
              your last connection was :
            </dd>
            <div className="flex justify-center items-center">
              <Link
                href="/admin"
                className="flex w-28 h-11 my-4 mr-4 grow items-center justify-center gap-2 rounded-md bg-teal-500 text-white p-3 text-sm font-bold hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:p-2 md:px-3"
              >
                Go to Portal
              </Link>
              <Link
                href={`/api/auth/signout`}
                className="flex h-11 w-32 grow text-center items-center justify-center gap-2 rounded-md bg-gray-50 border border-teal-500 p-3 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:p-2 md:px-3"
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
        )}
        {displayRole !== "admin" && displayRole !== "pending" && (
          <div className="flex flex-col justify-center items-center">
            <GreetingModal />
            <h2> Welcome {displayRole} </h2>
            <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2 ">
              your last connection was : Date / Time
            </dd>
            <div className="flex justify-center items-center">
              <Link
                href="/admin"
                className="flex w-28 h-11 my-4 mr-4 grow items-center justify-center gap-2 rounded-md bg-teal-500 text-white p-3 text-sm font-bold hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:p-2 md:px-3"
              >
                Go to Portal
              </Link>
              <Link
                href={`/api/auth/signout`}
                className="flex h-11 w-32 grow text-center items-center justify-center gap-2 rounded-md bg-gray-50 border border-teal-500 p-3 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:p-2 md:px-3"
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
        )}
      </div>
    </>
  );
};

export default LoginMessage;
