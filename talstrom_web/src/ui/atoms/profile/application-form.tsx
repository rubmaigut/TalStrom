import React, { useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ApplicationFormProps {
    postId: number;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ postId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('PdfFile', file);
    formData.append('UserSub', 'user-sub-value'); // Replace with actual value
    formData.append('PostId', postId.toString());
    formData.append('Email', email);
    formData.append('Username', username);

    try {
      const response = await fetch(`${API_BASE_URL}/Pdf/submitApplication`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to submit application');
      alert('Application submitted successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting application');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <label htmlFor="email" className="text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full"
            placeholder="janedoe@example.com"
          />
        </div>

        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <label htmlFor="username" className="text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full"
            placeholder="JaneDoe"
          />
        </div>

        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <label htmlFor="file" className="text-gray-600">
            Attach Resume
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            accept=".pdf"
            required
            className="mt-1 block w-full file:border file:border-gray-300 file:px-2 file:py-1.5 file:rounded file:text-sm file:bg-white file:text-gray-700"
          />
        </div>

        <div className="flex justify-end p-4">
          <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};
