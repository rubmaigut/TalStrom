import Link from "next/link";
import Image from "next/image";
import MockLogo from "@/ui/mock-logo";
import { signIn, useSession } from "next-auth/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import SuccessLogin from "./success-login";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";

export default function Header() {
  const { data: session } = useSession();
  const { userContextG, updateUser } = useUser();

  useEffect(() => {
    if (session && (!userContextG || session.user?.sub !== userContextG.sub))  {
      updateUser({
        id: session.user?.id || 0,
        name: session.user?.name || "",
        email: session.user?.email || "",
        picture: session.user?.image || "",
        sub: session.user?.sub || "", 
        role: "pending"
      });
    }
  }, [session, userContextG, updateUser]);

  return (
    <header className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-teal-500 p-4 md:h-52">
        <MockLogo />
      </div>
      {!session ? (
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
            <p
              className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}
            >
              <strong>Welcome to TalStrom.</strong> Sign in to enjoy our
              services{" "}
            </p>
          </div>
          <Link
            href={`/api/auth/signin`}
            className="flex items-center gap-5 self-start rounded-lg bg-teal-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      ) : (
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
            <div className="flex flex-col justify-center items-center">
              <dd className="my-2 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                <Image
                  src={`${session.user?.image}`}
                  alt={`Photo profile${session.user?.name}`}
                  className="rounded-full"
                  width={80}
                  height={80}
                  priority
                />
              </dd>
              <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2 ">
                {session.user?.email || session.user?.name}
              </dd>
            </div>
            {userContextG && <SuccessLogin user={userContextG} />}
          </div>
        </div>
      )}
    </header>
  );
}
