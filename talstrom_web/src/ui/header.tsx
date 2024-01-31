import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <header className="flex items-center h-20 gap-4 px-4 border-b border-black border-solid sm:px-8 border-opacity-20 my-4 bg-black">
      <Link href="/" className="flex items-center h-20 gap-2 sm:gap-4n bg-black">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={90}
          height={18}
          priority
        />
      </Link>

      <div
        className="bg-white overflow-hidden sm:rounded-lg bg-black"
        style={{
          boxShadow: `0px 20px 24px -4px rgba(16, 24, 40, 0.08)`,
        }}
      >
        <div>
          {session?.user && (
            <div className="pb-6 max-h-96">
              <dt className="text-sm font-semibold">User</dt>
              <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2 bg-black">
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
        </div>
      </div>
      <nav>
        <ul className="mb-8 p-0 list-none">{/* Nav items here */}</ul>
      </nav>
    </header>
  );
}
