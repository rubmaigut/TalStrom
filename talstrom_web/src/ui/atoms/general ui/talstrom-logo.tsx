import Image from "next/image";

interface LogoProps {
  shortVersion?: boolean
}
export default function TalstromLogo({shortVersion}:LogoProps ) {
  return (
    <>
      {!shortVersion ? (
      <Image
        src="/talstrom.png"
        alt="talstrom logo"
        className="w-40"
        width={100}
        height={100}
        priority
      />
      ) : (
        <Image
        src="/talstrom-short.png"
        alt="talstrom logo"
        className="w-16 pl-4"
        width={100}
        height={100}
        priority
      />
      )}
    </>
  );
}