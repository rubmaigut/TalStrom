import { addNewPost, deleteUserPost, updateUserPost } from '@/lib/data';
import React, { useState } from 'react';
import PostOverlay from '../overlays/post-viewer';
import AddPostOverlay from '../overlays/add-post-overlay';

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
  const [isAddPostMode, setAddPostMode] = useState<boolean>(false);

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

  const handleAddPost = async (content: string) => {
    try {
      await addNewPost(content);
      // const updatedPosts = await fetchPosts();
      // setPosts(updatedPosts);
      setAddPostMode(false);
    } catch (error) {
      console.error('Failed to add new post', error);
    }
  };

  const handlePostCancelClick = () => {
    setEditedContent(selectedPost?.content || '');
    setEditMode(false);
    setSelectedPost(null);
  };

  const handleAddPostClick = () => {
    setAddPostMode(true);
  };

  const handleAddPostCancelClick = () => {
    setAddPostMode(false);
  };

  const handlePostDeleteClick = async () => {
    if (selectedPost) {
      try {
        // Delete the post
        await deleteUserPost(String(selectedPost.id));

        // Clear the selectedPost and exit edit mode after successful deletion
        setEditMode(false);
        setSelectedPost(null);
      } catch (error) {
        console.error('Failed to delete post', error);
      }
    }
  };
  return (
    <div className="w-[calc(100%-50px)] mx-auto px-4">
      <button onClick={handleAddPostClick}>Add Post</button>

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
        ></div>
      ))}

      {selectedPost && (
        <PostOverlay
          post={selectedPost}
          isEditMode={isEditMode}
          editedContent={editedContent}
          onEditClick={() => setEditMode(true)}
          onSaveClick={handlePostSaveClick}
          onDeleteClick={handlePostDeleteClick}
          onCancelClick={handlePostCancelClick}
          onContentChange={setEditedContent}
        />
      )}

      {isAddPostMode && (
        <AddPostOverlay
          onAddPost={handleAddPost}
          onCancelClick={handleAddPostCancelClick}
        />
      )}
    </div>
  );
};

export default UserPost;
