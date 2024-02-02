import React, { useEffect, useState } from 'react';
import UserRoleBarChart from './userRoleBarChart';
import { User } from '@/types/IUser';
import { fetchUsers } from '@/lib/data';

const AdminActivity: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers()
      .then((users) => {
        setUsers(users);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch users:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(roleCounts),
    datasets: [
      {
        label: 'Users by Role',
        data: Object.values(roleCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
      },
    ],
  };

  return (
    <div>
      <h3 className='font-semibold leading-none text-gray-600'>Activity</h3>
      <UserRoleBarChart data={chartData} />
    </div>
  );
};

export default AdminActivity;
