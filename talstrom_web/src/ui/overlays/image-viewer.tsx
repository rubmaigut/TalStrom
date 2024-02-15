import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

type VideoPlayerProps = {
  images: Media[] | undefined;
  currentImageIndex: number | null;
  closeWindow: () => void;
  nextImage: () => void;
  previousImage: () => void;
};

const ImageViewer = ({
  images,
  currentImageIndex,
  closeWindow,
  nextImage,
  previousImage,
}: VideoPlayerProps) => {
  const [uri, setUri] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      if (!currentImageIndex) currentImageIndex = 0;
      setUri(images![currentImageIndex].uri);
    };

    fetchVideo();
  }, [currentImageIndex]);

  return (
    <div
      id="image-viewer"
      className="fixed z-10 left-0 top-0 lg:flex justify-center w-full h-full bg-black bg-opacity-80 overflow-auto mt-20"
    >
      <div className="w-full container mx-auto h-full relative">
        <div
          onClick={closeWindow}
          className="absolute text-white z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <AiOutlineClose size="25" />
        </div>

        <div>
          <button
            onClick={previousImage}
            className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
          >
            <BiChevronUp size="25" color="fff" />
          </button>

          <button
            onClick={nextImage}
            className="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
          >
            <BiChevronDown size="25" color="fff" />
          </button>
        </div>

        <div className="bg-black bg-opacity-50 lg:min-w-[480px] z-10 relative">
          <Image
            id="image-expanded"
            width={500}
            height={500}
            alt="image-expanded"
            className="h-screen mx-auto w-auto"
            src={uri}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
