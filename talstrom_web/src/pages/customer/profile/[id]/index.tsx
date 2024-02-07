import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchUsersBySub } from "@/lib/data-user";
import { UserCardForUser } from "@/types/IUserCardProps";
import UserCard from "@/ui/atoms/profile/user-card";
import ProfileNavLinks from "@/ui/customer/nav-links";
import UserFindMatch from "@/ui/customer/find-match";
import UserMyNetwork from "@/ui/atoms/profile/networking";
import UserPost from "@/ui/atoms/profile/posts";
import UserSaved from "@/ui/atoms/profile/saved";
import {LoginMessage} from "@/ui/atoms/general ui/login-message";
import { useUser } from "@/context/UserContext";
import SignIn from "@/ui/atoms/general ui/sign-in";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

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
  const [pageComponent, setPageComponent] = useState<React.ReactNode>(
    <UserPost
      posts={userInfo?.posts ?? []}
      sub={userInfo?.sub ?? ''}
      postType={''}
      session={session}
    />,
  );

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
  }, [session, updateUser]);

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
      networking: <UserMyNetwork />,
      saved: <UserSaved />,
    };
    return mapping[activeLink] || <div>Component not found</div>;
  };

  const updateContentFromCard = (updatedUser: UserCardForUser) => setUserInfo(updatedUser)

  if (!session) {
    return (
      <section>
        <SignIn />
      </section>
    );
  } else if (userInfo?.role !== "customer") {
    return <LoginMessage displayRole={"developer"} userSub={userInfo?.sub} />;
  }

  return (
    <div>
      <UserCard user={userInfo} session={session} updateUser={updateContentFromCard} />
      <ProfileNavLinks onLinkClick={handleLinkClick} />
      <div className="w-[calc(100%-50px)] h-screen mx-auto my-3">
        {getActiveComponent(userInfo)}
      </div>
    </div>
  );
};

export default UserProfilePage;
