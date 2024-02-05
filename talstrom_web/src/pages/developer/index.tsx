import SignIn from "@/ui/sign-in";
import { useSession } from "next-auth/react";
import { FC, useContext, useEffect, useState } from "react";
import { fetchUsersBySub } from "@/lib/data";
import { UserCardForUser } from "@/types/IUserCardProps";
import UserCard from "../../ui/user-card";
import NavLinks, { links } from "@/ui/developer/nav-links";
import UserFindMatch from "../../ui/profile/find-match";
import UserMyNetwork from "../../ui/profile/networking";
import Posts from "../../ui/profile/posts";
import UserSaved from "../../ui/profile/saved";
import VideosGrid from "../../ui/developer/videos";
import { useSearchParams } from "next/navigation";
import ImagesGrid from "@/ui/developer/images";
import WrongRolePageMessage from "@/ui/atoms/wrong-role-message";
import { useUser } from "@/context/UserContext";

export default function UserProfilePage() {
  const loadUser = async () => {
    try {
      if(sub){
        const userData = await fetchUsersBySub(sub as string);
        setUser(userData);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const { data: session } = useSession();
  const {userContextG} = useUser();
  const [user, setUser] = useState<UserCardForUser | null>(null);
  const [pageComponent, setPageComponent] = useState(<VideosGrid videos={user?.videos} sub={user?.sub as string} loadUser={loadUser}/>);
  const [activeLink, setActiveLink] = useState<string>("posts");
  const searchParams = useSearchParams();
  const sub = searchParams.get("sub");
  

  useEffect(() => {
    loadUser();
  }, [sub]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  useEffect(() => {
    switch (activeLink) {
      case "Videos":
        setPageComponent(<VideosGrid videos={user?.videos} sub={user!.sub} loadUser={loadUser}/>);
        break;
      case "Images":
        setPageComponent(<ImagesGrid images={user?.images} sub={user!.sub} loadUser={loadUser}/>);
        break;
      case "Posts":
        setPageComponent(<Posts posts={user?.posts}/>);
        break;
      case "Opportunities":
        setPageComponent(<UserMyNetwork />);
        break;
    }
  }, [activeLink, user]);

  if(user && user.role == 'developer') return (
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

  if(user && user.role == 'customer') return (
    <>
      {!session ? (
        <section>
          <SignIn />
        </section>
      ) : (
        <>
            <WrongRolePageMessage displayRole={user.role} sub={user.sub}/>
        </>
      )}
    </>
  );

}
