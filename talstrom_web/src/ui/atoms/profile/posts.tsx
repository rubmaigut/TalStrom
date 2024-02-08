import React, { useState } from 'react';
import PostOverlay from '@/ui/overlays/post-viewer';
import AddPostOverlay from '@/ui/overlays/add-post-overlay';
import { addNewPostHandler, deleteUserPost, updateUserPost } from '@/lib/data-post';
import { Session } from 'next-auth';

interface PostsProps {
  postType?: string;
  sub: string;
  posts: Post[];
  session: Session | null
}

const UserPost: React.FC<PostsProps> = ({ posts, sub, session }) => {
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

  const handleAddPost = async (title: string, content: string, postType: string) => {
    try {
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
        const response = await updateUserPost(
          selectedPost.id,
          editedTitle,
          editedContent,
          selectedPost.postType,
          sub,
          selectedPost.recruiterName
        );

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
        await deleteUserPost(selectedPost.id);

        setEditMode(false);
        setSelectedPost(null);
      } catch (error) {
        console.error('Failed to delete post', error);
      }
    }
  };

  return (
    <div className="w-full py-4">
      <div className='flex '>
      <h2 className="text-2xl font-bold text-gray-600 pr-8">Post</h2>
      <button className="w-6 rounded-full bg-teal-500 p-2 text-white float-left mb-3" onClick={handleAddPostClick}> + </button>
      </div>

      {posts.map((post) => (
        <div
          key={post.id}
          className={`w-full p-4 border rounded-md ${
            post.postType === 'JobPost'
              ? 'bg-teal-100'
              : post.postType === 'Thoughts'
              ? 'bg-green-100'
              : 'bg-white-100'
          }`}
          onClick={() => handlePostEditClick(post)}
        >
          <p className="text-xl font-bold mb-2">{post.title}</p>
          <p>{post.content}</p>
          <div className="mt-4 flex items-center justify-between">
            {post.author && post.author !== 'string' && (
              <p className="text-gray-600 text-xs">{post.author}</p>
            )}
            <p className="text-gray-600 text-xs">{post.createdAt}</p>
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
          onAddPost={(title, content, postType) => handleAddPost(title, content, postType)}
          onCancelClick={handleAddPostCancelClick}
        />
      )}
    </div>
  );
};

export default UserPost;
