import { FC, useState } from "react";
import VideoItem from "../atoms/video-item";
import UploadContainer from "../overlays/upload-media";
import VideoPlayer from "../overlays/video-player";

type VideosGridProps = {
  videos: Media[] | undefined;
  sub: string;
  loadUser: (sub: string) => void;
};
const VideosGrid = ({ videos, sub, loadUser }: VideosGridProps) => {
  const [uploadVisibility, setUploadVisibility] = useState(false);
  const [playerVisibility, setPlayerVisibility] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [deleteMode, setDeleteMode] = useState(false);

  const toggleUploadOverlay = (uploaded: boolean) => {
    if (uploaded) loadUser(sub);
    setUploadVisibility(!uploadVisibility);
  };

  const togglePlayerOverlay = (videoId?: number) => {
    const video = videos?.find((v) => v.id === videoId);
    videoId
      ? setCurrentVideoIndex(videos!.indexOf(video as Media))
      : setCurrentVideoIndex(0);
    setPlayerVisibility(!playerVisibility);
  };

  const toggleDeleteable = () => setDeleteMode(!deleteMode);

  const nextVideo = () => {
    let newIndex =
      currentVideoIndex === videos!.length - 1 ? 0 : currentVideoIndex + 1;
    setCurrentVideoIndex(newIndex);
  };

  const previousVideo = () => {
    let newIndex =
      currentVideoIndex === 0 ? videos!.length - 1 : currentVideoIndex - 1;
    setCurrentVideoIndex(newIndex);
  };

  return (
    <article>
      {uploadVisibility && (
        <UploadContainer
          closeWindow={toggleUploadOverlay}
          sub={sub}
          mediaType="Video"
        />
      )}
      {playerVisibility && (
        <VideoPlayer
          nextVideo={nextVideo}
          previousVideo={previousVideo}
          closeWindow={togglePlayerOverlay}
          videos={videos}
          currentVideoIndex={currentVideoIndex}
        />
      )}
      <button
        className="mt-2 ml-2 h-[48px] rounded-md bg-green-200 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:px-3"
        onClick={() => toggleUploadOverlay(false)}
      >
        Add Video
      </button>
      <button
      type="button"
        className={`mt-2 ml-2 h-[48px] rounded-md ${
          deleteMode ? "bg-gray-300" : "bg-red-200"
        } text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:px-3`}
        onClick={toggleDeleteable}
      >
        Delete Videos
      </button>
      <div className="mt-4 grid 2xl:grid-cols-6 xl-grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-1 px-2 lg:px-4">
        {videos?.map((elm, i) => {
          return (
            <VideoItem
              deleteMode={deleteMode}
              key={i}
              videoItem={elm}
              openPlayer={togglePlayerOverlay}
            />
          );
        })}
      </div>
    </article>
  );
};

export default VideosGrid;
