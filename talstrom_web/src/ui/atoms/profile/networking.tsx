import React, { useEffect, useState } from 'react';
import { UserCardForUser } from '@/types/IUserCardProps';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/outline';
import { fetchUsersByRole } from '@/lib/data-user';

const UserMyNetwork = () => {
  const [users, setUsers] = useState<UserCardForUser[]>([]);
  const [starredUsers, setStarredUsers] = useState<UserCardForUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchUsersByRole('developer');
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users by role:', error);
      }
    };

    fetchData();
  }, []);

  const handleStarClick = (userId: number) => {
    const userToStar = users.find((user) => user.id === userId);

    if (userToStar) {
      setStarredUsers((prevStarredUsers) => [...prevStarredUsers, userToStar]);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="flex items-center justify-center flex-col mt-10 py-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex flex-col justify-center space-x-2 md:space-x-4 w-full md:w-3/5 pb-4"
        >
          <div className="flex items-center justify-center">
            <div className="flex-shrink-0">
              <img
                src={user.picture}
                alt={`Photo profile ${user.name}`}
                className="rounded-full"
                width={32}
                height={32}
              />
            </div>
            <div className="flex-1 min-w-0 mx-1">
              <p className="text-sm font-medium text-gray-600 truncate">
                {user.name}
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {user.email}
              </p>
            </div>
            <button
              onClick={() => handleStarClick(user.id)}
              className="bg-yellow-400 text-white px-2 py-2 rounded flex items-center"
            >
              <SolidStarIcon className="w-5 h-5 mr-1" />
            
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserMyNetwork;
