import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface UserRoleEditorProps {
  userSub: string;
  onDelete: (userSub: string) => void;
  onEdit: (userSub: string) => void; 
}

const UserRoleEditor: React.FC<UserRoleEditorProps> = ({ userSub, onDelete, onEdit }) => {
  return (
    <div className="flex justify-center items-center gap-1">
      <span
        title="Edit"
        className="p-1 text-green-500 rounded-full cursor-pointer"
        onClick={() => onEdit(userSub)}
      >
        <PencilIcon className="w-6" />
      </span>
      <span
        title="Delete"
        className="p-1 text-red-500 rounded-full cursor-pointer"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this user?")) {
            onDelete(userSub);
          }
        }}
      >
        <TrashIcon className="w-6" />
      </span>
    </div>
  );
};

export default UserRoleEditor;
