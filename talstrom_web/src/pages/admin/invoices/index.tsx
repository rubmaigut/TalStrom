import { useUser } from '@/context/UserContext';
import Layout from '@/ui/layout';
import EditProfile from '@/ui/profile/edit-profile';
import SignIn from '@/ui/sign-in';
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session } = useSession();
  const {userContextG} = useUser()

  return (
    <>
      {!session ? (
        <section>
          <SignIn />
        </section>
      ) : (
        <Layout>
          <p>Invoices Page</p>
          <EditProfile/>
        </Layout>
      )}
    </>
  );
}
