import { useUser } from "@/context/UserContext";
import { addUserHandler, fetchUsersBySub } from "@/lib/data-user";
import { LoginProps } from "@/types/IUser";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { useEffect, useState } from "react";
import { LoginMessage } from "./login-message";
import LoadingMessage from "./loading";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { id } = context.params;
  return { props: { id } };
}

const SuccessLogin: NextPage<LoginProps> = ({ user, id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [loading, setLoading] = useState(true);
  const { updateUser } = useUser();
  const { userContextG } = useUser();
  const router = useRouter();

  const handleUser = async () => {
    setLoading(true);
    try {
      const userExist = await fetchUsersBySub(user.sub);
      const userData = userExist || await addUserHandler(user);
      updateUser(userData);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error: any) => {
    if (error instanceof Error && "status" in error) {
      const err = error as unknown as Response;
      if (err.status === 404) {
        addUserHandler(user).then(updateUser).catch(console.error);
      } else {
        console.error("Error Adding/updating user", error);
      }
    } else {
      console.error("Unexpected error type", error);
    }
  };

  const navigateByRole = (role: string, userId:string) => {
    const rolePaths: { [key: string]: string } = {
      admin: "/admin",
      developer: `/developer/${userId}`,
      customer: `/customer/${userId}`,
    };

    if (role in rolePaths) {
      router.push(rolePaths[role]);
    } else {
      console.error("Unexpected role or role not set");
    }
  };

  useEffect(() => {
    handleUser();
  }, []);

  useEffect(() => {
    if (!userContextG?.role || !router || !id) return; 
    navigateByRole(userContextG.role, id);
  }, [userContextG, id, router]);


  /* useEffect(() => {
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
  }, []); */

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
          <h2>message</h2>
        </div>
      )}
    </>
  );
};
export default SuccessLogin;
