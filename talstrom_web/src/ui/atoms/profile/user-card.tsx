import React, { ReactNode, useState } from "react";
import { UserCardForUser } from "@/types/IUserCardProps";
import EditProfile from "./edit-profile";
import Image from "next/image";
import techIcons from "@/lib/reactIconComponents/reactIcons";
import { useUser } from "@/context/UserContext";
import * as ReactIcons from "@/lib/reactIconComponents";
import { IconType } from "react-icons";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Session } from "next-auth";

interface UserCardProps {
  user: UserCardForUser;
  session: Session | null;
}
const UserCard = ({ user, session }: UserCardProps) => {
  const { userContextG } = useUser();
  const staticPicture = session?.user?.image || userContextG?.picture;
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
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
    <div className="relative max-w-2xl mx-auto my-3">
      <div className="flex justify-center max-w-2xl items-center text-sm">
        <div className="bg-white w-full p-6">
          {session && session?.user?.sub === user.sub && (
            <i
              className={`flex  justify-end h-2 p-1 text-gray-500 rounded-full cursor-pointer ${
                isEditMode ? "text-gray-500" : "text-green-500"
              }`}
              onClick={toggleEditMode}
            >
              <PencilIcon className="w-6 h-6" />
            </i>
          )}
          <div className="flex flex-col xl:flex-row items-center xl:space-x-6 mb-4">
            <div className="flex flex-col justify-center items-center">
              <dd className="my-2 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                <Image
                  src={`${user.picture}`}
                  alt={`Photo profile${user.name}`}
                  className="rounded-full bg-black"
                  width={80}
                  height={80}
                  priority
                />
              </dd>
            </div>
            <div>
              <p>{user.name ? user.name : "Not Set"}</p>
              <p className="text-xs">
                {user.userName ? user.userName : "Not Set"}
              </p>
              <p className="text-xs text-gray-400 italic mb-1">
                {user.position ? user.position : "No position set"}
              </p>
              <p className="hidden">
                Technologies: {selectedTechnologies.join(", ")}
              </p>

              <div className="grid items-center grid-cols-6 2xl:grid-cols-10">
                {user.technologies.length ? (
                  user.technologies.split(",").map((tech, index) => (
                    <div key={index} className="mx-0.2">
                      {getIconForTechnology(tech, 20)}
                    </div>
                  ))
                ) : (
                  <p className="col-span-3 text-xs text-gray-400">
                    No technologies set
                  </p>
                )}
              </div>
            </div>
          </div>

          {isEditMode && (
            <EditProfile user={user} toggleEditMode={toggleEditMode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
