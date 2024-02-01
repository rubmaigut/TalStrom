import Layout from "@/ui/layout";
import SignIn from "@/ui/sign-in";
import { useSession } from "next-auth/react";
import { fetchUsersByRole, updateUserRole } from "@/lib/data";
import { useEffect, useState } from "react";

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
      // const users = await fetchUsersByRole("pending");
      // setPendingUsers(users);
      const newArr = [...pendingUsers];
      const userIndex = newArr.findIndex(x => x.sub == userSub);
      if(userIndex) {
        newArr.splice(userIndex);
        setPendingUsers(newArr);
      }

    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  console.log("pendingUSers", pendingUsers);

  return (
    <>
      {!session ? (
        <section>
          <SignIn />
        </section>
      ) : (
        <Layout>
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20 my-4">
          <h2>Hi {session.user?.name}</h2>
          <p>Welcome to Admin Portal</p>
          {pendingUsers.map((user) => (
            <div key={user.id} className="flex justify-between items-center">
              <div>{user.name}</div>
              <select
                onChange={(e) => handleChangeRole(user.sub, e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                <option value="developer">Developer</option>
              </select>
            </div>
          ))}
          </div>
        </Layout>
      )}
    </>
  );
}
