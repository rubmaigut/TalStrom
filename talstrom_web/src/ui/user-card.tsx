import React from 'react';
import { UserCardForUser } from '@/types/IUserCardProps';
import EditProfile from './profile/edit-profile';

interface UserCardProps {
  user: UserCardForUser;
}
const userCard: React.FC<UserCardProps> = () => (
  <div className="relative max-w-2xl mx-auto my-3">
    <div className="flex justify-between max-w-2xl items-center text-sm">
      <EditProfile />
    </div>
  </div>
);

export default userCard;
