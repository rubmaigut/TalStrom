import React, { ReactNode, useEffect, useState } from "react";
import { UserCardForUser } from "@/types/IUserCardProps";
import EditProfile, { EditUserProfile } from "./edit-profile";
import Image from "next/image";
import techIcons from "@/lib/reactIconComponents/reactIcons";
import { useSession } from "next-auth/react";
import { useUser } from "@/context/UserContext";
import * as ReactIcons from "@/lib/reactIconComponents";
import { IconType } from "react-icons";
import { fetchUsersBySub } from "@/lib/data-user";
import { PencilIcon } from "@heroicons/react/24/outline";

interface UserCardProps {
  user: UserCardForUser;
}
const UserCard = ({ user }: UserCardProps) => {
  const { data: session } = useSession();
  const { userContextG } = useUser();
  const staticPicture = session?.user?.image || userContextG?.picture;
  const staticSub = session?.user?.sub || userContextG?.sub;
  const [_userProfile, setUserProfile] = useState<EditUserProfile>({
    userName: user.userName,
    bio: user.bio,
    technologies: user.technologies.split(","),
    position: user.position,
  });
  const [selectedTechnologies, _setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await fetchUsersBySub(staticSub!);
        setUserProfile({
          userName: data.userName || "",
          bio: data.bio,
          technologies: data.technologies.split(""),
          position: data.position,
        });
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };
    fetchUserProfile();
  }, []);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const getIconForTechnology = (
    technology: string,
    scaling: number
  ): ReactNode => {
    const i = techIcons.findIndex(x => x.language == technology);
    const icon: IconType = (ReactIcons as any)[
      `${techIcons[i].reactIcon}`
    ];

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
          <i
            className={`flex  justify-end h-2 p-1 text-gray-500 rounded-full cursor-pointer ${
              isEditMode ? "text-gray-500" : "text-green-500"
            }`}
            onClick={toggleEditMode}
          >
            <PencilIcon className="w-6 h-6" />
          </i>
          <div className="flex flex-col xl:flex-row items-center xl:space-x-6 mb-4">
            <div className="flex flex-col justify-center items-center">
              <dd className="my-2 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                <Image
                  src={`${staticPicture}`}
                  alt={`Photo profile${userContextG?.name}`}
                  className="rounded-full bg-black"
                  width={80}
                  height={80}
                  priority
                />
              </dd>
            </div>
            <div>
              <p>{user.name ? user.name : "Not Set"}</p>
              <p className="text-xs">{user.userName ? user.userName : "Not Set"}</p>
              <p className="text-xs text-gray-400 italic mb-1" >{user.position ? user.position : "No position set"}</p>
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
