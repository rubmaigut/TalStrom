import SignIn from '@/ui/sign-in';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { fetchUsersBySub } from '@/lib/data';
import { UserCardForUser } from '@/types/IUserCardProps';
import UserCard from '../../../ui/user-card';
import NavLinks from '@/ui/customer/nav-links';
import UserFindMatch from "../../../ui/profile/find-match";
import UserMyNetwork from "../../../ui/profile/networking";
import UserPost from "../../../ui/profile/posts";
import UserSaved from "../../../ui/profile/saved";

const UserProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserCardForUser | null>(null);
  const [activeLink, setActiveLink] = useState<string>('posts');
  const [pageComponent, setPageComponent] = useState<React.ReactNode>(<UserPost />);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (session) {
          const sub = session.user?.sub || '';
          const userData = await fetchUsersBySub(sub);
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

  useEffect(() => {
    switch (activeLink) {
      case 'posts':
        setPageComponent(<UserPost />);
        break;
      case 'find-match':
        setPageComponent(<UserFindMatch />);
        break;
      case 'my-devs':
        setPageComponent(<UserMyNetwork />);
        break;
      case 'saved':
        setPageComponent(<UserSaved />);
        break;
      default:
        setPageComponent(<UserPost />);
        break;
    }
  }, [activeLink]);

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
                <p>User Profile</p>
                <UserCard user={user} />
                <NavLinks onLinkClick={handleLinkClick} />
                <div>{pageComponent}</div>
              </>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default UserProfilePage;
