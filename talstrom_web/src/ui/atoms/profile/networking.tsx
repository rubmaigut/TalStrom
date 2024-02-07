import React, { useEffect, useState } from 'react';
import { UserCardForUser } from '@/types/IUserCardProps';
import { fetchUsersByRole } from '@/lib/data';

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
    <div className="flex items-center justify-center flex-col">
      <p>My Network</p>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex flex-col justify-center space-x-2 md:space-x-4 w-full md:w-3/5 pb-4"
        >
          <div className="flex">
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
              className="bg-yellow-400 text-white px-2 py-1 rounded"
            >
              Star
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserMyNetwork;
