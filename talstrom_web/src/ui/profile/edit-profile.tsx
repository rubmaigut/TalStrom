import React, { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@/types/IUser";
import { fetchUsersBySub, updateUserProfile } from "@/lib/data";
import { useUser } from "@/context/UserContext";
import { SelectTechnologies } from "./technologies";

export interface EditProfileProps {
  bio?: string;
  technologies: string[];
  position?: string;
  username?: string;
}

const EditProfile: React.FC = () => {
  const { userContextG } = useUser();
  const [userProfile, setUserProfile] = useState<EditProfileProps>({
    username: "",
    bio: "",
    technologies: [],
    position: "",
  });
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await fetchUsersBySub(userContextG!.sub);
        setUserProfile({
          username: data.username,
          bio: data.bio,
          technologies: data.technologies.split(","),
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userSub = userContextG!.sub;
    try {
      await updateUserProfile(userSub, userProfile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile");
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
    setUserProfile({ ...userProfile, technologies: selectedOptions });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-6 mb-4">
          <div className="flex flex-col justify-center items-center">
            <dd className="my-2 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
              <Image
                src={`${userContextG?.picture}`}
                alt={`Photo profile${userContextG?.name}`}
                className="rounded-full bg-black"
                width={80}
                height={80}
                priority
              />
            </dd>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900">
              {userContextG?.name}
            </h1>
            <dd className="my-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
              {userContextG?.email}
            </dd>
            <dd className="my-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
              {userContextG?.role}
            </dd>
          </div>
          <button
            onClick={toggleEditMode}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            {isEditMode ? "Cancel" : "Edit"}
          </button>
        </div>
        {isEditMode ? (
          <div>
            <p>Username: {userProfile.username}</p>
            <p>Bio: {userProfile.bio}</p>
            <p>Position: {userProfile.position}</p>
            <p>Technologies: {selectedTechnologies.join(", ")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                username
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="username"
                value={userProfile.username}
                onChange={handleChange}
                placeholder="Your username"
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
        )}
      </div>
    </div>
  );
};

export default EditProfile;
