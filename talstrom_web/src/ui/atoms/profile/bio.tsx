import { ImShocked } from "react-icons/im";

type BioPageProps = {
    biography: string
}

const BioPage = ({biography}: BioPageProps) => {
    return (
      <section className="mt-10 flex flex-col justify-center items-center md:w-[400px] lg:w-[700px]">
        {biography ? (
            <div >
            <h3 className="mb-2 text-xl ">About me:</h3>
            <p >{biography}</p>
            </div>
        ) : (
            <div className="flex align-middle items-center justify-left">
                <p className="mr-2">No Biography here yet! </p>
                <ImShocked/>
            </div>
        )}
      </section>
    );
  };
  
  export default BioPage;