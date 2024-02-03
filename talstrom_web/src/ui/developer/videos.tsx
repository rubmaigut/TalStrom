import { FC } from "react";

type VideosGridProps = {
    videos: Video[] | undefined
}
const VideosGrid : FC<VideosGridProps> = ({videos}) => {

    console.log(videos);

    if(videos && videos.length) return (
      <div>
        <p>Video Posts</p>
        {videos.map((video, i) =>  {
            // return <img src={video.uri} alt="video" />
            return <div>{video.uri}</div>
        })}
      </div>
    );
  };


  export default VideosGrid;
  
  