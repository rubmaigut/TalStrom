import { FC, useState } from "react";
import UploadContainer from "../overlays/upload-media";
import ImageItem from "../atoms/image-item";
import ImageViewer from "../overlays/image-viewer";

type ImagesGridProps = {
  images: Media[] | undefined;
  sub: string;
  loadUser: (sub: string) => void;
};
const ImagesGrid = ({ images, sub, loadUser }: ImagesGridProps) => {
  const [uploadVisibility, setUploadVisibility] = useState(false);
  const [playerVisibility, setPlayerVisibility] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [deleteMode, setDeleteMode] = useState(false);
  const [currentImages, setCurrentImages] = useState<Media[]>(
    images as Media[]
  );

  const toggleUploadOverlay = (uploaded: boolean) => {
    if (uploaded) {
      loadUser(sub);
    }
    setUploadVisibility(!uploadVisibility);
  };

  const togglePlayerOverlay = (imageId?: number) => {
    const image = images?.find((i) => i.id === imageId);
    imageId
      ? setCurrentImageIndex(images!.indexOf(image as Media))
      : setCurrentImageIndex(0);
    setPlayerVisibility(!playerVisibility);
  };

  const toggleDeleteable = () => setDeleteMode(!deleteMode);

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

  const removeImage = (uri: string) => {
    const imageToDelete = currentImages?.findIndex((image) => image.uri == uri);
    const arrayToRemove = [...currentImages];
    arrayToRemove.splice(imageToDelete, 1);

    setCurrentImages(arrayToRemove);
  };

  return (
    <article>
      {uploadVisibility && (
        <UploadContainer
          closeWindow={toggleUploadOverlay}
          sub={sub}
          mediaType="Image"
        />
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
      <div id="confirm-delete-buttons" className="flex justify-left mt-1">
        <button
          className="m-1 p-1 h-[48px] rounded-md bg-green-200 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:px-3"
          onClick={() => toggleUploadOverlay(false)}
        >
          Add Image
        </button>
        <button
          type="button"
          className={`m-1 p-1 h-[48px] rounded-md ${
            deleteMode ? "bg-gray-300" : "bg-red-200"
          } text-sm px-4 font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:px-3`}
          onClick={toggleDeleteable}
        >
          Delete
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl-grid-cols-5 2xl:grid-cols-6  gap-1 px-2 lg:px-4">
        {images?.map((elm, i) => {
          return (
            <ImageItem
              key={i}
              imageItem={elm}
              openPlayer={togglePlayerOverlay}
              deleteMode={deleteMode}
              removeImageFromGrid={removeImage}
            />
          );
        })}
      </div>
    </article>
  );
};

export default ImagesGrid;
