import React, { useState, FormEvent } from "react";

const JobPostingForm: React.FC<JobPostingFormProps> = ({ onSubmit }) => {
  const [jobData, setJobData] = useState<JobData>({
    title: "",
    content: "",
    recruiterName: "",
    recruiterEmail: "",
    createdAt: new Date().toDateString(),
    isActive: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(jobData);
    setJobData({
      title: "",
      content: "",
      recruiterName: "",
      recruiterEmail: "",
      createdAt: new Date().toDateString(),
      isActive: true,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Job Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={jobData.title}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="isActive"
          className="block text-sm font-medium text-gray-700"
        >
          Active
        </label>
        <input
          type="checkbox"
          name="isActive"
          id="isActive"
          checked={jobData.isActive}
          onChange={(e) =>
            setJobData((prev) => ({ ...prev, isActive: e.target.checked }))
          }
          className="mt-1 block"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Job Description
        </label>
        <textarea
          name="content"
          id="content"
          value={jobData.content}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="recruiterName"
          className="block text-sm font-medium text-gray-700"
        >
          Recruiter Name
        </label>
        <input
          type="text"
          name="recruiterName"
          id="recruiterName"
          value={jobData.recruiterName}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="recruiterEmail"
          className="block text-sm font-medium text-gray-700"
        >
          Recruiter Email
        </label>
        <input
          type="email"
          name="recruiterEmail"
          id="recruiterEmail"
          value={jobData.recruiterEmail}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Post Job
      </button>
    </form>
  );
};

export default JobPostingForm;
