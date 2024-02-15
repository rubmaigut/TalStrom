import { FC, useState } from "react";
import UploadContainer from "../overlays/upload-media";
import ImageItem from "../atoms/image-item";
import ImageViewer from "../overlays/image-viewer";
import MediaDeleteButtons from "../atoms/profile/media-delete-buttons";
import { Session } from "next-auth";
import { UserCardForUser } from "@/types/IUserCardProps";

type ImagesGridProps = {
  user: UserCardForUser;
  sub: string;
  loadUser: (sub: string) => void;
  session: Session | null;
};
const ImagesGrid = ({ user, sub, loadUser, session }: ImagesGridProps) => {
  const [uploadVisibility, setUploadVisibility] = useState(false);
  const [playerVisibility, setPlayerVisibility] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [deleteMode, setDeleteMode] = useState(false);
  const [currentImages, setCurrentImages] = useState<Media[]>(
    user.images as Media[]
  );

  const toggleUploadOverlay = (uploaded: boolean) => {
    if (uploaded) {
      loadUser(sub);
    }
    setUploadVisibility(!uploadVisibility);
  };

  const togglePlayerOverlay = (imageId?: number) => {
    const image = user.images?.find((i) => i.id === imageId);
    imageId
      ? setCurrentImageIndex(user.images!.indexOf(image as Media))
      : setCurrentImageIndex(0);
    setPlayerVisibility(!playerVisibility);
  };

  const toggleDeleteable = () => setDeleteMode(!deleteMode);

  const nextImage = () => {
    let newIndex =
      currentImageIndex === user.images!.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  const previousImage = () => {
    let newIndex =
      currentImageIndex === 0 ? user.images!.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const removeImage = (uri: string) => {
    const imageToDelete = currentImages?.findIndex((image) => image.uri == uri);
    const arrayToRemove = [...currentImages];
    arrayToRemove.splice(imageToDelete, 1);

    setCurrentImages(arrayToRemove);
  };

  return (
    <article className="mt-10 flex flex-col items-center bg-gray-50 rounded-t-lg border-2 border-b-2 py-4 h-screen">
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
          images={user.images}
          currentImageIndex={currentImageIndex}
        />
      )}

      {session && session?.user?.sub === user.sub && (
        <MediaDeleteButtons
          toggleUploadOverlay={toggleUploadOverlay}
          toggleDeleteable={toggleDeleteable}
          deleteMode
        />
      )}
      <div className="lg:mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl-grid-cols-4 gap-1 px-2 lg:px-4 items-center border">
        {user.images?.map((elm, i) => {
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
