import React, { useState } from 'react';

interface AddPostOverlayProps {
  onAddPost: (title: string, content: string, postType: string) => void;
  onCancelClick: () => void;
}

const AddPostOverlay: React.FC<AddPostOverlayProps> = ({
  onAddPost,
  onCancelClick,
}) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [postType, setPostType] = useState<string>('JobPost'); // Default post type, you can set it to whatever makes sense as a default

  const handleAddPostClick = () => {
    onAddPost(title, content, postType);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4">Add New Post</h2>

        <div className="mb-4">
          <label
            htmlFor="postType"
            className="block text-sm font-medium text-gray-700"
          >
            Post Type
          </label>
          <select
            id="postType"
            name="postType"
            className="mt-1 p-2 border rounded-md w-full"
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
          >
            <option value="JobPost">Job Post</option>
            <option value="Article">Article</option>
            <option value="Thought">Thought</option>
            <option value="Challenge">Challenge</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 p-2 border rounded-md w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            className="mt-1 p-2 border rounded-md w-full"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={handleAddPostClick}
          >
            Add Post
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
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
