import { fetchUsersByFilter } from '@/lib/data-user';
import { UserCardForUser } from '@/types/IUserCardProps';
import React from 'react';
import { useEffect, useState } from 'react';
import VideoPlayer from '../overlays/video-player';
import { fetchAllOfMediaType } from '@/lib/data-video';

type FindMatchProps = {
  sub: string;
  filterOptions: string[];
};

type FilterItem = {
  label: string;
  status: boolean;
};

const UserFindMatch = ({ sub, filterOptions }: FindMatchProps) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [playerVisibility, setPlayerVisibility] = useState(false);
  const [currentVideos, setCurrentVideos] = useState<Media[]>([]);
  const randVideoId = Math.floor(Math.random() * currentVideos.length);
  const initial: FilterItem[] = filterOptions.map((technology) => {
    return {
      label: technology,
      status: true,
    };
  });

  const [filterArray, setFilterArray] = useState<FilterItem[]>(initial);

  useEffect(() => {
    const loadSuggestions = async () => {
      const users: UserCardForUser[] = await fetchUsersByFilter(sub);
      const videos = await fetchAllOfMediaType("Video");
      setCurrentVideos(videos);
    };

    loadSuggestions();
  }, []);


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

  const togglePlayerOverlay = (videoId?: number) => {
    const video = currentVideos?.find((v) => v.id === videoId);
    videoId
      ? setCurrentVideoIndex(currentVideos!.indexOf(video as Media))
      : setCurrentVideoIndex(0);
    setPlayerVisibility(!playerVisibility);
  };

  return (
    <section className="flex items-center justify-center py-4">
      {filterOptions.length && (
        <div className="flex flex-col items-center w-full md:w-3/5 pb-4">
          <button className="border p-2 rounded-md bg-green-300" onClick={() => togglePlayerOverlay(randVideoId)}>View Videos</button>
          {playerVisibility && (
            <VideoPlayer
              nextVideo={nextVideo}
              previousVideo={previousVideo}
              closeWindow={togglePlayerOverlay}
              videos={currentVideos}
              currentVideoIndex={currentVideoIndex}
            />)}
        </div>
      )}
    </section>
  );
};

export default UserFindMatch;
