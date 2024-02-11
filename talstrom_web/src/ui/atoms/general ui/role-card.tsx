import { FC } from "react";

interface SelectRoleProps {
    title: string;
    list: string[];
    handleRoleSelection: (role: string) => void;
  }
  
  const RoleCard: FC<SelectRoleProps> = ({ title, list, handleRoleSelection }) => {
    return (
      <div className="w-full max-w-md relative z-10 bg-primary-bg rounded-xl shadow-lg">
        <div className="flex flex-col justify-center items-center text-left text-sm sm:text-md max-w-sm text-black p-8 lg:p-6">
          <h1 className="text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide">
            {title}
          </h1>
          <span className="text-lg text-gray-700">As a {title} you can do in TalStröm </span>
          <div className="flex pl-12 justify-start sm:justify-start">
            <ul>
              {list.map((item) => (
                <li className="flex items-center">
                  <div className="rounded-full p-2 fill-current text-green-700">
                    <svg
                      className="w-6 h-6 align-middle"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <span className="text-gray-700 text-lg ml-3">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="w-44 px-4 py-2 text-white bg-teal-500 rounded-full my-4"
            onClick={() => handleRoleSelection("")}
          >
            Select
          </button>
        </div>
      </div>
    );
  };
  export default RoleCard;