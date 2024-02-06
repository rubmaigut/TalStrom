import { updateUserPost } from '@/lib/data';
import React, { useState } from 'react';
import PostOverlay from '../overlays/post-viewer';

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
          onClick={() => handlePostEditClick(post)}
        >
          <p className="text-sm text-gray-500">{post.postType}</p>
          <h1 className="text-xl font-bold mb-2">{post.title}</h1>
          <div className="mt-4 flex items-center justify-between">
            {post.author && post.author !== 'string' && (
              <p className="text-gray-600">{post.author}</p>
            )}
            <p className="text-gray-600">{post.createdDate}</p>
          </div>
        </div>
      ))}

      {selectedPost && (
        <PostOverlay
          post={selectedPost}
          isEditMode={isEditMode}
          editedContent={editedContent}
          onEditClick={() => setEditMode(true)}
          onSaveClick={handlePostSaveClick}
          onCancelClick={handlePostCancelClick}
          onContentChange={setEditedContent}
        />
      )}
    </div>
  );
};

export default UserPost;
