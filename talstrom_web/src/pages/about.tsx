import CTAComponent from "@/ui/atoms/general ui/cta";
import TalstromLogo from "@/ui/atoms/general ui/talstrom-logo";
import Footer from "@/ui/footer";

export default function Page() {
  return (
    <section className="max-w-7xl w-full h-full flex grow flex-col md:flex-row md:justify-center mt-4">
     <div className="flex flex-col w-full justify-center items-center gap-6 rounded-lg px-6 py-2">
      <TalstromLogo />
      <h1 className="text-3xl md:text-5xl text-secondary-text my-4">
        Final project planned, designed and created by:
      </h1>
      <span> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga fugit quaerat, libero facere deleniti eligendi unde quae quis beatae, dicta ullam, inventore delectus placeat? Iure soluta cum eius error mollitia!</span>
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
        description="I'm a Developer"
        photo="Chris-Stephens.png"
      />
      <Footer />
    </section>
  );
}
