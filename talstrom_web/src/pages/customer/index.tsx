import SignIn from '@/ui/sign-in';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { fetchUsersBySub } from '@/lib/data';
import { UserCardForUser } from '@/types/IUserCardProps';
import UserCard from '../../ui/user-card';
import NavLinks from '@/ui/customer/nav-links';
import UserFindMatch from '../../ui/profile/find-match';
import UserMyNetwork from '../../ui/profile/networking';
import UserPost from '../../ui/profile/posts';
import UserSaved from '../../ui/profile/saved';
import posts from '../../ui/profile/posts';
import UserPosts from '../../ui/profile/posts';
import { useSearchParams } from 'next/navigation';


  const searchParams = useSearchParams();
  const sub = searchParams.get('sub');

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
        setPageComponent(<UserPosts posts={user?.posts || []} />);
        break;
      case 'find-match':
        setPageComponent(<UserFindMatch />);
        break;
      case 'networking':
        setPageComponent(<UserMyNetwork />);
        break;
      case 'saved':
        setPageComponent(<UserSaved />);
        break;
    }
  }, [activeLink, user]);

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
