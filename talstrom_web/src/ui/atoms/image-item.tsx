import Link from "next/link";
import { SyntheticEvent, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type ImageItemProps = {
  imageItem: Media;
  openPlayer: (imageId?: number) => void;
};

export default function ImageItem({ imageItem, openPlayer }: ImageItemProps) {
  const openPlayerHandler = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLElement;
    const index = openPlayer(parseInt(target.id.split("-")[1]));
  };

  console.log(imageItem.uri)
  return (
    <div className="relative brightness-90 hover:brightness-[1.1] cursor-pointer">
      {!imageItem.uri ? (
        <div className="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover  rounded-md bg-black">
          <AiOutlineLoading3Quarters
            className="animate-spin ml-1"
            size="80"
            color="ffffff"
          />
        </div>
      ) : (
        <div onClick={openPlayerHandler}>
          <img
            id={`image-${imageItem.id}`}
            className="aspect=[3/4] object-cover rounded-none"
            src={imageItem.uri}
          />
        </div>
      )}
    </div>
  );
}