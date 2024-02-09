import React from 'react';
import { IoTrashBinSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";



interface MediaDeleteButtonProps {
  toggleUploadOverlay: (status: boolean) => void,
    deleteMode: boolean,
    toggleDeleteable: () => void
}

const MediaDeleteButtons = ({ toggleUploadOverlay, deleteMode, toggleDeleteable } : MediaDeleteButtonProps) => {
  return (
    <div id="confirm-delete-buttons" className="flex justify-left mt-1">
        <button
          className="m-1 flex justify-center items-start p-3 rounded-md shadow-sm bg-slate-200 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none"
          onClick={() => toggleUploadOverlay(false)}
        >
         Add File <FaPlus size={20} className='pl-2'/>
        </button>
        <button
          type="button"
          className={`m-1 flex justify-center items-start p-3 rounded-md shadow-sm ${deleteMode ? "bg-gray-200" : "bg-red-200"} text-sm font-medium hover:bg-red-300 md:flex-none`}
          onClick={toggleDeleteable}
        >
          Delete File <IoTrashBinSharp size={20} className='pl-2'/>
        </button>
      </div>
  );
};

export default MediaDeleteButtons;
