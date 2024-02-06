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
        className="w-52 h-52 2xl:w-64 2xl:h-64 object-fit xl:mt-28 mt-12"
        width={100}
        height={100}
        priority
      />
    </div>
  );
}
