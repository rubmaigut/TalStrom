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
    <div className="max-w-2xl mx-auto my-6 bg- p-6 rounded-lg shadow">
      <div className="flex items-center space-x-4">
        <div className="shrink-0">
          <Image
            src={`${user.picture}`}
            alt={`Photo profile${user.name}`}
            className="rounded-full"
            width={90}
            height={90}
            priority
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {user.name ? user.name : "Username"}
            </h2>
            {session && session?.user?.sub === user.sub && (
              <button
                className={`className="px-4 py-2 text-sm font-semibold text-gray-800 border rounded hover:bg-gray-100 ${
                  isEditMode ? "text-gray-500" : "text-green-500"
                }`}
                onClick={() => toggleEditMode()}
              >
                <PencilIcon className="w-6 h-6" />
              </button>
            )}
          </div>
          <p className="text-sm text-gray-600">
            {user.position ? user.position : "No position set"}
          </p>
        </div>
        <div className="max-w-2xl mx-auto my-3">
          {isEditMode && (
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-2xl mx-auto lg:max-w-4xl">
                <EditProfile
                  user={user}
                  toggleEditMode={toggleEditMode}
                  updateUser={updateUser}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <strong>Technologies:</strong>
        <div className="flex flex-wrap items-center mt-2">
          {user.technologies.length ? (
            user.technologies.split(",").map((tech, index) => (
              <div key={index} className="m-1">
                {getIconForTechnology(tech, 24)}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No technologies set</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
