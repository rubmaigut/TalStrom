import { useSession } from "next-auth/react";
import { FC } from "react";
import TalstromLogo from "@/ui/atoms/general ui/talstrom-logo";
import LoginButton from "../profile/login-button";
import Wave from "./wave";
import Image from "next/image";

const SignIn: FC = () => {
  const { data: session } = useSession();
  return (
    <div
      className={`${
        !session ? "bg-neutral-950" : "bg-gray-50"
      } flex min-h-screen flex-col p-6 md:p-8`}
    >
      <div
        className={`${!session ? "bg-neutral-950" : "bg-gray-50"} w-full h-16`}
      >
        <Wave waveLight={!session ? false : true} />
      </div>
      <TalstromLogo isDark={!session ? false : true} />
      {!session && (
        <div className="w-full flex flex-col justify-center items-center">
            <Image
              src="/not-session.svg"
              alt="wave"
              width={300}
              height={300}
              priority
            />
            <h2 className="text-md text-center text-white my-6"> Sign in to take you career to the next Level</h2>
          <LoginButton classNameButton="px-2"/>
        </div>
      )}
    </div>
  );
};

export default SignIn;
