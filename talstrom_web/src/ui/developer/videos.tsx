import { useState } from "react";
import VideoItem from "../atoms/video-item";
import UploadContainer from "../overlays/upload-media";
import VideoPlayer from "../overlays/video-player";
import MediaDeleteButtons from "../atoms/profile/media-delete-buttons";
import { Session } from "next-auth";
import { UserCardForUser } from "@/types/IUserCardProps";

type VideosGridProps = {
  user: UserCardForUser
  sub: string;
  loadUser: (sub: string) => void;
  session: Session | null
};

const VideosGrid = ({ user, sub, loadUser, session }: VideosGridProps) => {
  const [uploadVisibility, setUploadVisibility] = useState(false);
  const [playerVisibility, setPlayerVisibility] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [deleteMode, setDeleteMode] = useState(false);
  const [currentVideos, setCurrentVideos] = useState<Media[]>(
    user.videos as Media[]
  );

  const toggleUploadOverlay = (uploaded: boolean) => {
    if (uploaded) loadUser(sub);
    setUploadVisibility(!uploadVisibility);
  };

  const togglePlayerOverlay = (videoId?: number) => {
    const video = currentVideos?.find((v) => v.id === videoId);
    videoId
      ? setCurrentVideoIndex(currentVideos!.indexOf(video as Media))
      : setCurrentVideoIndex(0);
    setPlayerVisibility(!playerVisibility);
  };

  const toggleDeleteable = () => setDeleteMode(!deleteMode);

  const nextVideo = () => {
    let newIndex =
      currentVideoIndex === currentVideos!.length - 1
        ? 0
        : currentVideoIndex + 1;
    setCurrentVideoIndex(newIndex);
  };

  const previousVideo = () => {
    let newIndex =
      currentVideoIndex === 0
        ? currentVideos!.length - 1
        : currentVideoIndex - 1;
    setCurrentVideoIndex(newIndex);
  };

  const removeVideo = (uri: string) => {
    const videoToDelete = currentVideos?.findIndex((video) => video.uri == uri);
    const arrayToRemove = [...currentVideos];
    arrayToRemove.splice(videoToDelete, 1);

    setCurrentVideos(arrayToRemove);
  };

  return (
    <article className="mt-10 flex flex-col items-center bg-gray-50 rounded-t-lg border-2 border-b-2 py-4 h-screen">
      {uploadVisibility && (
        <UploadContainer
          closeWindow={toggleUploadOverlay}
          sub={sub}
          mediaType="Video"
        />
      )}
      {playerVisibility && (
        <VideoPlayer
          nextVideo={nextVideo}
          previousVideo={previousVideo}
          closeWindow={togglePlayerOverlay}
          videos={currentVideos}
          currentVideoIndex={currentVideoIndex}
        />
      )}
      {session && session?.user?.sub === user.sub && (
      <MediaDeleteButtons toggleUploadOverlay={toggleUploadOverlay} toggleDeleteable={toggleDeleteable} deleteMode />
      )}
      <div className="lg:mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl-grid-cols-4 gap-1 px-2 lg:px-4 items-center border">
        {currentVideos?.map((elm, i) => {
          return (
            <VideoItem
              key={i}
              videoItem={elm}
              openPlayer={togglePlayerOverlay}
              deleteMode={deleteMode}
              removeVideoFromGrid={removeVideo}
            />
          );
        })}
      </div>
    </article>
  );
};

export default VideosGrid;
