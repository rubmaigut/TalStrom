import { useUser } from "@/context/UserContext";
import CTAComponent from "@/ui/atoms/general ui/cta";
import SuccessLogin from "@/ui/atoms/general ui/success-login";
import { MailImage } from "@/ui/atoms/profile/email-image";
import Footer from "@/ui/footer";
import Header from "@/ui/header";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";
import LoginButton from "@/ui/atoms/profile/login-button";
import TalstromLogo from "@/ui/atoms/general ui/talstrom-logo";

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
        <div className="container mx-auto w-full h-full flex flex-col justify-center items-center">
          <Header />
          <CTAComponent
            className={"bg-secondary-bg md:flex-row-reverse"}
            title="Elevate Your Talent Experience with Tal-Ström!🚀 "
            description="Are you ready to revolutionize the way you discover and engage with talent? Look no further than Tal-Ström – your gateway to a dynamic and immersive talent ecosystem!
            Tal-Ström empowers individuals to craft compelling profiles that go beyond the ordinary. Showcase your skills and expertise in a visually stunning manner, with the ability to share media-rich content that truly captivates."
            photo="opportunities.png"
          />
          <div className="w-full h-full flex items-center justify-center">
            <Image
              src="/workers.png"
              alt="remote home animation"
              className="lg:w-3/5 object-contain"
              width={600}
              height={200}
              priority
            />
          </div>
          <CTAComponent
            className={"bg-primary-bg md:flex-row-reverse my-4"}
            title=" 📲 90-Second Skill Showcases"
            description="Break free from traditional limitations! Tal-Ström allows you to present your skills in an engaging 90-second video format, providing a quick yet powerful glimpse into your unique capabilities. Make a lasting impression and stand out from the crowd."
          />
          <span className="w-full flex justify-end items-end px-2 md:px-6">
            <LoginButton classNameButton="flex w-20 md:w-16" title="" />
          </span>
          <Footer />
        </div>
      ) : (
        <div className="mt-4 w-full flex grow flex-col gap-4 md:items-center 2xl:h-32">
          <div className="w-full flex justify-center mt-2 bg-white">
            <TalstromLogo />
          </div>
          {userContextG && <SuccessLogin user={userContextG} />}
        </div>
      )}
    </>
  );
}
