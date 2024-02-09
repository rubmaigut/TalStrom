import Layout from "@/ui/layout";
import { deleteUser, fetchUsersByRole, updateUserRole } from "@/lib/data-user";
import { useEffect, useState } from "react";
import { User } from "@/types/IUser";
import Image from "next/image";
import UserRoleEditor from "@/ui/dashboard/actions-button";
import Select from "@/ui/atoms/general ui/select";

export default function Page() {
  const [customers, setCustomers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const users = await fetchUsersByRole("customer");
        setCustomers(users);
      } catch (error) {
        console.error("Failed to fetch pending users:", error);
      }
    };
    loadCustomer();
  }, []);

  const handleDelete = async (sub: string) => {
    try {
      await deleteUser(sub);
      setCustomers(customers.filter(user => user.sub !==sub));
    } catch (error) {
      console.error("Error Deleting customer", error);
    }
  };

  const handleChangeRole = async (userSub: string, role: string) => {
    try {
      await updateUserRole(userSub, role);
      const users = await fetchUsersByRole("customer");
      setCustomers(users);
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };
  const handleEdit = (userSub: string) => {
    if(editingUser === userSub){
      setEditingUser(null);
    } else {
      setEditingUser(userSub)
    }
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-6 rounded-lg border border-text-gray-300 px-6 py-8 md:w-full h-full md:px-12 md:my-0 my-4 ">
          <h3 className="font-semibold leading-none text-gray-600">
            Customer Table
          </h3>
          <div className="max-w-7xl -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created at
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <Image
                              src={`${user.picture}`}
                              alt={`Photo profile${user.name}`}
                              className="w-full h-full rounded-full"
                              width={80}
                              height={80}
                              priority
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {user.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.email}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.dateAdded instanceof Date
                            ? user.dateAdded.toLocaleDateString()
                            : new Date(user.dateAdded).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {user.active === true ? (
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">Active</span>
                          </span>
                        ) : (
                          <span className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">Suspended</span>
                          </span>
                        )}
                        <p className="text-gray-900 whitespace-no-wrap"></p>
                      </td>
                      <td>
                      <td>
                        <UserRoleEditor
                          userSub={user.sub}
                          onDelete={handleDelete}
                          onEdit={()=> handleEdit(user.sub)}
                        />
                        {editingUser === user.sub && (
                          <Select onRoleChange={(role) => handleChangeRole(user.sub, role)} />
                        )}
                      </td>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
