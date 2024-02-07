import { ImShocked } from "react-icons/im";

type BioPageProps = {
    biography: string
}

const BioPage = ({biography}: BioPageProps) => {
    return (
      <div>
        {biography ? (
            <>
            <h3 className="mb-2 text-lg ">About me:</h3>
            <p>{biography}</p>
            </>
        ) : (
            <div className="flex align-middle items-center justify-left">
                <p className="mr-2">No Biography here yet! </p>
                <ImShocked/>
            </div>
        )}
      </div>
    );
  };
  
  export default BioPage;