import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { fetchUsersBySub, updateUserProfile } from "@/lib/data";
import { useUser } from "@/context/UserContext";
import { SelectTechnologies } from "./technologies";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import * as ReactIcons from 'react-icons/si'
import { IconType } from "react-icons";
import { UserCardForUser } from "@/types/IUserCardProps";
import { capitalizeFirstLetter } from "@/lib/utils/capitaliseString";

export interface EditUserProfile {
  bio?: string;
  technologies: string[];
  position?: string;
  userName?: string;
  picture?: string;
}

type EditProfileProps ={
user: UserCardForUser
toggleEditMode: () => void
}

const EditProfile = ({user , toggleEditMode}: EditProfileProps) => {
  const {data: session} = useSession();
  const { userContextG } = useUser();
  const [userProfile, setUserProfile] = useState<EditUserProfile>({
    userName: user.userName,
    bio: user.bio,
    technologies: user.technologies.split(","),
    position: user.position,
  });
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    [],
  );


  const staticSub = session?.user?.sub || userContextG?.sub

  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateUserProfile(staticSub!, userProfile);
      alert('Profile updated successfully!');
      toggleEditMode();
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Failed to update profile');
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleTechnologiesChange = (selectedOptions: string[]) => {
    setSelectedTechnologies(selectedOptions);
    setUserProfile({
      ...userProfile,
      technologies: selectedOptions.map((icon) => icon.toString()),
    });
  };

  return (
    
    <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="userName"
      >
        userName
      </label>
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="userName"
        name="userName"
        value={userProfile.userName}
        onChange={handleChange}
        placeholder="Your userName"
      />
    </div>

    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="bio"
      >
        Bio
      </label>
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="bio"
        name="bio"
        value={userProfile.bio}
        onChange={handleChange}
        placeholder="Your bio"
      />
    </div>

    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="position"
      >
        Position
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="position"
        name="position"
        type="text"
        value={userProfile.position}
        onChange={handleChange}
        placeholder="Your position"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Technologies
      </label>
      <SelectTechnologies
        selectedTechnologies={selectedTechnologies}
        onChange={handleTechnologiesChange}
      />
    </div>

    <div className="flex items-center justify-between">
      <button
        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Save
      </button>
      <button
        onClick={toggleEditMode}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
        type="button"
      >
        Cancel
      </button>
    </div>
  </form>
  );
};

export default EditProfile;
