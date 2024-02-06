import SignIn from "@/ui/sign-in";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchUsersBySub } from "@/lib/data";
import { UserCardForUser } from "@/types/IUserCardProps";
import UserCard from "@/ui/user-card";
import NavLinks from "@/ui/customer/nav-links";
import UserFindMatch from "@/ui/profile/find-match";
import UserMyNetwork from "@/ui/profile/networking";
import UserPost from "@/ui/profile/posts";
import UserSaved from "@/ui/profile/saved";
import UserPosts from "@/ui/profile/posts";
import LoginMessage from "@/ui/atoms/login-message";

const UserProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<UserCardForUser | null>(null);
  const [activeLink, setActiveLink] = useState<string>("posts");
  const [pageComponent, setPageComponent] = useState<React.ReactNode>(
    <UserPost posts={userInfo?.posts || []} />
  );

  useEffect(() => {
    if (session) {
      const userSub = session.user?.sub;
      const loadCustomer = async () => {
        try {
          const customer = await fetchUsersBySub(userSub!);
          setUserInfo(customer);
        } catch (error) {
          console.error("Failed to fetch customer:", error);
        }
      };
      loadCustomer();
    }
  }, [session, userInfo]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  useEffect(() => {
    switch (activeLink) {
      case "posts":
        setPageComponent(<UserPosts posts={userInfo?.posts || []} />);
        break;
      case "find-match":
        setPageComponent(<UserFindMatch />);
        break;
      case "networking":
        setPageComponent(<UserMyNetwork />);
        break;
      case "saved":
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
  } else if (userInfo?.role !== "customer") {
    return <LoginMessage displayRole={"developer"} userSub={userInfo?.sub}/>;
  }

  return (
    <div>
        <UserCard user={userInfo} />
        <NavLinks onLinkClick={handleLinkClick} />
        <div>{pageComponent}</div>
    </div>
  )
}
export default UserProfilePage