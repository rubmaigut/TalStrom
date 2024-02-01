import { addUserHandler } from "@/lib/data";
import { LoginProps, User } from "@/types/IUser";
import { PowerIcon } from "@heroicons/react/24/outline";
import { NextPage } from "next";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const SuccessLogin: NextPage<LoginProps> = ({ user }) => {
  const [loading, setLoading] = useState(true);

  const adminEmail = "maidelin.rubio@appliedtechnology.se";
  const isAdmin = user?.email === adminEmail;

  useEffect(() => {
    setLoading(true);
    addUserHandler(user).finally(() => setLoading(false));
  }, []);

  if (loading && !isAdmin) {
    return <p>Loading... 🔄</p>;
  }

  return (
    <>
      {isAdmin ? (
        <div className="flex flex-col justify-center items-center">
          <h2> Welcome Admin </h2>
          <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2 ">
            your last connection was : Date / Time
          </dd>
          <Link
            href="/admin"
            className="flex w-40 h-[48px] my-4 grow items-center justify-center gap-2 rounded-md bg-teal-500 p-3 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            Go to Portal
          </Link>
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
      ) : (
        <div>
          <p className="text-gray-800">
            <strong>Now you are a user! 🎊 </strong>
            Your role will be assigned soon, {user.name}.
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
    </>
  );
};
export default SuccessLogin;
