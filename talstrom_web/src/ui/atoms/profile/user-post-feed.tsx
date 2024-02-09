/* import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchUsers } from '@/lib/data-user';
import UserCard, { UserCardProps } from './user-card';
import UserPost from './posts';
import { UserCardForUser } from '@/types/IUserCardProps';

type UserWithPosts = {
  id: number;
  posts: Post[];
}; 

const UserPostsFeed: React.FC = () => {
  const [usersWithPosts, setUsersWithPosts] = useState<UserWithPosts[]>([]);

  useEffect(() => {
    const fetchUsersAndPosts = async () => {
      try {
        const data: UserWithPosts[] = await fetchUsers(); 
        setUsersWithPosts(data);
      } catch (error) {
        console.error("Failed to fetch users and posts", error);
      }
    };

    fetchUsersAndPosts();
  }, []);

  return (
    <div className="space-y-4">
      {usersWithPosts.map((user) => (
        <div key={user.id} className="bg-white shadow rounded-lg overflow-hidden">
          <Link href={`/user/${user.id}`}>
            <a className="p-4 border-b border-gray-200 block">
              <UserCard user={user as unknown as UserCardProps} session={null} updateUser={user as unknown as UserCardProps}/>
            </a>
          </Link>
          <div className="p-4">
            {user.posts.slice(0, 3).map((post) => (
              <div key={post.id} className="mb-4 last:mb-0">
                <UserPost post={post} />
              </div>
            ))}
          </div>
          <div className="p-4 text-right">
            <Link href={`/user/${user.id}/posts`}>
              <a className="text-indigo-600 hover:text-indigo-800 transition ease-in-out duration-150">
                View all posts
              </a>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPostsFeed;
 */