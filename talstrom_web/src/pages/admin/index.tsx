import Layout from '@/ui/layout';
import SignIn from '@/ui/sign-in';
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session } = useSession();

  return (
    <>
      {!session ? (
        <section>
          <SignIn />
        </section>
      ) : (
        <Layout>
          <p>Admin Portal Page</p>
        </Layout>
      )}
    </>
  );
}
