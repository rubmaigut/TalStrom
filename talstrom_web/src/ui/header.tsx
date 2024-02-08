import TalstromLogo from "@/ui/atoms/general ui/talstrom-logo";
import LoginButton from "./atoms/profile/login-button";
import Image from "next/image";

export default function Header() {
  return (
    <header className="max-w-7xl flex grow flex-col lg:justify-center lg:items-center mt-4 px-6 md:px-8">
        <div className="w-full flex justify-center mt-2 bg-white">
          <TalstromLogo />
        </div>
      <div className="flex flex-col md:flex-row w-full justify-center items-center gap-6 rounded-lg">
        <div className="flex flex-col md:flex-col md:w-3/6 justify-center items-center md:items-start my-8">
          <h1 className="text-3xl md:text-5xl text-secondary-text">
            Welcome to your professional community
          </h1>
          <span className="text-primary-text text-lg my-8">
            Sing in and find the best talent for your company.
          </span>
        <LoginButton/>
        </div>
        <div className="w-full md:w-3/6 h-full my-8">
          <Image
            src="/connection.png"
            alt="remote home animation"
            className="w-full h-full object-contain"
            width={900}
            height={200}
            priority
          />
        </div>
      </div>
    </header>
  );
}
