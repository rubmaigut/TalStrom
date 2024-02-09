import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface AddPostOverlayProps {
  onAddPost: (title: string, content: string, postType: string) => void;
  onCancelClick: () => void;
}

const AddPostOverlay: React.FC<AddPostOverlayProps> = ({
  onAddPost,
  onCancelClick,
}) => {
  const { data: session } = useSession();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [postType, setPostType] = useState<string>("Thought");

  const handleAddPostClick = () => {
    onAddPost(title, content, postType);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-lg mx-auto mt-20 p-6">
        <div className="flex flex-col items-center justify-between border-b pb-3">
          <div className="flex justify-between items-center">
            <Image
              src={`${session?.user?.image}`}
              alt="Profile"
              width={100}
              height={100}
              className=" h-10 w-10 rounded-full mr-3"
            />
            <div>
              <div className="font-medium text-lg">{session?.user?.name}</div>
              <div className="text-gray-500 text-sm">Post to Anyone</div>
            </div>
          <button
            className="rounded-full p-2 text-gray-500 hover:bg-gray-200 transition duration-150"
            onClick={onCancelClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          </div>
          <div className="w-full my-4">
            <label
              htmlFor="postType"
              className="block text-sm font-medium text-gray-600"
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
              <option value="Thought">Thought</option>
              <option value="Challenge">Challenge</option>
            </select>
          </div>
          <div className="w-full my-4">
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

          <div className="w-full my-4">
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
    </div>
  );
};

export default AddPostOverlay;
