import React from "react";
import Image from "next/image";
import UserRoleEditor from "@/ui/dashboard/actions-button";
import Select from "@/ui/atoms/general ui/select";
import { User } from "@/types/IUser";

interface UserTableProps {
    users: User[];
    onDelete: (sub: string) => void;
    onEdit: (userSub: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onDelete, onEdit, onRoleChange, editingUser }) => {
    return (
      <div className="max-w-7xl -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            {/* Table Head */}
            <thead>
              <tr>
                {/* Header Columns */}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  {/* User Rows */}
                  <td>
                    {/* User Data */}
                  </td>
                  <td>
                    {/* Actions */}
                    <div className="w full flex justify-center items-center">
                      <UserRoleEditor
                        userSub={user.sub}
                        onDelete={() => onDelete(user.sub)}
                        onEdit={() => onEdit(user.sub)}
                      />
                      {editingUser === user.sub && (
                        <Select onRoleChange={(role) => onRoleChange(user.sub, role)} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default UserTable;
  