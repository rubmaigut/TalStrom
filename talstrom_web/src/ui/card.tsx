import { LoginProps } from "@/types/IUser";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export function Card({ user }: LoginProps) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <ArrowRightCircleIcon className="h-5 w-5 text-gray-700" />
        <h3 className="ml-2 text-sm font-medium">{user.name}</h3>
        <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
          {user.email}
        </p>
        <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
          {user.role}
        </p>
      </div>
    </div>
  );
}
