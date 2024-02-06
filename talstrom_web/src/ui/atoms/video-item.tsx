import { SyntheticEvent, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

type VideoItemProps = {
  videoItem: Media;
  openPlayer: (videoId?: number) => void;
  deleteMode: boolean;
};

export default function VideoItem({
  videoItem,
  openPlayer,
  deleteMode,
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
    const index = openPlayer(parseInt(target.id.split("-")[1]));
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
        <div onClick={openPlayerHandler} className="">
          <video
            id={`video-${videoItem.id}`}
            muted
            loop
            className="aspect=[3/4] object-cover rounded-none"
            src={videoItem.uri}
          />
          {deleteMode && (
            <div className="absolute top-[6px] left-[90px] bg-black rounded-full">
              <TiDeleteOutline size={30} color="white" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
