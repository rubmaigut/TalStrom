import Layout from "@/ui/layout";
import SignIn from "@/ui/sign-in";
import { useSession } from "next-auth/react";
import { fetchUsersByRole, fetchUsersBySub, updateUserRole } from "@/lib/data";
import { useEffect, useState } from "react";
import GreetingModal from "@/ui/atoms/greetings";
import { useUser } from "@/context/UserContext";
import AccessDenied from "@/ui/access-denied";
import { UserCardForUser } from "@/types/IUserCardProps";

export default function Page() {
  const { data: session } = useSession();
  const { userContextG } = useUser();
  const [userInfo, setUserInfo] = useState<UserCardForUser | null>(null);

  useEffect(() => {
    const loadCustomerUsers = async () => {
        try {
          const users = await fetchUsersByRole("customer");
          setUserInfo(users);
        } catch (error) {
          console.error("Failed to fetch customer users:", error);
        }
      };
      loadCustomerUsers();
  }, []);

  if (!session) {
    return (
      <section>
        <SignIn />
      </section>
    );
  } else if (userContextG?.role !== "customer") {
    return <AccessDenied role="Customer" />;
  }

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-8 md:w-full h-full md:px-12 md:my-0 my-4 ">
          <div className="flex flex-col justify-between pb-6">
            <div>
              <GreetingModal />
              <p className="pb-2">
                Hi<strong> {session?.user?.name}</strong> Welcome back!
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
