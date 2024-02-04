import { FC } from "react";

type VideosGridProps = {
  videos: Video[] | undefined;
};
const VideosGrid: FC<VideosGridProps> = ({ videos }) => {
  console.log(videos);

  return (
    <section>
      <p className="m-2">Video Posts</p>
      {videos && videos.length && (
        <div className="grid grid-cols-4 my-2 md:grid-cols-6 m-2 md:mx-32">
          {videos.map((video, i) => {
            return (
              
              <video key={i} className="object-cover mx-auto h-[10em] sm:h-[15em] w-[12em]"  loop muted src={video.uri} />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default VideosGrid;
