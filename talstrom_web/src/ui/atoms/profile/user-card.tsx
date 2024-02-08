import React, { ReactNode, useState } from "react";
import { UserCardForUser } from "@/types/IUserCardProps";
import EditProfile from "./edit-profile";
import Image from "next/image";
import techIcons from "@/lib/reactIconComponents/reactIcons";
import * as ReactIcons from "@/lib/reactIconComponents";
import { IconType } from "react-icons";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Session } from "next-auth";

interface UserCardProps {
  user: UserCardForUser;
  session: Session | null;
  updateUser: (updatedUser: UserCardForUser) => void;
}
const UserCard = ({ user, session, updateUser }: UserCardProps) => {
  const [selectedTechnologies, _setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const getIconForTechnology = (
    technology: string,
    scaling: number
  ): ReactNode => {
    const i = techIcons.findIndex((x) => x.language == technology);
    const icon: IconType = (ReactIcons as any)[`${techIcons[i].reactIcon}`];

    if (typeof icon === "function") {
      return React.createElement(icon as React.ElementType, {
        size: scaling,
        color: techIcons[i].color,
      });
    }

    return <span>Icon not found for {technology}</span>;
  };

  return (
    <div className="bg-whiterounded-lg shadow">
      <div className="bg-gradient-to-r from-green-300 to-teal-300 h-20 w-full flex justify-center items-center relative">
       </div>
      <div className="w-full flex flex-col items-center px-4 absolute top-20">
        {session && session?.user?.sub === user.sub && (
          <button
            className={`absolute top-18 right-2 p-2 rounded-full bg-gray-100 hover:bg-gray-100 ${
              isEditMode ? "text-red-500" : "text-gray-500"
            }`}
            onClick={toggleEditMode}
          >
            <PencilIcon className="w-6 h-6" />
          </button>
        )}
        <Image
          src={user.picture}
          alt={`Profile of ${user.name}`}
          className="rounded-full"
          width={100}
          height={100}
          priority
        />
        <div className="my-4 text-center">
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-600">
            {user.position ? user.position : "No position set"}
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default UserCard;
