import Layout from "@/ui/layout";
import SignIn from "@/ui/sign-in";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <section>
        <SignIn/>
      </section>
    );
  }

  return (
    <Layout>
      <p>Customer Page</p>
    </Layout>
  );
}
