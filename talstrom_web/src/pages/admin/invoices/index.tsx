import Layout from '@/ui/layout';
import SignIn from '@/ui/atoms/general ui/sign-in';
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
          <p>Invoices Page</p>
        </Layout>
      )}
    </>
  );
}
