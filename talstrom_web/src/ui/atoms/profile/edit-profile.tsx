import React, { useState } from "react";
import { updateUserProfile } from "@/lib/data-user";
import { SelectTechnologies } from "./technologies";
import { UserCardForUser } from "@/types/IUserCardProps";

export interface EditUserProfile {
  bio?: string;
  technologies: string[];
  position?: string;
  userName?: string;
  picture?: string;
}

type EditProfileProps = {
  user: UserCardForUser;
  toggleEditMode: () => void;
  updateUser: (updateDetails: UserCardForUser) => void;
};

const EditProfile = ({ user, toggleEditMode, updateUser }: EditProfileProps) => {
  const [userProfile, setUserProfile] = useState<EditUserProfile>({
    userName: user.userName,
    bio: user.bio,
    technologies: user.technologies.split(","),
    position: user.position,
  });
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateUserProfile(user.sub, userProfile);
      // updateUser({
      //   ...user,
      //   userName: userProfile.userName || user.userName,
      //   bio: userProfile.bio || user.bio,
      //   technologies: userProfile.bio || "",
      //   position: userProfile.position || user.position,
      // })
      toggleEditMode();
    } catch (error) {
      throw new Error(`Failed to update profile: ${error}`);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    <form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow-lg p-6 space-y-4 max-w-2xl mx-auto">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="userName"
        >
          Username
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
          onClick={() => toggleEditMode()}
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
