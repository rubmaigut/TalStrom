import { fetchUsersBySub, fetchVideoById } from "@/lib/data";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

type VideoPlayerProps = {
  videos: Video[] | undefined;
  closeWindow: () => void;
  currentVideoIndex: number | null;
  nextVideo: () => void;
  previousVideo: () => void;
};

const VideoPlayer = ({
  videos,
  closeWindow,
  nextVideo,
  previousVideo,
  currentVideoIndex,
}: VideoPlayerProps) => {
  const [uri, setUri] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchVideo = async () => {
      if (currentVideoIndex) {
        setUri(videos![currentVideoIndex].uri);
      }
    };

    fetchVideo();
  });

  if(videos && currentVideoIndex){
      console.log("current: ", videos![currentVideoIndex].id);
  }
  const loopThroughPostsUp = () => {
    previousVideo()
  };

  const loopThroughPostsDown = () => {
    nextVideo();
  };

  return (
    <div
      id="video-player"
      className="fixed z-10 left-0 top-0 lg:flex justify-between w-full h-screen bg-black bg-opacity-80 overflow-auto"
    >
      <div className="lg:w-[calc(100%-540px] h-full relative">
        <div
          onClick={closeWindow}
          className="absolute text-white z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <AiOutlineClose size="25" />
        </div>

        <div>
          <button
            onClick={loopThroughPostsUp}
            className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
          >
            <BiChevronUp size="25" color="fff" />
          </button>

          <button
            onClick={loopThroughPostsDown}
            className="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
          >
            <BiChevronDown size="25" color="fff" />
          </button>
        </div>

        <div className="bg-black bg-opacity-50 lg:min-w-[480px] z-10 relative">
          <video
            autoPlay
            controls
            loop
            muted
            className="h-screen mx-auto"
            src={uri}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
