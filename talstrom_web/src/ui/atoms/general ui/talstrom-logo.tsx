import Image from "next/image";

interface LogoProps {
  isDark: boolean
}

export default function TalstromLogo({isDark}: LogoProps) {
  return (
    <div className={"flex w-full h-full justify-center items-center leading-none"}>
      <Image
        src={`${isDark ? "/talstrom-light.png" : "/talstrom-dark.png"}`}
        alt="talstrom logo"
        className="flex md:hidden"
        width={250}
        height={200}
        priority
      />

      <Image
        src={`${isDark ? "/talstrom-light.png" : "/talstrom-dark.png"}`}
        alt="talstrom logo"
        className="hidden md:flex"
        width={350}
        height={350}
        priority
      />
    </div>
  );
}
