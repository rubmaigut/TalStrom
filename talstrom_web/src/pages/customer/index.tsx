import SignIn from "@/ui/sign-in";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchUsersBySub } from "@/lib/data";
import { UserCardForUser } from "@/types/IUserCardProps";
import UserCard from "../../ui/user-card";
import NavLinks from "@/ui/customer/nav-links";
import UserFindMatch from "../../ui/customer/find-match";
import UserMyNetwork from "../../ui/profile/networking";
import UserPost from "../../ui/profile/posts";
import UserSaved from "../../ui/profile/saved";
import UserPosts from "../../ui/profile/posts";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";

const UserProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const { userContextG } = useUser();
  const [user, setUser] = useState<UserCardForUser | null>(null);
  const [activeLink, setActiveLink] = useState<string>("posts");
  const [pageComponent, setPageComponent] = useState<React.ReactNode>(
    <UserPost posts={user?.posts || []} />
  );

  const searchParams = useSearchParams();
  const sub = searchParams.get("sub");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUsersBySub(sub as string);
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    loadUser();
  }, [session]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  useEffect(() => {
    switch (activeLink) {
      case "posts":
        setPageComponent(<UserPosts posts={user?.posts || []} />);
        break;
      case "find-match":
        setPageComponent(<UserFindMatch sub={sub as string} />);
        break;
      case "networking":
        setPageComponent(<UserMyNetwork />);
        break;
      case "saved":
        setPageComponent(<UserSaved />);
        break;
    }
  }, [activeLink, user]);

  if (user && userContextG?.role == "customer")
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

  if (user && user.role == "developer")
    return (
      <>
        {!session ? (
          <section>
            <SignIn />
          </section>
        ) : (
          <>
            <div>Hello</div>
          </>
        )}
      </>
    );
};

export default UserProfilePage;
