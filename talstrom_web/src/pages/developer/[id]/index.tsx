import SignIn from "@/ui/atoms/general ui/sign-in";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserCardForUser } from "@/types/IUserCardProps";
import UserCard from "@/ui/atoms/profile/user-card";
import NavLinks from "@/ui/developer/nav-links";
import UserPost from "@/ui/atoms/profile/posts";
import VideosGrid from "@/ui/developer/videos";
import ImagesGrid from "@/ui/developer/images";
import { LoginMessage } from "@/ui/atoms/general ui/login-message";
import Bio from "@/ui/atoms/profile/bio";
import JobsPage from "@/ui/atoms/profile/jobs";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { fetchUsersBySub } from "@/lib/data-user";
import { useUser } from "@/context/UserContext";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { id } = context.params;
  return { props: { id } };
};

export const UserProfilePage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  const { updateUser } = useUser();
  const [userInfo, setUserInfo] = useState<UserCardForUser | null>(null);
  const [activeLink, setActiveLink] = useState<string>("Bio");

  useEffect(() => {
    if (id) {
      fetchUsersBySub(id)
        .then((fetchedUserInfo: UserCardForUser) => {
          if (fetchedUserInfo.posts) {
            const sortedPosts = [...fetchedUserInfo.posts].sort(
              (a, b) => b.id - a.id
            );
            fetchedUserInfo.posts = sortedPosts;
          }
          updateUser(fetchedUserInfo);
          setUserInfo(fetchedUserInfo);
        })
        .catch((error) => {
          console.error("Failed to update user context:", error);
        });
    }
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

  const updateContentFromCard = (updatedUser: UserCardForUser) =>
    setUserInfo(updatedUser);

  const components = [
    <Bio key={"biography"} biography={userInfo?.bio as string} />,
    <VideosGrid
      key={"videos-grid"}
      user={userInfo as UserCardForUser}
      sub={userInfo?.sub as string}
      loadUser={loadUser}
      session={session}
    />,
    <ImagesGrid
      key={"images-grid"}
      user={userInfo as UserCardForUser}
      sub={userInfo?.sub as string}
      loadUser={loadUser}
      session={session}
    />,
    <UserPost
      key={"posts"}
      posts={userInfo?.posts as Post[]}
      sub={userInfo?.sub as string}
      postType={""}
      session={session}
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

  return (
    <>
      {!session ? (
        <p> Redirecting..</p>
      ) : (
        <>
          {userInfo && userInfo?.role === "developer" ? (
            <>
              <section className="w-full mt-4">
                <header className="fixed top-0 left-0 right-0 w-full z-50 bg-gray-100 py-1 lg:py-0">
                  <NavLinks onLinkClick={handleLinkClick} />
                </header>
                <div className="pt-10 lg:pt-14">
                  {userInfo && userInfo.role === "developer" && (
                    <UserCard
                      user={userInfo}
                      session={session}
                      updateUser={updateContentFromCard}
                    />
                  )}
                  <div className="flex">
                    <aside className="w-1/4"></aside>
                  </div>
                </div>
                <div className="container relative top-64 mx-auto bg-white">
                  <div className="h-screen overflow-auto mx-auto my-3 z-0 px-6">
                    {pageComponent}
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div className="flex flex-col w-full h-full justify-center items-center mt-12 px-8">
              <span className=" break-words text-center text-xl font-bold text-teal-600 lg:text-2xl my-8 ">
                {" "}
                Oops! Seems like you are in the wrong profile
              </span>
              <LoginMessage />
            </div>
          )}
        </>
      )}
    </>
  );
};
export default UserProfilePage;
