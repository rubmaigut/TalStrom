import { fetchUsersByFilter } from "@/lib/data";
import { capitalizeFirstLetter } from "@/lib/utils/capitaliseString";
import { UserCardForUser } from "@/types/IUserCardProps";
import React from "react";
import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import * as ReactIcons from "react-icons/si";
import { IconType } from "react-icons";

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
    console.log(target.value);

    setFilterArray(newArray);
  };

  const getIconForTechnology = (technology: string): ReactNode => {
    const icon: IconType = (ReactIcons as any)[
      `Si${capitalizeFirstLetter(technology)}`
    ];

    if (typeof icon === "function") {
      return React.createElement(icon as React.ElementType, {
        id: `filter-${technology}`,
        value: { technology },
        size: 25,
        color: "black",
      });
    }

    return <span>Icon not found for {technology}</span>;
  };

  console.log(filterArray);
  console.log(suggestions);
  return (
    <section>
    {filterOptions.length ? (<div>
      <div className="flex">
        {filterArray.map((elm, i) => {
          return (
            <button className="m-1" value={elm.label} onClick={toggleFilter}>
              {/* {getIconForTechnology(elm.label)} */}
              {elm.label}
            </button>
          );
        })}
      </div>
      {suggestions.map((elm, i) => {
        return <p key={i}>{elm.name}</p>;
      })}
    </div>) : (<p>No technologies currently listed. Complete your profile to see matches</p>)}
    </section>
  );
};

export default UserFindMatch;
