import React, { useState, useEffect } from "react";
import JobPostingForm from "./job-posting-form";
import {
  addNewPostHandler,
  deleteUserPost,
} from "@/lib/data-post";
import { fetchUsers } from "@/lib/data-user";
import { User } from "@/types/IUser";
import { useSession } from "next-auth/react";
import JobTable from "./job-table-list";

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
      jobData.createdAt
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
        {jobs.map((jobs) => (
          <div key={jobs.id}>
            <h3>{jobs.name}</h3>
            <div>
              {jobs?.posts?.map((post) => (
                <JobTable
                  jobs={post}
                  onDelete={handlePostDeleteClick}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
