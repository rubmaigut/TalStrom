import { LoginProps } from "@/types/IUser";
import Image from "next/image";

export function Card({ user }: LoginProps) {
  return (
    <div className="flex justify-center space-x-2 md:space-x-4 md:w-3/5">
      <div className="flex-shrink-0">
        <Image
          src={`${user?.picture}`}
          alt={`Photo profile${user?.name}`}
          className="rounded-full"
          width={32}
          height={32}
          priority
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-600 truncate">
        {user.name}
        </p>
        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
        {user.email}
        </p>
      </div>
      <div className="flex pr-2">
        <p className="w-24 truncate font-semibold leading-tight rounded-full px-2 py-2 text-center text-sm bg-red-200 text-red-900">
          {user.role}
        </p>
      </div>
    </div>
  );
}
