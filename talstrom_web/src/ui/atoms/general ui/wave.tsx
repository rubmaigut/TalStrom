import Image from "next/image";

interface WaveProps {
  waveLight: boolean
} 
export default function Wave( {waveLight} : WaveProps) {
  return (
    <Image
      src={`${waveLight ? "wave-light.svg" : "wave.svg"}`}
      alt="wave"
      className={`${waveLight ? "bg-neutral-950" : "bg-transparent"} w-full h-32 md:h-32 2xl:h-48 absolute`}
      width={100}
      height={100}
      priority
    />
  );
}
