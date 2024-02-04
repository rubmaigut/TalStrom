import React, { ReactNode } from 'react';
import { UserCardForUser } from '@/types/IUserCardProps';
import Image from 'next/image';

interface UserCardProps {
  user: UserCardForUser;
}

const userCard: React.FC<UserCardProps> = ({ user }) => (
  <>
    <p>
      <Image src={user.picture} alt="Profile" width={96} height={96} />
    </p>
    <p>ID: {user.id}</p>
    <p>Name: {user.name}</p>
    <p>Email: {user.email}</p>
    <p>Role: {user.role}</p>
    <p>Phone Number: {user.phoneNumber || 'Not available'}</p>
    {/* <p>Date Added: {formatDate(user.dateAdded)}</p> */}
    <p>Followers: {user.followers ? 'Yes' : '10'}</p>
    <p>Following: {user.following ? 'Yes' : 'No'}</p>
    <p>Posts: {user.posts ? 'Yes' : 'No'}</p>
  </>
);

export default userCard;
