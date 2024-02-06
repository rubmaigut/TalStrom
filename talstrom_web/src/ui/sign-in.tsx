import { signIn, useSession } from "next-auth/react";
import Link from "next/dist/client/link";
import { FC } from "react";
import MockLogo from "@/ui/talstrom-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const SignIn: FC = () => {
  const { data: session } = useSession();
  return (
    <div className="flex min-h-screen flex-col p-6">
      {!session && (
        <div>
          <div className="flex h-20 shrink-0 items-end rounded-lg bg-teal-500 p-4 md:h-52">
            <MockLogo />
          </div>
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20 my-4">
            <p
              className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}
            >
              You are not signed in
            </p>
          </div>
          <Link
            href={`/api/auth/signin`}
            className="w-32 flex items-center gap-5 self-start rounded-lg bg-teal-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default SignIn;
