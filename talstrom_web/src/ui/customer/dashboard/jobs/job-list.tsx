import React, { useState, useEffect } from "react";
import JobPostingForm from "./job-posting-form";
import { addNewPostHandler, deleteUserPost } from "@/lib/data-post";
import { fetchUsers } from "@/lib/data-user";
import { User } from "@/types/IUser";
import { useSession } from "next-auth/react";
import JobTableBody from "./job-table-list";

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { data: session } = useSession();
  const userSub = session?.user?.sub;

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetchUsers();
      setJobs(response);
    };

    fetchJobs();
  }, []);

  const handleAddJob = async (jobData: JobData) => {
    const newPost = await addNewPostHandler(
      jobData.title,
      jobData.content,
      userSub!,
      "JobPost",
      jobData.recruiterName,
      jobData.recruiterEmail,
      jobData.isActive,   
    );
    setJobs(
      jobs.map((user) => {
        if (user.sub === userSub) {
          return {
            ...user,
            posts: [...(user.posts || []), newPost],
          };
        } else {
          return user;
        }
      })
    );

    setShowForm(false);
  };

  const handlePostDeleteClick = async (postId: number) => {
    try {
      await deleteUserPost(postId);
      setJobs(
        jobs.map((user) => ({
          ...user,
          posts: user.posts?.filter((post) => post.id !== postId) || [],
        }))
      );
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)}>Add New Job</button>
      {showForm && (
        <div className="modal">
          <JobPostingForm onSubmit={handleAddJob} />
        </div>
      )}
      <div>
        <div className="max-w-7xl -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  recruiter Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </thead>
              {jobs.map((job) =>
                job?.posts?.map((post) => (
                  <JobTableBody
                    key={post.id}
                    post={[post]}
                    onDelete={handlePostDeleteClick}
                  />
                ))
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;
