import React, { useEffect, useState } from 'react';
import { UserCardForUser } from '@/types/IUserCardProps';
import { PlusIcon } from '@heroicons/react/24/outline';
import { addFavorite, fetchUsersByRole, fetchUsersBySub } from '@/lib/data-user';
import { useUser } from '@/context/UserContext';

const UserMyNetwork = () => {
  const [users, setUsers] = useState<UserCardForUser[]>([]);
  const { userContextG, updateUser } = useUser()

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
  const currentSub = userContextG.sub

  const handleStarClick = async (favoriteSub: string) => {
    await addFavorite(currentSub, favoriteSub)
    const updateFav = await fetchUsersBySub(currentSub)
    updateUser(updateFav.favorites)
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center flex-col mt-10 py-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center flex-col p-4 my-1 w-ful relative"
        >
          <div className="bg-gradient-to-r from-green-300 to-teal-300 h-12 w-full max-w-80 flex justify-center items-center absolute rounded-lg"></div>
          <div className="w-full max-w-80 flex flex-col lg:p-0 justify-center items-center top-28 bg-white border shadow-lg rounded-lg overflow-hidden">
            <div className="flex-shrink-0 my-4">
              <img
                src={user.picture}
                alt={`Photo profile ${user.name}`}
                className="rounded-full z-20 relative"
                width={70}
                height={70}
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
              onClick={() => handleStarClick(user.sub)}
              className="p-3 rounded-full flex items-center my-6 border border-teal-900 "
            >
              <PlusIcon className="w-5 h-5 mr-1" />
              Connect
            
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserMyNetwork;
