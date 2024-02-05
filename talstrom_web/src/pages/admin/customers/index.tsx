import Layout from "@/ui/layout";
import { deleteUser, fetchUsersByRole, updateUserRole } from "@/lib/data";
import { useEffect, useState } from "react";
import { User } from "@/types/IUser";
import Image from "next/image";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Page() {
  const [customers, setCustomer] = useState<User[]>([]);

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const users = await fetchUsersByRole("customer");
        setCustomer(users);
      } catch (error) {
        console.error("Failed to fetch pending users:", error);
      }
    };
    loadCustomer();
  }, []);

  const handleDelete = async (sub: string) => {
    try {
      await deleteUser(sub);
      const users = await fetchUsersByRole("customer");
      setCustomer(users);
    } catch (error) {
      console.error("Error Deleting developer", error);
    }
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-8 md:w-full h-full md:px-12 md:my-0 my-4 ">
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
                        <div className="flex justify-around gap-1">
                          <i
                            title="Edit"
                            className="p-1 text-green-500 rounded-full cursor-pointer"
                          >
                            <PencilIcon className="w-6" />
                          </i>
                          <i
                            title="Delete"
                            className="p-1 text-red-500 rounded-full cursor-pointer"
                            onClick={() => handleDelete(user.sub)}
                          >
                            <TrashIcon className="w-6" />
                          </i>
                        </div>
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
