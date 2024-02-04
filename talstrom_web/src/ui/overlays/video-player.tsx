import { fetchUsersBySub, fetchVideoById } from "@/lib/data";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

type VideoPlayerProps = {
videos: Video[] | undefined;
closeWindow: () => void;
}

const VideoPlayer = ({videos, closeWindow} : VideoPlayerProps ) => {
  const [uri, setUri] = useState("");
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const postId = searchParams.get("video");

  useEffect(() => {
    const fetchVideo = async () => {
      if (postId) {
        const video = await fetchVideoById(postId as string);
        setUri(video.uri);
      }
    };

    fetchVideo();
  }, [postId]);
  
  const loopThroughPostsUp = () => {};

  const loopThroughPostsDown = () => {};

  return (
    <div
      id="video-player"
      className="lg:flex justify-between w-full h-screen bg-black overflow-auto"
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
        

        <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
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
