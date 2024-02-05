import { FC, useState } from "react";
import VideoItem from "../atoms/video-item";
import UploadContainer from "../overlays/upload-media";
import VideoPlayer from "../overlays/video-player";
import ImageItem from "../atoms/image-item";
import ImageViewer from "../overlays/image-viewer";

type ImagesGridProps = {
  images: Media[] | undefined;
  sub: string;
};
const ImagesGrid = ({ images, sub }: ImagesGridProps) => {
  const [uploadVisibility, setUploadVisibility] = useState(false);
  const [playerVisibility, setPlayerVisibility] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const toggleUploadOverlay = () => {
    setUploadVisibility(!uploadVisibility);
  };

  const togglePlayerOverlay = (imageId?: number) => {
    const video = images?.find(v => v.id === imageId)
    imageId ? setCurrentImageIndex(images!.indexOf(video as Media)) : setCurrentImageIndex(0);
    setPlayerVisibility(!playerVisibility);
  };

  const nextImage = () => {
    let newIndex =
      currentImageIndex === images!.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  const previousImage = () => {
    let newIndex =
      currentImageIndex === 0 ? images!.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  return (
    <article>
      {uploadVisibility && (
        <UploadContainer closeWindow={toggleUploadOverlay} sub={sub} mediaType="Image" />
      )}
      {playerVisibility && (
        <ImageViewer
          nextImage={nextImage}
          previousImage={previousImage}
          closeWindow={togglePlayerOverlay}
          images={images}
          currentImageIndex={currentImageIndex}
        />
      )}
      <button className="mt-4 px-2 mx-3 border" onClick={toggleUploadOverlay}>
        Add Picture
      </button>
      <div className="mt-4 grid 2xl:grid-cols-6 xl-grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-1 px-2 lg:px-4">
        {images?.map((elm, i) => {
          return (
            <ImageItem
              key={i}
              imageItem={elm}
              openPlayer={togglePlayerOverlay}
            />
          );
        })}
      </div>
    </article>
  );
};

export default ImagesGrid;
