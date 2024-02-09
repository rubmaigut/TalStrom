import { useUser } from "@/context/UserContext";
import { addUserHandler, fetchUsersBySub } from "@/lib/data-user";
import { LoginProps } from "@/types/IUser";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { LoginMessage } from "./login-message";
import LoadingMessage from "./loading";
import { MailImage } from "../profile/email-image";

const SuccessLogin: NextPage<LoginProps> = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const { updateUser } = useUser();

  useEffect(() => {
    async function setUserInfo() {
      setLoading(true);
      try {
        const userExist = await fetchUsersBySub(user.sub);
        if (userExist) {
          updateUser(userExist);
        } else {
          const newUser = await addUserHandler(user);
          updateUser(newUser);
        }
      } catch (error) {
        if (error instanceof Error && "status" in error) {
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

  if (loading) {
    return (
      <section className="w-full h-full mt-12">
        <LoadingMessage message="We are loading your experience..." />
      </section>
    );
  }

  return (
    <>
      {!loading && (
        <div className="flex flex-col justify-center gap-6rounded-lg px-6 py-10 w-full">
          <LoginMessage id={user.sub} />
          <LoadingMessage message={".... Connecting ...."} />
        </div>
      )}
    </>
  );
};
export default SuccessLogin;
