import Image from "next/image";

export default function Wave() {
  return (
    <Image
      src="wave.svg"
      alt="wave"
      className="bg-gray-50 w-full h-32 md:h-32 2xl:h-48 absolute -m-8"
      width={300}
      height={200}
      priority
    />
  );
}
