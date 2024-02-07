import SignIn from "@/ui/atoms/general ui/sign-in";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchUsersBySub } from "@/lib/data";
import { UserCardForUser } from "@/types/IUserCardProps";
import UserCard from "@/ui/user-card";
import NavLinks from "@/ui/developer/nav-links";
import UserMyNetwork from "@/ui/profile/networking";
import UserPost from "@/ui/profile/posts";
import VideosGrid from "@/ui/developer/videos";
import ImagesGrid from "@/ui/developer/images";
import { useUser } from "@/context/UserContext";
import LoginMessage from "@/ui/atoms/general ui/login-message";

export default function UserProfilePage() {
  const { data: session } = useSession();
  const { userContextG, updateUser } = useUser();
  const [userInfo, setUserInfo] = useState<UserCardForUser | null>(null);
  const [activeLink, setActiveLink] = useState<string>("posts");
  const userSub = session?.user?.sub;

  useEffect(() => {
    const updateUserContext = async () => {
      if (session) {
        try {
          const updateUserInfo = await fetchUsersBySub(userSub!);
          updateUser({ ...updateUserInfo });
          setUserInfo(updateUserInfo);

        } catch (error) {
          console.error("Failed to update user context:", error);
        }
      }
    };
    updateUserContext()
  }, [session]);

  const loadUser = async () => {
    try {
      const developer = await fetchUsersBySub(userSub!);
      setUserInfo(developer);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    loadUser();
  }, [])

  const components = [
    <VideosGrid
      videos={userInfo?.videos}
      sub={userInfo?.sub as string}
      loadUser={loadUser}
    />,
    <ImagesGrid
      images={userInfo?.images}
      sub={userInfo?.sub as string}
      loadUser={loadUser}
    />,
    <UserPost posts={userInfo?.posts} />,
    <UserMyNetwork />,
  ];

  const [pageComponent, setPageComponent] = useState(components[0]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  useEffect(() => {
    switch (activeLink) {
      case "Videos":
        setPageComponent(components[0]);
        break;
      case "Images":
        setPageComponent(components[1]);
        break;
      case "Posts":
        setPageComponent(components[2]);
        break;
      case "Opportunities":
        setPageComponent(components[3]);
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
          {userInfo && userInfo.role === "developer" ? (
            <div>
              <UserCard user={userInfo} />
              <div className="w-[calc(100%-50px)] md:w-[calc(100%-500px)] h-screen mx-auto my-3">
                <NavLinks onLinkClick={handleLinkClick} />
                {pageComponent}
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full h-full justify-center items-center mt-12 px-8">
              <span className=" break-words text-center text-xl font-bold text-teal-600 lg:text-2xl my-8 ">
                {" "}
                Oops! Seems like you are in the wrong profile
              </span>
              <LoginMessage displayRole={userInfo?.role as string} userSub={userInfo?.sub} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

