import SignIn from "@/ui/atoms/general ui/sign-in";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchUsersBySub } from "@/lib/data";
import { UserCardForUser } from "@/types/IUserCardProps";
import UserCard from "@/ui/atoms/profile/user-card";
import NavLinks from "@/ui/developer/nav-links";
import UserPost from "@/ui/atoms/profile/posts";
import VideosGrid from "@/ui/developer/videos";
import ImagesGrid from "@/ui/developer/images";
import { useUser } from "@/context/UserContext";
import LoginMessage from "@/ui/atoms/general ui/login-message";
import Bio from "@/ui/atoms/profile/bio";
import JobsPage from "@/ui/atoms/profile/jobs";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { id } = context.params;
  return { props: { id } };
};

export const UserProfilePage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<UserCardForUser | null>(null);
  const [activeLink, setActiveLink] = useState<string>("Bio");

  useEffect(() => {
    const updateUserContext = async () => {
        try {
          const updateUserInfo = await fetchUsersBySub(id);
          setUserInfo(updateUserInfo);
        } catch (error) {
          console.error("Failed to update user context:", error);
        }
    };
    updateUserContext();
  }, []);

  const loadUser = async () => {
    try {
      const developer = await fetchUsersBySub(id);
      setUserInfo(developer);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    loadUser();
    setActiveLink("Bio");
  }, []);

  const components = [
    <Bio key={"biography"} biography={userInfo?.bio as string} />,
    <VideosGrid
      key={"videos-grid"}
      videos={userInfo?.videos}
      sub={userInfo?.sub as string}
      loadUser={loadUser}
    />,
    <ImagesGrid
      key={"images-grid"}
      images={userInfo?.images}
      sub={userInfo?.sub as string}
      loadUser={loadUser}
    />,
    <UserPost
      key={"posts"}
      posts={userInfo?.posts as Post[]}
      sub={userInfo?.sub as string}
      postType={""}
    />,
    <JobsPage key={"jobs-page"} />,
  ];

  const [pageComponent, setPageComponent] = useState(components[0]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  useEffect(() => {
    switch (activeLink) {
      case "Bio":
        setPageComponent(components[0]);
        break;
      case "Videos":
        setPageComponent(components[1]);
        break;
      case "Images":
        setPageComponent(components[2]);
        break;
      case "Posts":
        setPageComponent(components[3]);
        break;
      case "Jobs":
        setPageComponent(components[4]);
        break;
    }
  }, [activeLink, userInfo]);

  console.log(id);
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
              <div className="w-[calc(100%-50px)] md:w-[calc(100%-180px)] lg:w-[calc(100%-350px)] xl:w-[calc(100%-770px)] h-screen mx-auto my-3">
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
              <LoginMessage
                displayRole={userInfo?.role as string}
                userSub={userInfo?.sub}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserProfilePage;
