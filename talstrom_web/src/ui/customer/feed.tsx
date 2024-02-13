import { fetchUsersByFilter } from "@/lib/data-user";
import { UserCardForUser } from "@/types/IUserCardProps";
import React from "react";
import { useEffect, useState } from "react";

type FindMatchProps = {
  sub: string;
};

const UserFeed = ({ sub }: FindMatchProps) => {
  const [selectedVideo, setSelectedVideo] = useState<Media[] | null>(
    [] || null
  );
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  const [usersWithVideos, setUsersWithVideos] = useState<UserCardForUser[]>([]);

  const handleVideoClick = (video: Media[]) => {
    setSelectedVideo(video);
    setOverlayVisible(true);
  };

  const closeOverlay = () => {
    setSelectedVideo(null);
    setOverlayVisible(false);
  };

  useEffect(() => {
    const loadSuggestions = async () => {
      const users: UserCardForUser[] = await fetchUsersByFilter(sub);
      const usersWithVideosTemp = users.filter(
        (user) => user.videos && user.videos.length > 0
      );
      setUsersWithVideos(usersWithVideosTemp);
    };

    loadSuggestions();
  }, [sub]);

  return (
    <section className="flex flex-col items-center justify-center py-4 my-4">
       {overlayVisible && selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center">
          <button onClick={closeOverlay} className="absolute top-4 right-4 text-white text-2xl">&times;</button>
          <video controls autoPlay className="h-auto max-w-md max-h-full" src={selectedVideo[0].uri}>
          </video>
        </div>
      )}

      {usersWithVideos.map((user) => (
        <div
            key={user.id}
            className="flex flex-col items-center w-full h-full rounded-xl pb-4 border border-teal-900 my-4"
          >
            <div className="flex items-center w-full p-4">
              <img
                src={user.picture}
                alt={user.name}
                className="rounded-full w-12 h-12"
              />
              <div className="flex flex-col text-gray-600 ml-2">
                <span>{user.name}</span>
                <span className="text-xs">{user.position}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {user.videos?.map((video,index) => (
                <div key={index}
                  className="w-full h-full rounded-lg cursor-pointer"
                  onClick={() => handleVideoClick([video])}
                >
                  <video className="aspect-[6/9] object-cover rounded-none px-2" controls>
                    <source
                      src={video.uri}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
        </div>
      ))}
    </section>
  );
};

export default UserFeed;
