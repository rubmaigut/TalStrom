import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

type VideoPlayerProps = {
  videos: Media[] | undefined;
  currentVideoIndex: number | null;
  closeWindow: () => void;
  nextVideo: () => void;
  previousVideo: () => void;
};

const VideoPlayer = ({
  videos,
  currentVideoIndex,
  closeWindow,
  nextVideo,
  previousVideo,
}: VideoPlayerProps) => {
  const [uri, setUri] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      if (!currentVideoIndex) currentVideoIndex = 0;
      setUri(videos![currentVideoIndex].uri);
    };

    fetchVideo();
  }, [currentVideoIndex]);

  return (
    <div
      id="video-player"
      className="fixed z-10 left-0 top-0 lg:flex justify-center w-full h-screen bg-black bg-opacity-80 overflow-auto"
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
            onClick={previousVideo}
            className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
          >
            <BiChevronUp size="25" color="fff" />
          </button>

          <button
            onClick={nextVideo}
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
