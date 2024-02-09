import { useUser } from "@/context/UserContext";
import GreetingModal from "./greetings";
import LoginButton from "../profile/login-button";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import LogoutButton from "../profile/log-out";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { id } = context.params;
  return { props: { id } };
};

export const LoginMessage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { userContextG } = useUser();
  const router = useRouter();
  const displayRole = userContextG?.role;

  useEffect(() => {
    if (!displayRole || !router) return; // Ensure router and displayRole are available

    switch (displayRole) {
      case "admin":
        router.push("/admin");
        break;
      case "developer":
        if (id) {
          router.push(`/${displayRole}/${id}`);
        } else {
          console.error("Missing ID for developer");
        }
        break;
      case "customer":
        if (id) {
          router.push(`/customer/${id}`);
        } else {
          console.error("Missing ID for customer");
        }
        break;
      default:
        console.error("Unexpected role or role not set");
        break;
    }
  }, [displayRole, id, router])

  return (
    <div>
      {displayRole === "pending" && (
        <div>
          <GreetingModal />
          <p className="text-gray-800 mb-4">
            <strong>Now you are a user! 🎊 </strong>
            Your role will be assigned soon, {userContextG?.name.split(" ")[0]}.
          </p>
          <LoginButton classNameButton="px-2 mb-4" />
          <LogoutButton />
        </div>
      )}
    </div>
  );
};
