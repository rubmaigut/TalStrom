import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface JobTableProps {
  post: Post[];
  onDelete: (postId: number) => void;
  onEdit?: (postId: number) => void;
}

const JobTableBody: React.FC<JobTableProps> = ({ post, onDelete, onEdit }) => {
  return (
    <tbody>
      {post.map((post) => (
        <tr key={post.id}>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{post.title}</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            {post.isActive === true ? (
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
                <span className="relative">Paused</span>
              </span>
            )}
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{post.createdAt}</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">
              {post.recruiterName}
            </p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">
              {post.recruiterEmail}
            </p>
          </td>
          <td>
            <div className="flex justify-center items-center gap-1">
              <span
                title="Delete"
                className="p-1 text-red-500 rounded-full cursor-pointer"
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete this user?")
                  ) {
                    onDelete(post.id);
                  }
                }}
              >
                <TrashIcon className="w-6" />
              </span>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default JobTableBody;
