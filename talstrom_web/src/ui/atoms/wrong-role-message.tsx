// components/InviteUserForm.tsx
import { useUser } from "@/context/UserContext";
import { Role } from "@/types/IUser";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import Link from "next/link";
import GreetingModal from "./greetings";

interface Props {
  displayRole: string;
  sub: string
}

const WrongRolePageMessage: React.FC<Props> = ({ displayRole, sub }) => {
  const { userContextG } = useUser();
  
  return (
    
          <div className="flex flex-col justify-center items-center">
            <h1>User is a {displayRole}</h1>
            <p>Click here to go to their profile</p>
            <Link
                href={`/${displayRole}?sub=${sub}`}
                className="flex w-28 h-11 my-4 mr-4 grow items-center justify-center gap-2 rounded-md bg-teal-500 text-white p-3 text-sm font-bold hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:p-2 md:px-3"
              >
                Go to Profile
              </Link>
          </div>
  );
};

export default WrongRolePageMessage;
