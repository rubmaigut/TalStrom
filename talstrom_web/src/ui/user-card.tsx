import React from 'react';
import { UserCardForUser } from '@/types/IUserCardProps';
import EditProfile from './profile/edit-profile';

interface UserCardProps {
  user: UserCardForUser;
}
const userCard = ({user}: UserCardProps) => (
  <div className="relative max-w-2xl mx-auto my-3">
    <div className="flex justify-center max-w-2xl items-center text-sm">
      <EditProfile user={user}/>
    </div>
  </div>
);

export default userCard;
