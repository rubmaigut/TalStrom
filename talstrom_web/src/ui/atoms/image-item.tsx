import { deleteMedia } from "@/lib/data-video";
import Image from 'next/image';
import { SyntheticEvent, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

type ImageItemProps = {
  imageItem: Media;
  openPlayer: (imageId?: number) => void;
  deleteMode: boolean;
  removeImageFromGrid: (uri: string) => void;
};

export default function ImageItem({
  imageItem,
  openPlayer,
  deleteMode,
  removeImageFromGrid,
}: ImageItemProps) {
  const [confirmBoxVisibility, setConfirmBoxVisibility] = useState(false);

  const openPlayerHandler = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLElement;
    openPlayer(parseInt(target.id.split("-")[1]));
  };

  const confirmDelete = async () => {
    removeImageFromGrid(imageItem.uri);
    await deleteMedia("Image", imageItem.title);
    setConfirmBoxVisibility(!confirmBoxVisibility)
  };

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
        <div  className="border" onClick={openPlayerHandler}>
          <Image
            id={`image-${imageItem.id}`}
            width={200}
            height={20}
            className="aspect=[3/4] object-cover rounded-none"
            src={imageItem.uri}
            alt={`image-${imageItem.id}`}
          />
        </div>
      )}
      {deleteMode && (
        <div
          className="absolute top-[4px] right-[10px] bg-black hover:bg-red-500 rounded-full"
          onClick={() => setConfirmBoxVisibility(!confirmBoxVisibility)}
        >
          <TiDeleteOutline size={30} color="white" />
        </div>
      )}
      {confirmBoxVisibility && (
    <div className="absolute top-[8%] left-[20%] md:left-[32%] md:top-[18%] rounded-md bg-white p-3 flex flex-col">
      <h3> Delete Image?</h3>
      <div
        id="confirm-delete-buttons"
        className="flex justify-between mt-1"
      >
        <button
          className="h-[48px] px-3 rounded-md bg-green-200 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start"
          onClick={confirmDelete}
        >
          Yes
        </button>
        <button
          className="h-[48px] px-3 rounded-md bg-red-200 text-sm font-medium hover:bg-red-300 hover:text-red md:flex-none md:justify-start"
          onClick={() => setConfirmBoxVisibility(!confirmBoxVisibility)}
        >
          No
        </button>
      </div>
    </div>
  )}
    </div>
  );
}
