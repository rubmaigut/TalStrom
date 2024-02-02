import React, { createContext, useContext, useState } from 'react';
import { User, IUserContext } from '@/types/IUser';

const UserContext = createContext<IUserContext | null>(null);

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [userContextG, setUser] = useState<User | null>(null);

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
  };

  const role = userContextG?.role || null;

  return (
    <UserContext.Provider value={{ userContextG, role ,updateUser }}>
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
