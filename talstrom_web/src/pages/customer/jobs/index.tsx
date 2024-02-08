import Layout from "@/ui/layout";
import SignIn from "@/ui/atoms/general ui/sign-in";
import { useSession } from "next-auth/react";
import {LoginMessage} from "@/ui/atoms/general ui/login-message";
import { useUser } from "@/context/UserContext";
import JobList from "@/ui/customer/dashboard/jobs/job-list";

export default function Page() {
  const { data: session } = useSession();
  const { userContextG } = useUser()

  if (!session) {
    return (
      <section>
        <SignIn />
      </section>
    );
  } else if (userContextG?.role !== "customer") {
    return <LoginMessage displayRole="developer" userSub={userContextG?.sub} />;
  }

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-6 rounded-lg bg-gray-50 border border-gray-300 px-4 md:w-full h-full md:px-12 md:my-0 my-4 ">
        <JobList/>
        </div>
      </Layout>
    </>
  );
}