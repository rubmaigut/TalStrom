import { fetchUsersByFilter } from '@/lib/data-user';
import { UserCardForUser } from '@/types/IUserCardProps';
import React from 'react';
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import { CgArrowRightO } from 'react-icons/cg';
import { IconType } from 'react-icons';
import Image from 'next/image';
import Link from 'next/link';
import * as ReactIcons from '@/lib/reactIconComponents';
import techIcons from '@/lib/reactIconComponents/reactIcons';

type FindMatchProps = {
  sub: string;
  filterOptions: string[];
};

type FilterItem = {
  label: string;
  status: boolean;
};

const UserFindMatch = ({ sub, filterOptions }: FindMatchProps) => {
  const [usersArray, setUsersArray] = useState<UserCardForUser[]>([]);
  const [suggestions, setSuggestions] = useState<UserCardForUser[]>([]);

  const initial: FilterItem[] = filterOptions.map((x) => {
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
    !target.classList.contains('text-gray-300')
      ? target.classList.add('text-gray-300')
      : target.classList.remove('text-gray-300');
    const targetIndex = filterArray.findIndex((s) => s.label === target.value!);
    const newArray = [...filterArray];
    newArray[targetIndex].status = !newArray[targetIndex].status;
    console.log(target.value);

    setFilterArray(newArray);
  };

  const getIconForTechnology = (
    technology: string,
    scaling: number,
  ): ReactNode => {
    const i = techIcons.findIndex((x) => x.language == technology);
    const icon: IconType = (ReactIcons as any)[`${techIcons[i].reactIcon}`];

    if (typeof icon === 'function') {
      return React.createElement(icon as React.ElementType, {
        size: scaling,
        color: techIcons[i].color,
      });
    }

    return <span>Icon not found for {technology}</span>;
  };

  return (
    <section className="flex items-center justify-center">
      {filterOptions.length ? (
        <div className="flex flex-col items-center w-full md:w-3/5 pb-4">
          <div className="flex mb-5">
            {filterArray.map((elm, i) => {
              return (
                <button
                  key={i}
                  className="m-1"
                  value={elm.label}
                  onClick={toggleFilter}
                >
                  {getIconForTechnology(elm.label, 30)}
                </button>
              );
            })}
          </div>
          {suggestions.map((elm, i) => {
            return (
              <div
                key={i}
                className="flex flex-col justify-center space-x-2 md:space-x-4 w-full pb-4"
              >
                <div className="flex items-center justify-center">
                  <div className="flex-shrink-0">
                    <Image
                      src={`${elm?.picture}`}
                      alt={`Photo profile${elm?.name}`}
                      className="rounded-full"
                      width={32}
                      height={32}
                      priority
                    />
                  </div>
                  <div className="flex-1 min-w-0 mx-1">
                    <p className="text-sm font-medium text-gray-600 truncate">
                      {elm.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {elm.email}
                    </p>
                  </div>
                  <div className="flex pr-2">
                    <Link href={`/${elm.role}/${elm.sub}`}>
                      <CgArrowRightO size={25} />
                    </Link>
                  </div>
                </div>
                <div className="flex m-0.5">
                  {elm.technologies.split(',').map((tech, index) => (
                    <div key={index} className="mr-2">
                      {/* {getIconForTechnology(tech, 15)} */}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>
          No technologies currently listed. Complete your profile to see matches
        </p>
      )}
    </section>
  );
};

export default UserFindMatch;
