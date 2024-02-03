import { FC } from "react";

type VideosGridProps = {
  videos: Video[] | undefined;
};
const VideosGrid: FC<VideosGridProps> = ({ videos }) => {
  console.log(videos);

  return (
    <section>
      <p>Video Posts</p>
      {videos && videos.length && (
        <div>
          {videos.map((video, i) => {
            // return <img key={`video-${i}`} src={video.uri} alt="video" />
            return <div key={`video-${i}`}>{video.uri}</div>;
          })}
        </div>
      )}
    </section>
  );
};

export default VideosGrid;
