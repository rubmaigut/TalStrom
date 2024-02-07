import React from 'react';
import { IoAddCircleSharp, IoTrashBinSharp } from "react-icons/io5";


interface MediaDeleteButtonProps {
  toggleUploadOverlay: (status: boolean) => void,
    deleteMode: boolean,
    toggleDeleteable: () => void
}

const MediaDeleteButtons = ({ toggleUploadOverlay, deleteMode, toggleDeleteable } : MediaDeleteButtonProps) => {
  return (
    <div id="confirm-delete-buttons" className="flex justify-left mt-1">
        <button
          className="m-1 flex justify-center items-center h-[40px] w-[40px] rounded-md shadow-sm bg-slate-200 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none"
          onClick={() => toggleUploadOverlay(false)}
        >
          <IoAddCircleSharp size={20} />
        </button>
        <button
          type="button"
          className={`m-1 flex justify-center items-center h-[40px] w-[40px] rounded-md shadow-sm ${deleteMode ? "bg-red-200" : "bg-gray-200"} text-sm font-medium hover:bg-red-300 md:flex-none`}
          onClick={toggleDeleteable}
        >
          <IoTrashBinSharp size={20}/>
        </button>
      </div>
  );
};

export default MediaDeleteButtons;
