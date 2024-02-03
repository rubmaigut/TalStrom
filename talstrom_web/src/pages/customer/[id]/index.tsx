import SignIn from '@/ui/sign-in';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { fetchUserById } from '@/lib/data';
import { UserCardForUser } from '@/types/IUserCardProps';
import UserCard from '../../../ui/user-card';
import NavLinks, { links } from '@/ui/customer/nav-links';
import UserFindMatch from '../[id]/find-match/index';
import UserMyDevs from '../[id]/my-devs/index';
import UserPost from '../[id]/post/index';
import UserSaved from '../[id]/saved/index';

export default function UserProfilePage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserCardForUser | null>(null);
  const [activeLink, setActiveLink] = useState<string>('posts');

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (session) {
          const sub = session.user?.sub || '';
          const userData = await fetchUserById(sub);
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    loadUser();
  }, [session]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const renderPageContent = () => {
    switch (activeLink) {
      case 'posts':
        return <UserPost />;
      case 'find-match':
        return <UserFindMatch />;
      case 'my-devs':
        return <UserMyDevs />;
      case 'saved':
        return <UserSaved />;
      default:
        return null;
    }
  };

  return (
    <>
      {!session ? (
        <section>
          <SignIn />
        </section>
      ) : (
        <>
          <div>
            {user ? (
              <>
                <p>user Profile</p>
                <UserCard user={user} />
                <NavLinks onLinkClick={handleLinkClick} />
                <div>{renderPageContent()}</div>
              </>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </>
      )}
    </>
  );
}
