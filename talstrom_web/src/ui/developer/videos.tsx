import { FC, useState } from "react";
import VideoItem from "../atoms/video-item";
import UploadContainer from "../overlays/upload-video";
import VideoPlayer from "../overlays/video-player";

type VideosGridProps = {
  videos: Video[] | undefined;
  sub: string;
};
const VideosGrid = ({ videos, sub }: VideosGridProps) => {
  const [uploadVisibility, setUploadVisibility] = useState(false);
  const [playerVisibility, setPlayerVisibility] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);

  const toggleUploadOverlay = () => {
    setUploadVisibility(!uploadVisibility);
  };

  const togglePlayerOverlay = (videoId?: number) => {
    const video = videos?.find(v => v.id === videoId)
    videoId ? setCurrentVideoIndex(videos!.indexOf(video as Video)) : setCurrentVideoIndex(0);
    setPlayerVisibility(!playerVisibility);
  };

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

  console.log(currentVideoIndex);
  return (
    <article>
      {uploadVisibility && (
        <UploadContainer closeWindow={toggleUploadOverlay} sub={sub} />
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
      <button className="mt-4 px-2 mx-3 border" onClick={toggleUploadOverlay}>
        Add Video
      </button>
      <div className="mt-4 grid 2xl:grid-cols-6 xl-grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 px-2 lg:px-4">
        {videos?.map((elm, i) => {
          return (
            <VideoItem
              key={i}
              videoItem={elm}
              sub={sub}
              openPlayer={togglePlayerOverlay}
            />
          );
        })}
      </div>
    </article>
  );
};

export default VideosGrid;
