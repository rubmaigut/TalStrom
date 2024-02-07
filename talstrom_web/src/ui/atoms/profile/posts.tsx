import React, { useState } from 'react';
import { addNewPostHandler, deleteUserPost, updateUserPost } from '@/lib/data-user';
import PostOverlay from '@/ui/overlays/post-viewer';
import AddPostOverlay from '@/ui/overlays/add-post-overlay';

interface PostsProps {
  postType: string;
  sub: string;
  posts: Post[];
}

const UserPost: React.FC<PostsProps> = ({ posts, sub, postType }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedContent, setEditedContent] = useState<string>('');
  const [isAddPostMode, setAddPostMode] = useState<boolean>(false);

  const handlePostEditClick = (post: Post) => {
    setSelectedPost(post);
    setEditedTitle(post.title);
    setEditedContent(post.content);
    setEditMode(true);
  };

  const handleAddPost = async (title: string, content: string) => {
    try {
      console.log('Adding post:', title, content);

      if (content.trim() !== '') {
        const response = await addNewPostHandler(title, content, sub, postType);
        console.log('Add Post Response:', response);
        setAddPostMode(false);
      }
    } catch (error) {
      console.error('Failed to add new post', error);
    }
  };

  const handlePostSaveClick = async () => {
    if (selectedPost) {
      try {
        console.log(
          'Updating post:',
          selectedPost.id,
          editedTitle,
          editedContent,
          selectedPost.postType,
        );

        const response = await updateUserPost(
          selectedPost.id,
          editedTitle,
          editedContent,
          selectedPost.postType,
          sub,
        );
        console.log('Update Post Response:', response);

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
        await deleteUserPost(selectedPost.id);

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
            post.postType === 'JobPost'
              ? 'bg-blue-100'
              : post.postType === 'Type2'
              ? 'bg-green-100'
              : 'bg-white-100'
          }`}
          onClick={() => handlePostEditClick(post)}
        >
          <p className="text-xl font-bold mb-2">{post.title}</p>
          <p>{post.content}</p>
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
          editedTitle={editedTitle}
          editedContent={editedContent}
          onEditClick={() => setEditMode(true)}
          onSaveClick={handlePostSaveClick}
          onDeleteClick={handlePostDeleteClick}
          onCancelClick={handlePostCancelClick}
          onTitleChange={setEditedTitle}
          onContentChange={setEditedContent}
        />
      )}

      {isAddPostMode && (
        <AddPostOverlay
          onAddPost={(title, content) => handleAddPost(title, content)}
          onCancelClick={handleAddPostCancelClick}
        />
      )}
    </div>
  );
};

export default UserPost;
