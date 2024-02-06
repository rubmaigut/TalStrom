import { updateUserPost } from '@/lib/data';
import React, { useState } from 'react';

type Post = {
  id: number;
  postType: string;
  title: string;
  content: string;
  author: string;
  createdDate: string;
};

interface PostsProps {
  posts: Post[];
}

const UserPost: React.FC<PostsProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>('');

  const handlePostEditClick = (post: Post) => {
    setSelectedPost(post);
    setEditedContent(post.content);
    setEditMode(true);
  };

  const handlePostSaveClick = async () => {
    if (selectedPost) {
      try {
        await updateUserPost(selectedPost.id, editedContent);
        setEditMode(false);
        setSelectedPost(null);
      } catch (error) {
        console.error('Failed to update post', error);
      }
    }
  };

  const handlePostCancelClick = () => {
    setEditedContent(selectedPost?.content || '');
    setEditMode(false);
    setSelectedPost(null);
  };

  return (
    <div className="w-[calc(100%-50px)] mx-auto px-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className={`p-6 border rounded-md mb-4 ${
            post.postType === 'Type1'
              ? 'bg-blue-100'
              : post.postType === 'Type2'
              ? 'bg-green-100'
              : 'bg-white-100'
          }`}
        >
          <p className="text-sm text-gray-500">{post.postType}</p>
          <h1 className="text-xl font-bold mb-2">{post.title}</h1>
          {isEditMode ? (
            <textarea
              className="w-full h-32 p-2 border border-gray-300 rounded-md"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
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
                onClick={handlePostSaveClick}
              >
                Save
              </button>
              <button
                className="px-4 py-2 text-white bg-red-500 rounded-md"
                onClick={handlePostCancelClick}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md"
              onClick={() => handlePostEditClick(post)}
            >
              Edit
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserPost;
