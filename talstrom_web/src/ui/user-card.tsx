import React, { ReactNode } from 'react';
import { UserCardForUser } from '@/types/IUserCardProps';
import Image from 'next/image';

interface UserCardProps {
  user: UserCardForUser;
}
const userCard: React.FC<UserCardProps> = ({ user }) => (
  <div className="relative max-w-2xl mx-auto my-3">
    <div className="flex justify-between items-center text-sm">
      <Image
        src={`${user?.picture}`}
        alt={`Photo profile${user?.name}`}
        width={40}
        height={40}
        priority
      />
      <div className="flex items-center ml-4">
        <div className="text-center mr-4" style={{ width: '100px' }}>
          <p className="mb-0.5">
            {user.followers ? user.followers.length : '0'}
          </p>
          <p className="text-sm">Followers</p>
        </div>
        <div className="text-center mr-4" style={{ width: '100px' }}>
          <p className="mb-0.5">
            {user.following ? user.following.length : '0'}
          </p>
          <p className="text-sm">Following</p>
        </div>
        <div className="text-center mr-4" style={{ width: '100px' }}>
          <p className="mb-0.5">{user.posts ? user.posts.length : 'No'}</p>
          <p className="text-sm">Posts</p>
        </div>
      </div>
    </div>
    <div className="flex-1 min-w-0 mt-4 ml-4">
      <p className="text-sm font-medium text-gray-600 truncate">{user.name}</p>
      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
        {user.email}
      </p>
    </div>
    <div className="ml-4">
      <p className="mt-2">Role: {user.role}</p>
      <p className="mt-2">
        Phone Number: {user.phoneNumber || 'Not available'}
      </p>
    </div>
    <div className="rounded border p-4 mb-4 mt-2">
      <p>Technologies: {user.technologies || 'Not available'}</p>
    </div>
  </div>
);

export default userCard;
