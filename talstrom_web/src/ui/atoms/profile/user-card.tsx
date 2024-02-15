import React, { useState } from "react";
import { UserCardForUser } from "@/types/IUserCardProps";
import EditProfile from "./edit-profile";
import Image from "next/image";

import { PencilIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Session } from "next-auth";
import TechnologyIcons from "./technology-icons";

interface UserCardProps {
  user: UserCardForUser;
  session: Session | null;
  updateUser: (updatedUser: UserCardForUser) => void;
}
const UserCard = ({ user, session, updateUser }: UserCardProps) => {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(user.technologies.split(","));
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div className="bg-white rounded-lg shadow container mx-auto">
      <div className="bg-gradient-to-r from-green-300 to-teal-300 h-16 w-full flex justify-center items-center relative rounded-t-lg">
      {session && session?.user?.sub === user.sub && (
          <>
          <button
            className={`absolute top-3 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-100 ${
              isEditMode ? "text-red-500" : "text-gray-500"
            }`}
            onClick={toggleEditMode}
          >
            <PencilIcon className="w-6 h-6" />
          </button>
          </>
        )}
      </div>
      <div className="w-full flex flex-col items-center top-28 bg-white mt-4">
        <Image
          src={user.picture || '/userSession.png'}
          alt={`Profile of ${user.name}`}
          className="rounded-full"
          width={100}
          height={100}
          priority
        />
        <div className="my-4 text-center">
          <h2 className="text-lg font-semibold">{user.userName ? user.userName : user.name}</h2>
          <p className="text-sm text-gray-600">
            {user.position ? user.position : "No position set"}
          </p>
        </div>

        {isEditMode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full overflow-auto">
              <EditProfile
                user={user}
                toggleEditMode={toggleEditMode}
                updateUser={updateUser}
                selectedTechnologies={user.technologies.split(",")}
              />
            </div>
          </div>
        )}

        <h3 className="text-md font-semibold text-center text-primary-text w-full">
          Technology Stack
        </h3>
        <div className="flex flex-wrap items-center mt-2 mb-5">
          <TechnologyIcons
            technologies={user.technologies}
          />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
