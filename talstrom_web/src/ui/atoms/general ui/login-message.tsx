import { useUser } from "@/context/UserContext";
import GreetingModal from "./greetings";
import LoginButton from "../profile/login-button";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import LogoutButton from "../profile/log-out";
import {useRouter} from "next/router";
import {useEffect} from "react";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { id } = context.params;
  return { props: { id } };
};

export const LoginMessage = ({ id } : InferGetServerSidePropsType<typeof getServerSideProps>)  => {
  const { userContextG } = useUser();
  const router = useRouter()
  const displayRole = userContextG?.role

  useEffect(() => {
    switch (displayRole) {
      case "admin":
        router.push('/admin');
        break;
      case "developer":
        if (id) {
          router.push(`/${displayRole}/${id}`);
        }
            break;
      case "customer":
            router.push('/customer')
            break;
    }
  }, [displayRole, router]);

  return (
    <div>
      {displayRole === "pending" && (
        <div>
          <GreetingModal />
          <p className="text-gray-800">
            <strong>Now you are a user! 🎊 </strong>
            Your role will be assigned soon, {userContextG?.name.split(' ')[0]}.
          </p>
          <LoginButton classNameButton="px-2"/>
          <LogoutButton/>
        </div>
      )}
    </div>
  );
};