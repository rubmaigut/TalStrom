import { useSession } from "next-auth/react";
import SuccessLogin from "./atoms/general ui/success-login";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import TalstromLogo from "@/ui/atoms/general ui/talstrom-logo";
import Wave from "./atoms/general ui/wave";
import LoginButton from "./atoms/profile/login-button";
import { MailImage } from "./atoms/profile/email-image";
import Image from "next/image";

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
    <header
      className={`${
        !session ? "bg-neutral-950" : "bg-gray-50"
      } w-full flex flex-col max-w-8xl justify-center items-center h-screen`}
    >
      <div
        className={`${!session ? "bg-neutral-950" : "bg-gray-50"} w-full h-16`}
      >
        <Wave waveLight={!session ? false : true} />
      </div>
      {!session ? (
        <div className="mt-4 w-full h-full flex grow flex-col md:flex-row md:justify-center">
          <div className="flex flex-col w-full md:w-2/3 lg:w-3/6 justify-center items-center gap-6 rounded-lg px-6 py-2">
            <div className="flex w-full md:w-3/6 justify-center md:justify-star">
              <div className="flex mt-2 z-0 w- h-full">
                <TalstromLogo isDark={!session ? false : true} />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl md:text-5xl text-white md:leading-normal">
              Welcome to TalStrom
            </h1>
            <span className=" text-white text-xl text-center mt-4">
              Sing in and find the best allies for your company.
            </span>
            </div>
            <LoginButton classNameButton="px-2" />
          </div>
          <div className="hidden md:block h-screen md:w-2/6 lg:w-3/6 bg-red-500 ">
           <Image
              src="/hero-desktop.jpg"
              alt="Man choosing"
              className="w-full h-full object-cover"
              width={100}
              height={100}
              quality={100}
              priority
            />
          </div>
        </div>
      ) : (
        <div className="mt-4 w-full flex grow flex-col gap-4 md:items-center 2xl:h-32">
          <div className="flex flex-col justify-center gap-6 mt-8 lg:mt-16 rounded-lg bg-gray-50 px-6 py-10 w-full md:px-16">
            <MailImage
              picture={session!.user?.image as string}
              name={session!.user?.name as string}
              email={session!.user?.email as string}
            />
            {userContextG && <SuccessLogin user={userContextG} />}
          </div>
        </div>
      )}
    </header>
  );
}
