import { useUser } from "@/context/UserContext";
import { addUserHandler, fetchUsersBySub } from "@/lib/data";
import { LoginProps, Role, User } from "@/types/IUser";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import LoginMessage from "./atoms/login-message";

const SuccessLogin: NextPage<LoginProps> = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const { updateUser, role } = useUser();

  useEffect(() => {
    async function setUserInfo() {
      setLoading(true);
      try {
        const userExist = await fetchUsersBySub(user.sub);
        if (userExist) {
          console.log("UserExist", userExist);
          updateUser(userExist);
        } else {
          const newUser = await addUserHandler(user);
          updateUser(newUser);
        }
      } catch (error) {
        if (error instanceof Error && 'status' in error) { 
          const err = error as unknown as Response;
          if (err.status === 404) {
            const newUser = await addUserHandler(user);
            updateUser(newUser);
          } else {
            console.error("Error Adding /updating user", error);
          }
        } else {
          console.error("Unexpected error type", error);
        }
      } finally {
        setLoading(false);
      }
    }
    setUserInfo();
  }, []);

  if (loading && role !== "admin") {
    return <p>Loading... 🔄</p>;
  }

  return (
    <>
      <LoginMessage displayRole={role || "pending"} />
    </>
  );
};
export default SuccessLogin;
