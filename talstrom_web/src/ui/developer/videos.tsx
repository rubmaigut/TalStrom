import { FC } from "react";
import VideoItem from "../atoms/video-item";

type VideosGridProps = {
  videos: Video[] | undefined;
  sub: string;
};
const VideosGrid = ({ videos, sub }: VideosGridProps) => {
  console.log(videos);

  return (
    <article className="mt-4 grid 2xl:grid-cols-6 xl-grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 px-2 lg:px-4">
      {videos?.map((elm, i) => {
        return <VideoItem videoItem={elm} sub={sub} />;
      })}
    </article>
  );
};

export default VideosGrid;
