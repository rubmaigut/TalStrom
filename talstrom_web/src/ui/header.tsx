import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <header className="flex items-center h-20 gap-4 px-4 border-b border-black border-solid sm:px-8 border-opacity-20">
      <Link href="/" className="flex items-center h-20 gap-2 sm:gap-4">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={90}
          height={18}
          priority
        />
      </Link>

      <div
        className="bg-white overflow-hidden sm:rounded-lg"
        style={{
          boxShadow: `0px 20px 24px -4px rgba(16, 24, 40, 0.08)`,
        }}
      >
        <p
          className={`nojs-show ${
            !session && loading ? "custom-loading" : "custom-loaded"
          }`}
        >
          {!session && (
            <>
              <span className="custom-not-signed-in-text">
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className="custom-button-primary"
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <div className="pb-6 max-h-96">
              <dt className="text-sm font-semibold">User</dt>
              <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
                {session.user.email || session.user.name}
              </dd>

              <div className="px-8 py-2">
                <dt className="text-sm font-semibold mb-1">Profile Image</dt>
                <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                  <Image
                    src={`${session.user.image}`}
                    alt={`Photo profile${session.user.name}`}
                    width={50}
                    height={50}
                    priority
                  />
                </dd>
              </div>
              <Link
                href={`/api/auth/signout`}
                className="flex items-center h-20 gap-2 sm:gap-4"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </Link>
            </div>
          )}
        </p>
      </div>
      <nav>
        <ul className="mb-8 p-0 list-none">{/* Nav items here */}</ul>
      </nav>
    </header>
  );
}
