import { FC } from "react";

type PostsProps = {
    posts: Post[] | undefined;
}
const Posts : FC<PostsProps> = ({posts}) => {

    if(posts && posts.length) return (
      <div>
        <p>Posts</p>
        {posts.map((post, i) =>  {
            return (
            <div key={`post-${i}`} className="container mx-auto my-2 p-2 border border-black rounded-md">
              <h1>{post.title}</h1>
              <p>{post.content}</p>
            </div>
            )
        })}
      </div>
    );
  };


  export default Posts;