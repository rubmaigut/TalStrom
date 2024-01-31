import Link from "next/link";
import Layout from "../ui/layout";
import { useSession } from "next-auth/react";
import SignIn from "@/ui/sign-in";
import jwt from "./api/endpoints/jwt";
import { useEffect, useState } from "react";
import SuccessLogin from "@/ui/sucess-login";

export default function Page() {
  const { data: session } = useSession();
  const [jwtData, setJwtData] = useState(null);

  useEffect(() => {
    const fetchJwt = async () => {
      if (session) {
        const response = await fetch('http://localhost:3000/api/endpoints/jwt');
        const data = await response.json();
        setJwtData(data);
      }
    };

    fetchJwt();
  }, [session]);

  if (!session || !jwtData) {
    return (
      <section>
        <h2>SignIn</h2>
        <SignIn />
      </section>
    );
  }

  const userInfo = session.user ? {
    email: session.user.email || '',
    name: session.user.name || '',
    image: session.user.image || ''
  } : null;

  return (
    <Layout>
      {session && userInfo && jwtData && <SuccessLogin user={userInfo} jwt={jwtData}/>}
      <div>
        {session &&
          "role === Admin" && (<Link href="/admin/invite">Admin Portal</Link>)}
      </div>
    </Layout>
  );
}
