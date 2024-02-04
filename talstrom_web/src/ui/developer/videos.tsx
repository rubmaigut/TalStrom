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
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number | null>(
    null
  );

  const toggleUploadOverlay = () => {
    setUploadVisibility(!uploadVisibility);
  };

  const togglePlayerOverlay = (videoId?: number) => {
    setCurrentVideoIndex(videoId ? videoId : null);
    setPlayerVisibility(!playerVisibility);
  };

  return (
    <article>
      {uploadVisibility && (
        <UploadContainer closeWindow={toggleUploadOverlay} sub={sub} />
      )}
      {playerVisibility && (
        <VideoPlayer closeWindow={togglePlayerOverlay} videos={videos} currentVideoIndex={currentVideoIndex} />
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
