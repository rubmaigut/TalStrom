import React from "react";
import Image from "next/image";

interface EditProfileProps {
  name: string;
  email: string;
  picture: string
  technologies: string;
  phoneNumber: number;
  lastModified: Date;
  aboutMe?: string;
  position?: string;
}

const EditProfile: React.FC<EditProfileProps> = ({
  name,
  picture,
  technologies,
  phoneNumber,
  lastModified,
  aboutMe,
  position,
  email,
}) => {
  return (
    <div className="container mx-auto px-4">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-6 mb-4">
          <div className="flex flex-col justify-center items-center">
            <dd className="my-2 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
              <Image
                src={`${picture}`}
                alt={`Photo profile${name}`}
                className="rounded-full bg-black"
                width={80}
                height={80}
                priority
              />
            </dd>
          </div>
            <h1 className="text-xl font-bold text-gray-900">{name}</h1>
            <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2 ">
              {position}
            </dd>
          <div></div>
        </div>
        <form>
          <div className="mb-4">
            <span className="block text-gray-700 text-sm font-bold mb-2">
              {email}
            </span>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          {/* Repeat for other fields */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
