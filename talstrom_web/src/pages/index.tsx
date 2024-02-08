import { useUser } from "@/context/UserContext";
import CTAComponent from "@/ui/atoms/general ui/cta";
import SuccessLogin from "@/ui/atoms/general ui/success-login";
import { MailImage } from "@/ui/atoms/profile/email-image";
import Footer from "@/ui/footer";
import Header from "@/ui/header";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
  const { data: session } = useSession();
  const { userContextG, updateUser } = useUser();

  useEffect(() => {
    if (session && (!userContextG || session.user?.sub !== userContextG.sub)) {
      updateUser({
        id: session.user?.id || 0,
        name: session.user?.name || "",
        email: session.user?.email || "",
        picture: session.user?.image || "",
        sub: session.user?.sub || "",
        role: "pending",
        phoneNumber: null,
        dateAdded: new Date(),
        lastLoggedIn: new Date(),
        lastModified: new Date(),
        active: true,
        videos: null,
        followers: null,
        following: null,
        posts: null,
      });
    }
  }, [session, userContextG, updateUser]);

  return (
    <>
      {!session ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Header />
          <CTAComponent
            className={"bg-secondary-bg md:flex-row-reverse"}
            title="Find the right job or internship for you"
            description="Connect with people who can help, with our app you can meet recruiters or share with the community that you are looking for new opportunities."
            photo="opportunities.png"
          />
          <CTAComponent
            className={"bg-primary-bg md:flex-row-reverse my-4"}
            title="another Test here"
            description="Connect with people who can help, with our app you can meet recruiters or share with the community that you are looking for new opportunities."
          />
          <Footer/>
        </div>
      ) : (
        <div className="mt-4 w-full flex grow flex-col gap-4 md:items-center 2xl:h-32">
          <div className="flex flex-col justify-center gap-6 mt-8 lg:mt-28 rounded-lg bg-gray-50 px-6 py-10 w-full md:px-16">
            <MailImage
              picture={session!.user?.image as string}
              name={session!.user?.name as string}
              email={session!.user?.email as string}
            />
            {userContextG && <SuccessLogin user={userContextG} />}
          </div>
        </div>
      )}
    </>
  );
}
