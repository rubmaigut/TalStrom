import Layout from "@/ui/layout";
import SignIn from "@/ui/atoms/general ui/sign-in";
import { useSession } from "next-auth/react";
import { fetchUsersBySub } from "@/lib/data-user";
import { useEffect, useState } from "react";
import GreetingModal from "@/ui/atoms/general ui/greetings";
import { UserCardForUser } from "@/types/IUserCardProps";
import {LoginMessage} from "@/ui/atoms/general ui/login-message";
import ToDoList from "@/ui/customer/dashboard/todos/todo-list";

export default function Page() {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<UserCardForUser | null>(null);

  useEffect(() => {
    if (session) {
      const userSub = session.user?.sub;
      const loadCustomer = async () => {
        try {
          const customer = await fetchUsersBySub(userSub!);
          setUserInfo(customer);
        } catch (error) {
          console.error("Failed to fetch customer:", error);
        }
      };
      loadCustomer();
    }
  },[]);

  if (!session) {
    return (
      <section>
        <SignIn />
      </section>
    );
  } else if (userInfo?.role !== "customer") {
    return <LoginMessage displayRole="developer" userSub={userInfo?.sub} />;
  }

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-6 rounded-lg bg-gray-50 border border-gray-300 px-4 md:w-full h-full md:px-12 md:my-0 my-4 ">
          <div className="flex flex-col justify-between pb-6">
            <GreetingModal />
            <p className="pb-2">
              Hi<strong> {userInfo.name}</strong> Welcome back!
            </p>
          </div>
          <ToDoList/>
        </div>
      </Layout>
    </>
  );
}