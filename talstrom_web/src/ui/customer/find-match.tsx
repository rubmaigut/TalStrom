import { fetchUsersByFilter } from "@/lib/data";
import { UserCardForUser } from "@/types/IUserCardProps";
import { useEffect, useState } from "react";

type FindMatchProps = {
  sub: string,
}

const UserFindMatch = ({sub}: FindMatchProps) => {
  const [suggestions, setSuggestions] = useState<UserCardForUser[]>([]); 

  useEffect(() => {
    const loadSuggestions = async () => {
      const users: UserCardForUser[] = await fetchUsersByFilter(sub);
      setSuggestions(users);
    }

    loadSuggestions();
  },[])

  console.log("Suggestions:", suggestions);
    return (
      <div>
        <p>Find Match</p>
      </div>
    );
  };
  
  export default UserFindMatch;
  