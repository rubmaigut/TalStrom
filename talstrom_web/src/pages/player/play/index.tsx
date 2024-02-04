import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const VideoPlayer = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const postId = searchParams.get("video");

  const loopThroughPostsUp = () => {

  }

  const loopThroughPostsDown = () => {

  }

  return (
    <div
      id="video-player"
      className="lg:flex justify-between w-full h-screen bg-black overflow-auto"
    >
      <div className="lg:w-[calc(100%-540px] h-full relative">
        <Link
          href={`#`}
          className="absolute text-white z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <AiOutlineClose size="25" />
        </Link>

        <div>
          <button onClick={loopThroughPostsUp} className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
            <BiChevronUp size="25" color="fff" />
          </button>

          <button onClick={loopThroughPostsDown} className="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
            <BiChevronDown size="25" color="fff" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
