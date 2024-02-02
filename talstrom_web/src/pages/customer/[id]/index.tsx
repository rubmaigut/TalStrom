import SignIn from '@/ui/sign-in';
import { useSession } from 'next-auth/react';
import CustomerProfilePage from './customerProfilePage';

export default function Page() {
  const { data: session } = useSession();

  console.log();
  return (
    <>
      {!session ? (
        <section>
          <SignIn />
        </section>
      ) : (
        <>
          <CustomerProfilePage />
        </>
      )}
    </>
  );
}
