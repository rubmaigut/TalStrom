import SignIn from "@/ui/sign-in";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchUsersBySub } from "@/lib/data";
import { UserCardForUser } from "@/types/IUserCardProps";
import UserCard from "@/ui/user-card";
import NavLinks from "@/ui/developer/nav-links";
import UserFindMatch from "@/ui/profile/find-match";
import UserMyNetwork from "@/ui/profile/networking";
import UserPost from "@/ui/profile/posts";
import UserSaved from "@/ui/profile/saved";
import VideosGrid from "@/ui/developer/videos";
import ImagesGrid from "@/ui/developer/images";
import { useUser } from "@/context/UserContext";
import LoginMessage from "@/ui/atoms/login-message";

export default function UserProfilePage() {
  const { data: session } = useSession();
  const { userContextG } = useUser();
  const [userInfo, setUserInfo] = useState<UserCardForUser | null>(null);
  const [pageComponent, setPageComponent] = useState(<VideosGrid videos={userInfo?.videos} sub={userInfo?.sub as string}/>);
  const [activeLink, setActiveLink] = useState<string>("posts");
  
  useEffect(() => {
    if(session){
      const userSub = session.user?.sub
      const loadDeveloper = async () => {
        try {
          const developer = await fetchUsersBySub(userSub!);
          setUserInfo(developer);
        } catch (error) {
          console.error("Failed to fetch Developer:", error);
        }
      };
      loadDeveloper();
    }
  }, [session, userInfo]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  useEffect(() => {
    switch (activeLink) {
      case "videos":
        setPageComponent(<VideosGrid videos={userInfo?.videos} sub={userInfo!.sub} />);
        break;
      case "images":
        setPageComponent(<ImagesGrid images={userInfo?.images} sub={userInfo!.sub} />);
        break;
      case "posts":
        setPageComponent(<UserPost posts={userInfo?.posts}/>);
        break;
      case "find-match":
        setPageComponent(<UserFindMatch />);
        break;
      case "my-opportunities":
        setPageComponent(<UserMyNetwork />);
        break;
      case "saved":
        setPageComponent(<UserSaved />);
        break;
    }
  }, [activeLink, userInfo, userContextG]);

  return (
    <>
      {!session ? (
        <section>
          <SignIn />
        </section>
      ) : (
          <div>
            {userInfo && userInfo?.role === "developer" ? (
              <div>
                <UserCard user={userInfo} />
                <NavLinks onLinkClick={handleLinkClick} />
                <div>{pageComponent}</div>
              </div>
            ) : (
              <div className="flex flex-col w-full h-full justify-center items-center mt-12 px-8">
              <span className=" break-words text-center text-xl font-bold text-teal-600 lg:text-2xl my-8 "> Ops! Seems like you are in the wrong profile</span>
              <LoginMessage displayRole="customer" userSub={userInfo?.sub}/>
              </div>
            )}
          </div>
      
      )}
    </>
  );
}
