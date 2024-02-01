import React, { createContext, useContext, useState } from 'react';
import { User, IUserContext } from '@/types/IUser';

const UserContext = createContext<IUserContext | null>(null);

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
    setRole(newUser?.role || null);
  };

  return (
    <UserContext.Provider value={{ user, role, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): IUserContext => {
    const context = useContext(UserContext);
    if (context === null) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  };
