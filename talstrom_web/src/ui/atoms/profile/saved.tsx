import React, { useEffect, useState } from 'react';
import { fetchUsersBySub } from '@/lib/data-user';
import { User } from '@/types/IUser';
import { useUser } from '@/context/UserContext';

interface ConnectionProps {
  favorites: string[]
}

const Connections = ({ favorites }: ConnectionProps) => {
  const [connections, setConnections] = useState<User[]>([]);

  useEffect(() => {
    const fetchConnections = async () => {
      if (favorites) {
        const promises = favorites.map(sub => fetchUsersBySub(sub));
        const results: User[] = await Promise.all(promises);
        setConnections(results);
      }
    };

    fetchConnections();
  }, [favorites]);

  return (
    <div>
      <h2>My Connections</h2>
      <ul>
        {connections.map((user) => (
          <li key={user.sub}>
            <img src={user?.picture || "/userSession.png"} alt={user.name} width="50" height="50" />
            <div>{user.name || ""}</div>
            <div>{user.email || ""}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connections;
