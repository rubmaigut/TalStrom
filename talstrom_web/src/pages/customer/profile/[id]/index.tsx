import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchUsersBySub } from "@/lib/data-user";
import { UserCardForUser } from "@/types/IUserCardProps";
import UserCard from "@/ui/atoms/profile/user-card";
import UserFindMatch from "@/ui/customer/find-match";
import UserMyNetwork from "@/ui/atoms/profile/networking";
import UserPost from "@/ui/atoms/profile/posts";
import { LoginMessage } from "@/ui/atoms/general ui/login-message";
import { useUser } from "@/context/UserContext";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NavLinks from "@/ui/customer/nav-links";

type ComponentMapping = {
  [key: string]: JSX.Element;
};

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
  const [activeLink, setActiveLink] = useState<string>("posts");

  const loadUser = async () => {
    try {
      setUserInfo(userData);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    loadUser();
    setPageComponent(getActiveComponent(userInfo));
  }, [activeLink, userInfo]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const getActiveComponent = (
    userInfo: UserCardForUser | null
  ): JSX.Element => {
    const mapping: ComponentMapping = {
      posts: (
        <UserPost
          posts={userInfo?.posts ?? []}
          sub={userInfo?.sub ?? ""}
          session={session}
        />
      ),
      networking: <UserMyNetwork />,
      //saved: <UserSaved />,
    };
    return mapping[activeLink] || <div>Component not found</div>;
  };

  const updateContentFromCard = (updatedUser: UserCardForUser) =>
    setUserInfo(updatedUser);
  const [pageComponent, setPageComponent] = useState<React.ReactNode>(
    <UserPost
      posts={userInfo?.posts ?? []}
      sub={userInfo?.sub ?? ""}
      postType={""}
      session={session}
    />
  );

  return (
    <>
      {userInfo && userInfo?.role === "customer" && (
        <>
          <section className="bg-gray-100 min-h-screen pt-16 w-full justify-center items-center md:px-5 xl:px-0">
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
                      <UserFindMatch
                        sub={userInfo?.sub ?? ""}
                        filterOptions={
                          userInfo?.technologies
                            ? userInfo.technologies.split(",")
                            : []
                        }
                      />
                    </div>
                  </div>
                </aside>
                <div className="flex-1">
                  {userInfo && userInfo.role === "customer" && (
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
