import { useUser } from "@/context/UserContext";
import { addUserHandler, fetchUsersBySub } from "@/lib/data-user";
import { LoginProps } from "@/types/IUser";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import LoadingMessage from "./loading";
import { useRouter } from "next/router";
import SkeletonLoader from "./skeleton-loader";

const SuccessLogin: NextPage<LoginProps> = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const { updateUser } = useUser();
  const { userContextG } = useUser();
  const router = useRouter();

  const handleUser = async () => {
    setLoading(true);
    try {
      const userExist = await fetchUsersBySub(user.sub);
      const userData = userExist || (await addUserHandler(user));
      console.log("userData", userData)
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

  const navigateByRole = (role: string, userId: string) => {
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
    if (router.isReady && !loading && userContextG?.role && user.sub) {
      navigateByRole(userContextG.role, user.sub);
    }
  }, [router, router.isReady, loading, userContextG, user.sub]);

  if (loading) {
    return (
      <section className="container mx-auto w-full h-full mt-12">
        <LoadingMessage message="We are loading your experience..." />
      </section>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-6rounded-lg px-6 py-10 w-full">
     <SkeletonLoader/>
    </div>
  );
};
export default SuccessLogin;
