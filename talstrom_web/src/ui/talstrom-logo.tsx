import Image from "next/image";

export default function TalstromLogo() {
  return (
    <div className={"flex w-full h-full justify-center items-center leading-none"}>
      <Image
        src="/talstrom-full.png"
        alt="talstrom logo"
        className="flex md:hidden"
        width={250}
        height={200}
        priority
      />

      <Image
        src="/talstrom-full.png"
        alt="talstrom logo"
        className="hidden md:flex"
        width={350}
        height={350}
        priority
      />
    </div>
  );
}
