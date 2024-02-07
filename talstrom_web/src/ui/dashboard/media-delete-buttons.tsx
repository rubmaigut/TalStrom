import React from 'react';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
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
          className="m-1 p-4 h-[48px] rounded-md shadow-sm bg-green-200 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:px-3"
          onClick={() => toggleUploadOverlay(false)}
        >
          <IoAddCircleSharp size={20} />
        </button>
        <button
          type="button"
          className={`m-1 shadow-sm p-1 h-[48px] rounded-md ${
            deleteMode ? "bg-gray-300" : "bg-red-200"
          } text-sm px-4 font-medium md:flex-none md:justify-start md:px-3`}
          onClick={toggleDeleteable}
        >
          <IoTrashBinSharp size={20}/>
        </button>
      </div>
  );
};

export default MediaDeleteButtons;
