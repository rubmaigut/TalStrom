import TalstromLogo from "@/ui/atoms/general ui/talstrom-logo";
import LoginButton from "./atoms/profile/login-button";
import Image from "next/image";

export default function Header() {
  return (
    <header className="max-w-7xl w-full h-full flex grow flex-col md:flex-row md:justify-center mt-4">
      <div className="flex flex-col w-full justify-center items-center gap-6 rounded-lg px-6 py-2">
        <div className="mt-2">
          <TalstromLogo />
        </div>
        <div className="flex flex-col justify-center items-center my-8">
          <h1 className="text-3xl md:text-5xl text-secondary-text">
            Welcome to your professional community
          </h1>
          <span className="text-primary-text text-lg mt-4">
            Sing in and find the best talent for your company.
          </span>
        </div>
        <LoginButton classNameButton="px-2" />
        <div className="w-full h-full mt-8">
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
