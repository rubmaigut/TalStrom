import SignIn from '@/ui/atoms/general ui/sign-in';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { fetchUsersBySub } from '@/lib/data';
import { UserCardForUser } from '@/types/IUserCardProps';
import UserCard from '@/ui/user-card';
import NavLinks from '@/ui/customer/nav-links';
import UserFindMatch from '@/ui/customer/find-match';
import UserMyNetwork from '@/ui/profile/networking';
import UserPost from '@/ui/profile/posts';
import UserSaved from '@/ui/profile/saved';
import UserPosts from '@/ui/profile/posts';
import LoginMessage from '@/ui/atoms/general ui/login-message';

const UserProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<UserCardForUser | null>(null);
  const [activeLink, setActiveLink] = useState<string>('posts');
  const [pageComponent, setPageComponent] = useState<React.ReactNode>(
    <UserPost posts={userInfo?.posts || []} sub={userInfo!.sub as string} />,
  );

  useEffect(() => {
    if (session) {
      const userSub = session.user?.sub;
      const loadCustomer = async () => {
        try {
          const customer = await fetchUsersBySub(userSub!);
          setUserInfo(customer);
        } catch (error) {
          console.error('Failed to fetch customer:', error);
        }
      };
      loadCustomer();
    }
  }, [session]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  useEffect(() => {
    switch (activeLink) {
      case 'posts':
        setPageComponent(
          <UserPosts
            posts={userInfo?.posts || [] as Post[]}
            sub={userInfo!.sub as string}
          />,
        );
        break;
      case 'find-match':
        setPageComponent(
          <UserFindMatch
            sub={userInfo!.sub}
            filterOptions={userInfo!.technologies}
          />,
        );
        break;
      case 'networking':
        setPageComponent(<UserMyNetwork />);
        break;
      case 'saved':
        setPageComponent(<UserSaved />);
        break;
    }
  }, [activeLink, userInfo]);

  if (!session) {
    return (
      <section>
        <SignIn />
      </section>
    );
  } else if (userInfo?.role !== 'customer') {
    return <LoginMessage displayRole={'developer'} userSub={userInfo?.sub} />;
  }

  return (
    <div>
      <UserCard user={userInfo} />
      <NavLinks onLinkClick={handleLinkClick} />

      <div className="w-[calc(100%-50px)] h-screen mx-auto my-3">
        {pageComponent}
      </div>
    </div>
  );
};
export default UserProfilePage;
