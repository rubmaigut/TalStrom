import { SyntheticEvent, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

type VideoItemProps = {
  videoItem: Media;
  openPlayer: (videoId?: number) => void;
  deleteMode: boolean;
  removeVideoFromGrid: (uri: string) => void
};

export default function VideoItem({
  videoItem,
  openPlayer,
  deleteMode,
  removeVideoFromGrid
}: VideoItemProps) {
  const [confirmBoxVisibility, setConfirmBoxVisibility] = useState(false);

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

  const confirmDelete = () => {
    removeVideoFromGrid(videoItem.uri);
    setConfirmBoxVisibility(!confirmBoxVisibility)
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
          {deleteMode && (
            <div
              className="absolute top-[6px] left-[90px] md:left-[185px] bg-black hover:bg-red-500 rounded-full"
              onClick={() => setConfirmBoxVisibility(!confirmBoxVisibility)}
            >
              <TiDeleteOutline size={30} color="white" />
            </div>
          )}
        </div>
      )}
      {confirmBoxVisibility && (
        <div className="absolute top-20 rounded-md bg-white p-3 flex flex-col">
          <h3> Delete Video?</h3>
          <div id="confirm-delete-buttons" className="flex justify-between mt-1">
            <button
              className="h-[48px] px-3 rounded-md bg-green-200 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start"
              onClick={confirmDelete}
            >
              Yes
            </button>
            <button
              className="h-[48px] px-3 rounded-md bg-red-200 text-sm font-medium hover:bg-red-300 hover:text-red md:flex-none md:justify-start"
              onClick={() => setConfirmBoxVisibility(!confirmBoxVisibility)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
