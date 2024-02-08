import Image from "next/image";

export default function TalstromLogo() {
  return (
      <Image
        src="/talstrom.png"
        alt="talstrom logo"
        className="w-32"
        width={100}
        height={100}
        priority
      />
  );
}
