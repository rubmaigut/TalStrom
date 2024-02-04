import { FC, useState } from "react";
import VideoItem from "../atoms/video-item";
import UploadContainer from "../overlays/upload-video";

type VideosGridProps = {
  videos: Video[] | undefined;
  sub: string;
};
const VideosGrid = ({ videos, sub }: VideosGridProps) => {
  const [uploadVisibility, setUploadVisibility] = useState(false);

  const showUploadOverlay = () =>{
    setUploadVisibility(!uploadVisibility);
  }

  console.log(uploadVisibility)
  return (

    <article>
      {uploadVisibility && <UploadContainer closeWindow={showUploadOverlay} sub="113603288691815899516" />}
      <button className="mt-4 px-2 mx-3 border" onClick={showUploadOverlay}>Add Video</button>
      <div className="mt-4 grid 2xl:grid-cols-6 xl-grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 px-2 lg:px-4">
        {videos?.map((elm, i) => {
          return <VideoItem key={i} videoItem={elm} sub={sub} />;
        })}
      </div>
    </article>
  );
};

export default VideosGrid;
