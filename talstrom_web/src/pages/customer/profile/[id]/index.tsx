import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchUsersBySub } from "@/lib/data-user";
import { UserCardForUser } from "@/types/IUserCardProps";
import UserCard from "@/ui/atoms/profile/user-card";
import UserFindMatch from "@/ui/customer/find-match";
import UserMyNetwork from "@/ui/atoms/profile/networking";
import UserPost from "@/ui/atoms/profile/posts";
import UserSaved from "@/ui/atoms/profile/saved";
import {LoginMessage} from "@/ui/atoms/general ui/login-message";
import { useUser } from "@/context/UserContext";
import SignIn from "@/ui/atoms/general ui/sign-in";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NavLinks from "@/ui/customer/nav-links";

type ComponentMapping = {
  [key: string]: JSX.Element;
};

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
  const [activeLink, setActiveLink] = useState<string>('posts');
  
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

  useEffect(() => {
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
        <UserPost posts={userInfo?.posts ?? []} sub={userInfo?.sub ?? ""} session={session} />
      ),
      "find-match": (
        <UserFindMatch
          sub={userInfo?.sub ?? ""}
          filterOptions={
            userInfo?.technologies ? userInfo.technologies.split(",") : []
          }
        />
      ),
      networking: <UserMyNetwork />
      //saved: <UserSaved />,
    };
    return mapping[activeLink] || <div>Component not found</div>;
  };

  const updateContentFromCard = (updatedUser: UserCardForUser) => setUserInfo(updatedUser)
  const [pageComponent, setPageComponent] = useState<React.ReactNode>(
    <UserPost
      posts={userInfo?.posts ?? []}
      sub={userInfo?.sub ?? ''}
      postType={''}
      session={session}
    />,
  );

  return (
    <>
      {!session ? (
        <p> Redirecting..</p>
      ) : (
        <>
          {userInfo && userInfo?.role === "customer" ? (
            <>
              <section className="w-full mt-4">
                <header className="fixed top-0 left-0 right-0 w-full z-50 bg-gray-100 py-1 lg:py-0">
                  <NavLinks onLinkClick={handleLinkClick} />
                </header>
                <div className="pt-10 lg:pt-14">
                  {userInfo && userInfo.role === "customer" && (
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
