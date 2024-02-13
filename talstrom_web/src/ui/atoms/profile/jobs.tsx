import { fetchPost } from "@/lib/data-post";
import React, { useState, useEffect } from "react";
import { ApplicationForm } from "./application-form";

interface JobPost {
  id: number;
  title: string;
  description: string;
  postType: string; // Assuming this field exists to filter by 'JobPost'
}

const JobPosts: React.FC = () => {
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const posts = await fetchPost();
        const filteredPosts = posts.filter(
          (post: JobPost) => post.postType === "JobPost"
        );
        setJobPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching job posts:", error);
      }
    };

    fetchJobPosts();
  }, []);

  return (
    <div className="flex items-center justify-center mt-4">
      <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
        <div className="p-4 border-b">
          <h2 className="text-2xl text-primary-light ">Applicant Information</h2>
          <p className="text-sm text-gray-500">
            Personal details and application.
          </p>
        </div>
        {jobPosts.map((post: JobPost) => (
          <div key={post.id} className="p-4 border-b">
            <h2 className="text-xl">{post.title}</h2>
            <p className="text-sm text-gray-500">{post.description}</p>
            <ApplicationForm postId={post.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPosts;
