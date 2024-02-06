import { fetchUsersByFilter } from "@/lib/data";
import { UserCardForUser } from "@/types/IUserCardProps";
import { SyntheticEvent, useEffect, useState } from "react";

type FindMatchProps = {
  sub: string;
  filterOptions: string;
};

type FilterItem = {
  label: string;
  status: boolean;
};

const UserFindMatch = ({ sub, filterOptions }: FindMatchProps) => {
  const [usersArray, setUsersArray] = useState<UserCardForUser[]>([]);
  const [suggestions, setSuggestions] = useState<UserCardForUser[]>([]);

  const initial: FilterItem[] = filterOptions.split(",").map((x) => {
    return {
      label: x,
      status: true,
    };
  });

  const [filterArray, setFilterArray] = useState<FilterItem[]>(initial);

  useEffect(() => {
    const loadSuggestions = async () => {
      const users: UserCardForUser[] = await fetchUsersByFilter(sub);
      setSuggestions(users);
      setUsersArray(users);
    };

    loadSuggestions();
  }, []);

  useEffect(() => {
    setSuggestions(() => {
      const filtered = usersArray.filter((user) => {
        return filterArray.some((filter) => {
          return user.technologies.includes(filter.label) && filter.status;
        });
      });
    
      return filtered;
    });
  }, [filterArray]);

  const toggleFilter = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLButtonElement;
    !target.classList.contains("text-gray-300")
      ? target.classList.add("text-gray-300")
      : target.classList.remove("text-gray-300");
    const targetIndex = filterArray.findIndex((s) => s.label === target.value);
    const newArray = [...filterArray];
    newArray[targetIndex].status = !newArray[targetIndex].status;

    setFilterArray(newArray);
  };

  console.log(filterArray);
  return (
    <div>
      <div className="flex">
        {filterArray.map((elm, i) => {
          return (
            <button
              value={elm.label}
              onClick={toggleFilter}
              key={i}
              className="p-2"
            >
              {elm.label}
            </button>
          );
        })}
      </div>
      {suggestions.map((elm, i) => {
        return <p key={i}>{elm.name}</p>;
      })}
    </div>
  );
};

export default UserFindMatch;
