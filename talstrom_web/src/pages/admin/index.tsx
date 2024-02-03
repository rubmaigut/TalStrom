import Layout from "@/ui/layout";
import SignIn from "@/ui/sign-in";
import { useSession } from "next-auth/react";
import { deleteUser, fetchUsersByRole, updateUserRole } from "@/lib/data";
import { useEffect, useState } from "react";
import { User } from "@/types/IUser";
import { Card } from "@/ui/card";
import Select from "@/ui/atoms/select";
import GreetingModal from "@/ui/atoms/greetings";
import AdminActivity from "@/ui/dashboard/admin-activity";
import { useUser } from "@/context/UserContext";
import AccessDenied from "@/ui/access-denied";

export default function Page() {
  const { data: session } = useSession();
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const { role } = useUser();

  useEffect(() => {
    const loadPendingUsers = async () => {
      try {
        const users = await fetchUsersByRole("pending");
        setPendingUsers(users);
      } catch (error) {
        console.error("Failed to fetch pending users:", error);
      }
    };
    loadPendingUsers();
  }, []);

  const handleChangeRole = async (userSub: string, role: string) => {
    try {
      await updateUserRole(userSub, role);
      const users = await fetchUsersByRole("pending");
      setPendingUsers(users);
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  if (!session) {
    return (
      <section>
        <SignIn />
      </section>
    );
  } else if (role !== "admin") {
    return <AccessDenied role="Admin" />;
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
          <h3 className="font-semibold leading-none text-gray-600">
            Latest Users
          </h3>
          <div className="max-w-5xl md:min-h-64">
            {pendingUsers.length ? (
              pendingUsers.map((user) => (
                <div
                  key={user.id}
                  className="md:flex md:justify-between  py-2 border-b"
                >
                  <Card user={user} />
                  <Select
                    onRoleChange={(role) => handleChangeRole(user.sub, role)}
                  />
                </div>
              ))
            ) : (
              <div>No pending users</div>
            )}
          </div>
          <AdminActivity />
        </div>
      </Layout>
    </>
  );
}
