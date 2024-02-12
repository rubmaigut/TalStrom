import SignIn from "@/ui/atoms/general ui/sign-in";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserCardForUser } from "@/types/IUserCardProps";
import UserCard from "@/ui/atoms/profile/user-card";
import NavLinks from "@/ui/developer/nav-links";
import UserPost from "@/ui/atoms/profile/posts";
import VideosGrid from "@/ui/developer/videos";
import ImagesGrid from "@/ui/developer/images";
import Bio from "@/ui/atoms/profile/bio";
import JobsPage from "@/ui/atoms/profile/jobs";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { fetchUsersBySub } from "@/lib/data-user";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { id } = context.params;
  const userData = await fetchUsersBySub(id);

  if (!userData) {
    return {
      notFound: true,
    };
  }

  return { props: { userData } };
};

export const UserProfilePage = ({
  userData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<UserCardForUser | null>(null);
  const [activeLink, setActiveLink] = useState<string>("Bio");

  const loadUser = async () => {
    try {
      setUserInfo(userData);
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
      {userInfo && userInfo?.role === "developer" && (
        <>
          <section className="bg-gray-100 min-h-screen pt-20 md:px-4 xl:px-0">
            <header className="fixed top-0 left-0 right-0 w-full z-50 bg-gray-100">
              <NavLinks onLinkClick={handleLinkClick} />
            </header>
            <div className="flex justify-center max-w-5xl container mx-auto">
              <div className="w-full md:flex">
              <aside className="hidden md:block w-64 flex-shrink-0 bg-white rounded-lg mr-4">
                  <div className="py-6 px-4">
                    <h1 className="text-gray-600 text-lg font-bold">
                      {" "}
                      Developers by Tech Stack
                    </h1>
                    <dd className="text-sm py-1 font-thin">
                      From you technology stack
                    </dd>
                    <div>
                      
                    </div>
                  </div>
                </aside>

                <div className="flex-1">
                  {userInfo && userInfo.role === "developer" && (
                    <UserCard
                      user={userInfo}
                      session={session}
                      updateUser={updateContentFromCard}
                    />
                  )}
                  <div className="container relative mx-auto bg-white">
                    <div className="h-screen overflow-auto mx-auto my-3 z-0 px-6">
                      {pageComponent}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default UserProfilePage;
