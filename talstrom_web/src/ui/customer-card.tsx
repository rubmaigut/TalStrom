import React from 'react';
import { User } from '@/types/IUser';
import Image from 'next/image';

interface CustomerCardProps {
  customer: User;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => (
  <>
    <p>ID: {customer.id}</p>
    <p>Name: {customer.name}</p>
    <p>Email: {customer.email}</p>
    <p>Role: {customer.role}</p>
    <p>Phone Number: {customer.phoneNumber || 'Not available'}</p>
    <p>Date Added: {formatDate(customer.dateAdded)}</p>
    <p>
      Picture:{' '}
      <Image src={customer.picture} alt="Profile" width={96} height={96} />
    </p>
    <p>Followers: {customer.followers ? 'Yes' : 'No'}</p>
    <p>Posts: {customer.posts ? 'Yes' : 'No'}</p>
  </>
);

export default CustomerCard;
