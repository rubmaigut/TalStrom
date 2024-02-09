import CTAComponent from "@/ui/atoms/general ui/cta";
import TalstromLogo from "@/ui/atoms/general ui/talstrom-logo";
import Footer from "@/ui/footer";

export default function Page() {
  return (
    <section className="container mx-auto w-full h-full flex grow flex-col md:justify-center mt-4 md:px-8">
      <div className="flex flex-col w-full justify-center items-center gap-6 rounded-lg px-6 py-2 ">
        <TalstromLogo />
        <h1 className="text-3xl md:text-5xl text-secondary-text my-4">
          Final project planned, designed and created by:
        </h1>
        <span className="text-xl">
          Team Rest, a skilled group of developers who collaborated efficiently
          on a networking platform project. Their skills in .Net, NextJS and
          cloud services resulted in a robust and user-friendly solution to the
          networking between client and developer. With a focus on consultants
          portfolio-building. this app allows agencies to showcase their
          consultants progression and abilities, allowing the clients to stay
          updated in an efficient manner.
        </span>
      </div>
      <CTAComponent
        className={"bg-primary-bg my-6"}
        title="Davit Danielyan"
        description="I'm a Developer"
        photo="Davit-Danielyan.png"
      />
      <CTAComponent
        className={"bg-secondary-bg my-6"}
        title="Maidelin Rubio"
        description="I'm a Developer"
        photo="maidelin-rubio.png"
      />
      <CTAComponent
        className={"bg-primary-bg my-6"}
        title="Chris Stephens"
        description="As a Backend Engineer, I architect the digital backbone of our systems, crafting robust and scalable solutions that empower the seamless functioning of our applications. With a code-centric mindset and a knack for optimizing performance, I thrive on the challenge of turning complex problems into elegantly efficient backend solutions that fuel our technological aspirations."
        photo="Chris-Stephens.png"
      />
      <Footer />
    </section>
  );
}
