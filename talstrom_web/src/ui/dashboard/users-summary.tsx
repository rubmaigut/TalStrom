import { UserGroupIcon } from "@heroicons/react/24/outline";
import React from "react";

interface SummaryProps {
  totalUser: number;
  deletedUser: number;
}
const UserSummary: React.FC<SummaryProps> = ({ totalUser, deletedUser }) => {
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        <div className="bg-slate-50 p-5 m-2 rounded-md flex justify-between items-center shadow">
          <div>
            <h3 className="font-bold">Total Users</h3>
            <p className="text-gray-500">{totalUser}</p>
          </div>
          <i className="fa-users p-2 bg-gray-200 rounded-md">
            <UserGroupIcon className="w-6" />
          </i>
        </div>

        <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow">
          <div>
            <h3 className="font-bold">Deleted Users</h3>
            <p className="text-gray-500">{deletedUser}</p>
          </div>
          <i className="p-2 bg-red-200 rounded-md">
            <UserGroupIcon className="w-6" />
          </i>
        </div>
      </div>
    </div>
  );
};
export default UserSummary;
