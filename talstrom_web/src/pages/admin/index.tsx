import Layout from "@/ui/layout";
import SignIn from "@/ui/sign-in";
import { useSession } from "next-auth/react";
import { deleteUser, fetchUsersByRole, updateUserRole } from "@/lib/data";
import { useEffect, useState } from "react";
import { User } from "@/types/IUser";
import { Card } from "@/ui/card";

export default function Page() {
  const { data: session } = useSession();
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);

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

  const handleChangeRole = async (userSub: string, newRole: string) => {
    try {
      await updateUserRole(userSub, newRole);
      const users = await fetchUsersByRole("pending");
      setPendingUsers(users);
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  /* const handleDelete = async (sub: string) => {
    try {
      await deleteUser(sub);
      const users = await fetchUsersByRole("pending");
    } catch (error) {
      console.error("Error Deleting developer", error);
    }
  }; */
  return (
    <>
      {!session ? (
        <section>
          <SignIn />
        </section>
      ) : (
        <Layout>
          <div className="flex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-full h-full md:px-20 md:my-0 my-4 ">
          <p>Hi<strong> {session.user?.name}</strong> Welcome to Admin Portal</p>
          {pendingUsers.length ? (pendingUsers.map((user) => (
            <>
            <Card user={user}/>
              <select
                onChange={(e) => handleChangeRole(user.sub, e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                <option value="developer">Developer</option>
              </select>
            </>
          ))) : (
            <div>No pending users</div>
          )}
          </div>
        </Layout>
      )}
    </>
  );
}

