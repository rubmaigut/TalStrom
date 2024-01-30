// components/InviteUserForm.tsx
import { useState } from 'react';

interface Props {
  onInvite: (email: string, role: string) => void;
}

const InviteUserForm: React.FC<Props> = ({ onInvite }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Developer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInvite(email, role);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-2 font-bold text-lg">User Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user's email"
            className="px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="role" className="mb-2 font-bold text-lg">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-3 py-2 border rounded"
          >
            <option value="Developer">Developer</option>
            <option value="Customer">Customer</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Send Invitation
        </button>
      </form>
    </div>
  );
};

export default InviteUserForm;
