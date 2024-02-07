import React from 'react';

const UserSaved = () => {
  const hardcodedUsers: {
    id: number;
    name: string;
    email: string;
    picture: string;
  }[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      picture: 'https://placekitten.com/32/32', 
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      picture: 'https://placekitten.com/33/33',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      picture: 'https://placekitten.com/34/34',
    },
    {
      id: 4,
      name: 'Alice Williams',
      email: 'alice.williams@example.com',
      picture: 'https://placekitten.com/35/35',
    },
    {
      id: 5,
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      picture: 'https://placekitten.com/36/36',
    },
    {
      id: 6,
      name: 'Eva Davis',
      email: 'eva.davis@example.com',
      picture: 'https://placekitten.com/37/37',
    },
  ];

  return (
    <div>
      <p>Saved</p>
      {hardcodedUsers.map((user) => (
        <div key={user.id} className="flex flex-col justify-center space-x-2 md:space-x-4 md:w-3/5 pb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <img src={user.picture} alt={`Photo profile ${user.name}`} className="rounded-full" width={32} height={32} />
            </div>
            <div className="flex-1 min-w-0 mx-1">
              <p className="text-sm font-medium text-gray-600 truncate">{user.name}</p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserSaved;
