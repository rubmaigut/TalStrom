import Layout from '@/ui/layout';
import SignIn from '@/ui/sign-in';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { fetchUserById } from '@/lib/data'; 
import { User } from '@/types/IUser';
import CustomerCard from '../../../ui/customer-card';

export default function CustomerProfilePage() {
  const { data: session } = useSession();
  const [customer, setCustomer] = useState<User | null>(null);

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        if (session) {
          const sub = session.user?.sub || '';
          const customerData = await fetchUserById(sub);

          setCustomer(customerData);
        }
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
      }
    };

    loadCustomer();
  }, [session]);

  return (
    <>
      {!session ? (
        <section>
          <SignIn />
        </section>
      ) : (
        <>
          <div>
            {customer ? (
              <>
                <p>Customer Profile</p>
                <CustomerCard customer={customer} />{' '}
              </>
            ) : (
              <p>Loading customer data...</p>
            )}
          </div>
        </>
      )}
    </>
  );
}
