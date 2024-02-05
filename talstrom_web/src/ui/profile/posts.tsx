import { Post } from '@/types/Posts';
import { FC } from 'react';

type PostsProps = {
  posts: Post[];
};
const UserPosts: FC<PostsProps> = ({ posts }) => {
  console.log(posts);

    if(posts && posts.length) return (
      <div>
        <p>Video Posts</p>
        {posts.map((post, i) => (
          <div
            key={`post-${i}`}
            className="container mx-auto my-2 p-2 border border-black rounded-md"
          >
            <h1>{post.title}</h1>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    );
  } else {
    return <p>No posts available.</p>;
  }
};

export default UserPosts;
