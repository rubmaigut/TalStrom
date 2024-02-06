import React from 'react';

type PostOverlayProps = {
  post: Post;
  isEditMode: boolean;
  editedContent: string;
  onEditClick: () => void;
  onSaveClick: () => void;
  onCancelClick: () => void;
  onContentChange: (content: string) => void;
};

const PostOverlay: React.FC<PostOverlayProps> = ({
  post,
  isEditMode,
  editedContent,
  onEditClick,
  onSaveClick,
  onCancelClick,
  onContentChange,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="w-[400px] bg-white p-6 rounded-md">
        <p className="text-sm text-gray-500">{post.postType}</p>
        <h1 className="text-xl font-bold mb-2">{post.title}</h1>
        {isEditMode ? (
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded-md"
            value={editedContent}
            onChange={(e) => onContentChange(e.target.value)}
          />
        ) : (
          <p>{post.content}</p>
        )}
        <div className="mt-4 flex items-center justify-between">
          {post.author && post.author !== 'string' && (
            <p className="text-gray-600">{post.author}</p>
          )}
          <p className="text-gray-600">{post.createdDate}</p>
        </div>
        {isEditMode ? (
          <div className="mt-4 flex items-center space-x-2">
            <button
              className="px-4 py-2 text-white bg-green-500 rounded-md"
              onClick={onSaveClick}
            >
              Save
            </button>
            <button
              className="px-4 py-2 text-white bg-red-500 rounded-md"
              onClick={onCancelClick}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md"
            onClick={onEditClick}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default PostOverlay;
