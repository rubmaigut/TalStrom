import Layout from "@/ui/layout";
import SignIn from "@/ui/atoms/general ui/sign-in";
import { useSession } from "next-auth/react";
import { fetchUsersBySub } from "@/lib/data-user";
import { useEffect, useState } from "react";
import GreetingModal from "@/ui/atoms/general ui/greetings";
import { UserCardForUser } from "@/types/IUserCardProps";
import { LoginMessage } from "@/ui/atoms/general ui/login-message";
import ToDoList from "@/ui/customer/dashboard/todos/todo-list";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useUser } from "@/context/UserContext";
import CompletedToDoList from "@/ui/customer/dashboard/todos/completed-todos";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { id } = context.params;
  return { props: { id } };
};

export default function Page({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();
  const { userContextG, updateUser } = useUser();
  const [userInfo, setUserInfo] = useState<UserCardForUser | null>(null);

  useEffect(() => {
    if (id) {
      fetchUsersBySub(id)
        .then((fetchedUserInfo: UserCardForUser) => {
          updateUser(fetchedUserInfo);
          setUserInfo(fetchedUserInfo);
        })
        .catch((error) => {
          console.error("Failed to update user context:", error);
        });
    }
  }, []);

  if (!session) {
    return (
      <section>
        <SignIn />
      </section>
    );
  } else if (userInfo?.role !== "customer") {
    return <LoginMessage />;
  }

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-6 rounded-lg  border border-gray-300 px-4 md:w-full h-full md:px-12 md:my-0 my-4 ">
          <div className="flex flex-col justify-between py-6">
            <GreetingModal />
            <p className="pb-2">
              Hi<strong> {userInfo.name.split(" ")[0]}</strong> Welcome back!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <ToDoList />
            </div>
            <div className="flex flex-col">
              <CompletedToDoList />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
