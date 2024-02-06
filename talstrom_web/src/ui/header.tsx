import Image from "next/image";
import { useSession } from "next-auth/react";
import SuccessLogin from "./success-login";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import TalstromLogo from "@/ui/talstrom-logo";
import Wave from "./atoms/wave";
import LoginButton from "./atoms/profile/login-button";
import { MailImage } from "./atoms/profile/email-image";

export default function Header() {
  const { data: session } = useSession();
  const { userContextG, updateUser } = useUser();

  useEffect(() => {
    if (session && (!userContextG || session.user?.sub !== userContextG.sub)) {
      updateUser({
        id: session.user?.id || 0,
        name: session.user?.name || "",
        email: session.user?.email || "",
        picture: session.user?.image || "",
        sub: session.user?.sub || "",
        role: "pending",
        phoneNumber: null,
        dateAdded: new Date(),
        lastLoggedIn: new Date(),
        lastModified: new Date(),
        active: true,
        videos: null,
        followers: null,
        following: null,
        posts: null,
      });
    }
  }, [session, userContextG, updateUser]);

  return (
    <header className="flex min-h-screen flex-col p-6 bg-neutral-950 md:p-8">
      <div className="w-full h-16 bg-gray-50">
        <Wave />
      </div>
      <div className="flex relative mt-16 z-0 w-full h-22 justify-center items-center shrink-0 md:h-58">
        <TalstromLogo />
      </div>
      {!session ? (
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col w-full justify-center items-center gap-6 rounded-lg px-6 py-2 md:px-1">
            <h1 className="text-3xl md:text-5xl  text-white md:leading-normal">
             Welcome to TalStrom
            </h1>
              <dd className=" text-white text-xl">Sing in and find the best allies for your company.</dd>
            <LoginButton/>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row 2xl:h-48">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
            <MailImage picture={session!.user?.image as string} name={session!.user?.name as string} email={session!.user?.email as string} />
            {userContextG && <SuccessLogin user={userContextG} />}
          </div>
        </div>
      )}
    </header>
  );
}
