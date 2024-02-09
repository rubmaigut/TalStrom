import Layout from '@/ui/layout';
import SignIn from '@/ui/atoms/general ui/sign-in';
import { useSession } from 'next-auth/react';
import Image from "next/image";

export default function Page() {
  const { data: session } = useSession();

  return (
    <>
      {!session ? (
        <section>
          <SignIn />
        </section>
      ) : (
        <Layout>
        <div className="flex flex-col gap-6 rounded-lg border border-text-gray-300 px-6 py-8 md:w-full h-full md:px-12 md:my-0 my-4 justify-center items-center">
        <Image
          src="/coming.png"
          alt="comingSoon"
          className=""
          width={600}
          height={600}
          priority
        />
        </div>
        </Layout>
      )}
    </>
  );
}
