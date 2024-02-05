import Link from "next/link";
import { SyntheticEvent, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type VideoItemProps = {
  videoItem: Media;
  openPlayer: (videoId?: number) => void;
};

export default function VideoItem({
  videoItem,
  openPlayer,
}: VideoItemProps) {
  useEffect(() => {
    const video = document.getElementById(
      `video-${videoItem.id}`
    ) as HTMLVideoElement;

    setTimeout(() => {
      video?.addEventListener("mouseenter", () => video.play());
      video?.addEventListener("mouseleave", () => video.pause());
    }, 50);
  }, [videoItem.id]);

  const openPlayerHandler = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLElement;
    const index =
    openPlayer(parseInt(target.id.split("-")[1]));
  };

  return (
    <div className="relative brightness-90 hover:brightness-[1.1] cursor-pointer">
      {!videoItem.uri ? (
        <div className="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover  rounded-md bg-black">
          <AiOutlineLoading3Quarters
            className="animate-spin ml-1"
            size="80"
            color="ffffff"
          />
        </div>
      ) : (
        <div onClick={openPlayerHandler}>
          <video
            id={`video-${videoItem.id}`}
            muted
            loop
            className="aspect=[3/4] object-cover rounded-none"
            src={videoItem.uri}
          />
        </div>
      )}
    </div>
  );
}
