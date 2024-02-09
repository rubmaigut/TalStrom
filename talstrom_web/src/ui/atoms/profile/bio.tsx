import { ImShocked } from "react-icons/im";

type BioPageProps = {
    biography: string
}

const BioPage = ({biography}: BioPageProps) => {
    return (
      <section className="mt-10 flex flex-col justify-center items-center  bg-gray-50 rounded-t-lg border-2 border-b-2 ">
        {biography ? (
            <div className="p-4" >
            <h3 className="mb-2 text-xl font-bold border-b-2 pb-2">About me</h3>
            <p className="p-2 rounded">{biography}</p>
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