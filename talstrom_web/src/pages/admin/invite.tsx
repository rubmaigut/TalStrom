// pages/admin/invite.tsx
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import InviteUserForm from '../../ui/forms/inviteUsers';
import Layout from '../../ui/layout';

const InviteUserPage: NextPage = () => {
  const { data: session } = useSession();

  const handleInvite = async (email: string, role: string) => {
    console.log('Inviting user:', email, 'as a', role);

    // Placeholder for API call:
    // const response = await fetch('/api/invite', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, role }),
    // });
    
    // Handle the response here
  };

  if (!session) {
    return <Layout><p>You must be signed in to view this page.</p></Layout>;
  }

  return (
    <Layout>
      <h1 className="text-center text-2xl font-bold">Invite User</h1>
      <InviteUserForm onInvite={handleInvite} />
    </Layout>
  );
};

export default InviteUserPage


