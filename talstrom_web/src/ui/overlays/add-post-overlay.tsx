import React, { useState } from 'react';

type AddPostOverlayProps = {
  onAddPost: (title: string, content: string) => void;
  onCancelClick: () => void;
};

const AddPostOverlay: React.FC<AddPostOverlayProps> = ({
  onAddPost,
  onCancelClick,
}) => {
  const [newPostTitle, setNewPostTitle] = useState<string>('');
  const [newPostContent, setNewPostContent] = useState<string>('');

  const handleAddClick = () => {
    onAddPost(newPostTitle, newPostContent);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="w-[400px] bg-white p-6 rounded-md">
        <h1 className="text-xl font-bold mb-2">Add New Post</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
        </div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded-md"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <div className="mt-4 flex items-center space-x-2">
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-md"
            onClick={handleAddClick}
          >
            Add
          </button>
          <button
            className="px-4 py-2 text-white bg-gray-500 rounded-md"
            onClick={onCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPostOverlay;
