import { useUser } from "@/context/UserContext";
import Link from "next/link";
import GreetingModal from "./greetings";
import LoginButton from "../profile/login-button";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { id } = context.params;
  return { props: { id } };
};

export const LoginMessage = ({ id } : InferGetServerSidePropsType<typeof getServerSideProps>)  => {
  const { userContextG } = useUser();
  const displayRole = userContextG?.role

  return (
    <div>
      {displayRole === "pending" && (
        <div>
          <p className="text-gray-800">
            <GreetingModal />
            <strong>Now you are a user! 🎊 </strong>
            Your role will be assigned soon, {userContextG?.name.split(' ')[0]}.
          </p>
          <LoginButton classNameButton="px-2"/>
        </div>
      )}
      {displayRole === "admin" && (
        <div
          key={userContextG?.id}
          className="flex flex-col justify-center items-center"
        >
          <GreetingModal />
          <h2 className="text-gray-600 font-semibold"> Welcome Admin </h2>
          <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2 ">
            your last connection was :
          </dd>
          <div className="flex flex-col md:flex-row justify-center items-center md:my-6 ">
            <Link
              href="/admin"
              className="flex w-44 h-11 my-4 grow items-center justify-center gap-2 rounded-md bg-teal-500 text-white p-3 text-sm font-bold hover:bg-sky-100 hover:text-teal-600 md:mx-4"
            >
              Go to Portal
            </Link>
            <LoginButton classNameTitle="text-gray-600 px-2" classNameButton="px-2"/>
          </div>
        </div>
      )}
      {displayRole !== "admin" && displayRole !== "pending" && (
        <div className="flex flex-col justify-center items-center">
          <GreetingModal />
          <h2 className="text-gray-600 font-semibold"> Welcome!</h2>
          <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2 ">
            your last connection was:
          </dd>
          <div className="flex justify-center items-center">
            <Link
              href={`/${displayRole}/${id}`}
              className="flex w-28 h-11 my-4 mr-4 grow items-center justify-center gap-2 rounded-md bg-teal-500 text-white p-3 text-sm font-bold hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              Go to Portal
            </Link>
           <LoginButton classNameTitle="text-gray-600 px-2" classNameButton="px-2"/>
          </div>
        </div>
      )}
    </div>
  );
};
