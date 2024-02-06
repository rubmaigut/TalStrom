import Image from "next/image";

interface WaveProps {
  waveLight: boolean
} 
export default function Wave( {waveLight} : WaveProps) {
  return (
    <Image
      src={`${waveLight ? "wave-light.svg" : "wave.svg"}`}
      alt="wave"
      className={`${waveLight ? "bg-neutral-950" : "bg-gray-50"} w-full h-32 md:h-32 2xl:h-48 absolute -m-8`}
      width={300}
      height={200}
      priority
    />
  );
}
