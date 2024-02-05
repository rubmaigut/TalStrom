import React, { ReactNode } from 'react';
import { UserCardForUser } from '@/types/IUserCardProps';
import Image from 'next/image';

interface UserCardProps {
  user: UserCardForUser;
}
const userCard: React.FC<UserCardProps> = ({ user }) => (
  <>
    <div>
      <Image
        src={`${user?.picture}`}
        alt={`Photo profile${user?.name}`}
        className="rounded-full"
        width={40}
        height={40}
        priority
      />
      <p>Followers: {user.followers ? 'Yes' : '10'}</p>
      <p>Following: {user.following ? 'Yes' : 'No'}</p>
      <p>Posts: {user.posts ? 'Yes' : 'No'}</p>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-600 truncate">{user.name}</p>
      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
        {user.email}
      </p>
    </div>
    <div>
      <p>Role: {user.role}</p>
      <p>Phone Number: {user.phoneNumber || 'Not available'}</p>
    </div>
  </>
);

export default userCard;
